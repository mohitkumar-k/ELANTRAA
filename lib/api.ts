import { NextResponse } from 'next/server';

export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, init);
}

export function apiError(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ success: false, message, ...extra }, { status });
}

export function internalError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Internal server error';
  return apiError(message, 500);
}
