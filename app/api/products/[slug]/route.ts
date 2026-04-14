import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import ProductModel from '@/models/Product';
import { productSchema } from '@/lib/validators';
import { getUserFromRequest } from '@/lib/request-auth';

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) return apiError('Product not found', 404);
  return apiSuccess(product);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = getUserFromRequest(request);
  if (!auth || auth.role !== 'admin') return apiError('Forbidden', 403);
  const { slug } = await params;
  const body = await request.json();
  const parsed = productSchema.partial().safeParse(body);
  if (!parsed.success) return apiError('Invalid product data');

  await connectToDatabase();
  const product = await ProductModel.findOneAndUpdate({ slug }, parsed.data, { new: true });
  if (!product) return apiError('Product not found', 404);
  return apiSuccess({ id: product._id.toString() });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = getUserFromRequest(request);
  if (!auth || auth.role !== 'admin') return apiError('Forbidden', 403);
  const { slug } = await params;
  await connectToDatabase();
  const deleted = await ProductModel.deleteOne({ slug });
  if (!deleted.deletedCount) return apiError('Product not found', 404);
  return apiSuccess({ deleted: true });
}
