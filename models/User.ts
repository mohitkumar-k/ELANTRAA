import mongoose, { Schema, type Model } from 'mongoose';

export type UserDocument = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'user' | 'admin';
  wishlist: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { timestamps: true }
);

const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
