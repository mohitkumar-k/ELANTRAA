import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { getUserFromRequest } from '@/lib/request-auth';
import { connectToDatabase } from '@/lib/db';
import UserModel from '@/models/User';

export async function GET(request: NextRequest) {
  const auth = getUserFromRequest(request);
  if (!auth) return apiError('Unauthorized', 401);
  await connectToDatabase();
  const user = await UserModel.findById(auth.userId).lean();
  if (!user) return apiError('Unauthorized', 401);
  return apiSuccess({
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      wishlist: user.wishlist?.map((id: any) => id.toString()) ?? []
    }
  });
}
