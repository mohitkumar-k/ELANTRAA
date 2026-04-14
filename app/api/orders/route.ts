import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import OrderModel from '@/models/Order';
import CouponModel from '@/models/Coupon';
import UserModel from '@/models/User';
import { orderSchema } from '@/lib/validators';
import { getUserFromRequest } from '@/lib/request-auth';
import { getOrders, getOrdersByUserId } from '@/lib/orders';

function orderNumber() {
  return `ELA-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
}

async function getOrCreateUserId(request: NextRequest, email: string) {
  const auth = getUserFromRequest(request);
  if (auth) return auth.userId;

  const existing = await UserModel.findOne({ email });
  if (existing) return existing._id.toString();

  const created = await UserModel.create({
    name: email.split('@')[0],
    email,
    password: crypto.randomBytes(20).toString('hex'),
    role: 'user',
    wishlist: []
  });
  return created._id.toString();
}

async function calculateCouponDiscount(code: string | undefined, subtotal: number) {
  if (!code) return { discount: 0, couponCode: undefined as string | undefined };
  const coupon = await CouponModel.findOne({ code: code.toUpperCase(), active: true });
  if (!coupon) return { discount: 0, couponCode: undefined };
  if (coupon.expiresAt && coupon.expiresAt < new Date()) return { discount: 0, couponCode: undefined };
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return { discount: 0, couponCode: undefined };
  if (subtotal < coupon.minOrderValue) return { discount: 0, couponCode: undefined };
  const discount =
    coupon.discountType === 'flat'
      ? coupon.value
      : Math.round((subtotal * coupon.value) / 100);
  return { discount: Math.min(discount, subtotal), couponCode: coupon.code };
}

export async function GET(request: NextRequest) {
  const auth = getUserFromRequest(request);
  if (!auth) return apiError('Unauthorized', 401);
  if (auth.role === 'admin') return apiSuccess(await getOrders());
  return apiSuccess(await getOrdersByUserId(auth.userId));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) return apiError('Invalid order data');

    const subtotal = parsed.data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 249;
    const coupon = await calculateCouponDiscount(parsed.data.couponCode, subtotal + shipping);
    if (parsed.data.couponCode && !coupon.couponCode) {
      return apiError('Invalid or ineligible coupon code');
    }
    const totalBeforePayment = subtotal + shipping - coupon.discount;

    await connectToDatabase();
    const userId = await getOrCreateUserId(request, parsed.data.address.email);

    if (parsed.data.paymentMethod === 'Razorpay') {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;
      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return apiError('Missing Razorpay payment details');
      }
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET ?? '')
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');
      if (expectedSignature !== razorpaySignature) {
        return apiError('Payment verification failed', 400);
      }
    }

    const order = await OrderModel.create({
      orderNumber: orderNumber(),
      userId,
      items: parsed.data.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image
      })),
      address: parsed.data.address,
      subtotal,
      shipping,
      discount: coupon.discount,
      total: Math.max(0, totalBeforePayment),
      paymentMethod: parsed.data.paymentMethod,
      paymentStatus: parsed.data.paymentMethod === 'COD' ? 'Pending' : 'Paid',
      status: parsed.data.paymentMethod === 'COD' ? 'Pending' : 'Paid',
      couponCode: coupon.couponCode,
      razorpayOrderId: body.razorpayOrderId,
      razorpayPaymentId: body.razorpayPaymentId
    });

    const couponDoc = coupon.couponCode ? await CouponModel.findOne({ code: coupon.couponCode }) : null;
    if (couponDoc) {
      couponDoc.usedCount += 1;
      await couponDoc.save();
    }

    return apiSuccess({ _id: order._id.toString(), orderNumber: order.orderNumber });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'Unable to create order', 500);
  }
}
