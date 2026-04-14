import { NextRequest, NextResponse } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import UserModel from '@/models/User';
import { hashPassword, signToken } from '@/lib/auth';
import { registerSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return apiError('Invalid registration data');

    await connectToDatabase();
    const existing = await UserModel.findOne({ email: parsed.data.email }).lean();
    if (existing) return apiError('Email already registered', 409);

    const user = await UserModel.create({
      ...parsed.data,
      password: await hashPassword(parsed.data.password),
      wishlist: []
    });

    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email
    });

    const response = NextResponse.json({
      success: true,
      data: {
        user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
      }
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
    return apiError(error instanceof Error ? error.message : 'Registration failed', 500);
  }
}
