import type { NextRequest } from 'next/server';
import { verifyToken } from './auth';

export function getTokenFromRequest(request: NextRequest) {
  return request.cookies.get('elantraa_token')?.value ?? null;
}

export function getUserFromRequest(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
