import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectToDatabase } from './db';
import UserModel from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET ?? 'development-secret-change-me';
const COOKIE_NAME = 'elantraa_token';

export type JwtPayload = {
  userId: string;
  role: 'user' | 'admin';
  email: string;
};

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const payload = verifyToken(token);
    await connectToDatabase();
    return await UserModel.findById(payload.userId).lean();
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
}

export function authCookieName() {
  return COOKIE_NAME;
}
