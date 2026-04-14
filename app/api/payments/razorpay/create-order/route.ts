import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { getRazorpayClient } from '@/lib/razorpay';
import { connectToDatabase } from '@/lib/db';
import CouponModel from '@/models/Coupon';

export async function POST(request: NextRequest) {
  try {
    const { amount, couponCode } = await request.json();
    const orderAmount = Number(amount);
    if (!orderAmount || orderAmount <= 0) return apiError('Invalid amount');

    await connectToDatabase();
    let discount = 0;
    if (couponCode) {
      const coupon = await CouponModel.findOne({ code: String(couponCode).toUpperCase(), active: true });
      if (coupon && orderAmount >= coupon.minOrderValue) {
        discount =
          coupon.discountType === 'flat'
            ? coupon.value
            : Math.round((orderAmount * coupon.value) / 100);
      }
    }

    const payable = Math.max(0, orderAmount - discount);
    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: payable * 100,
      currency: 'INR',
      receipt: `elantraa_${Date.now()}`
    });

    return apiSuccess({
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'Unable to create payment order', 500);
  }
}
