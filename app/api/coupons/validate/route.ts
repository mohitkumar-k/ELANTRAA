import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import CouponModel from '@/models/Coupon';

export async function POST(request: NextRequest) {
  try {
    const { code, orderValue } = await request.json();
    if (!code) return apiError('Coupon code is required');

    await connectToDatabase();
    const coupon = await CouponModel.findOne({ code: code.toUpperCase(), active: true });
    if (!coupon) return apiError('Coupon not found', 404);
    if (coupon.expiresAt && coupon.expiresAt < new Date()) return apiError('Coupon expired');
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return apiError('Coupon limit reached');
    if (Number(orderValue) < coupon.minOrderValue) {
      return apiError(`Minimum order value for this coupon is ₹${coupon.minOrderValue}`);
    }

    const discountAmount =
      coupon.discountType === 'flat'
        ? coupon.value
        : Math.round((Number(orderValue) * coupon.value) / 100);

    return apiSuccess({
      code: coupon.code,
      discountAmount: Math.min(discountAmount, Number(orderValue))
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'Unable to validate coupon', 500);
  }
}
