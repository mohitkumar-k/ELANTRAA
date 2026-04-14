import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import UserModel from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) return apiError('Token and password are required');

    await connectToDatabase();
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: new Date() }
    });
    if (!user) return apiError('Invalid or expired reset token', 400);

    user.password = await hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return apiSuccess({ message: 'Password updated successfully' });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'Unable to reset password', 500);
  }
}
