import { NextRequest, NextResponse } from 'next/server';
import { apiError } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import UserModel from '@/models/User';
import { comparePassword, signToken } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return apiError('Invalid login data');

    await connectToDatabase();
    const user = await UserModel.findOne({ email: parsed.data.email }).select('+password');
    if (!user) return apiError('Invalid credentials', 401);

    const passwordValid = await comparePassword(parsed.data.password, user.password);
    if (!passwordValid) return apiError('Invalid credentials', 401);

    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email
    });

    const response = NextResponse.json({
      success: true,
      data: { user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role } }
    });
    response.cookies.set('elantraa_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
    return response;
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'Login failed', 500);
  }
}
