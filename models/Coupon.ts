import mongoose, { Schema, type Model } from 'mongoose';

export type CouponDocument = {
  code: string;
  discountType: 'flat' | 'percent';
  value: number;
  minOrderValue: number;
  active: boolean;
  expiresAt?: Date;
  usageLimit?: number;
  usedCount: number;
};

const couponSchema = new Schema<CouponDocument>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, index: true },
    discountType: { type: String, enum: ['flat', 'percent'], required: true },
    value: { type: Number, required: true },
    minOrderValue: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    expiresAt: Date,
    usageLimit: Number,
    usedCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const CouponModel: Model<CouponDocument> =
  mongoose.models.Coupon || mongoose.model<CouponDocument>('Coupon', couponSchema);

export default CouponModel;
