import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import UserModel from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return apiError('Email is required');

    await connectToDatabase();
    const user = await UserModel.findOne({ email });
    if (!user) return apiSuccess({ message: 'If the email exists, a reset link was created' });

    const token = crypto.randomBytes(24).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    return apiSuccess({
      message: 'Password reset token created',
      resetToken: process.env.NODE_ENV === 'production' ? undefined : token
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'Unable to process request', 500);
  }
}
