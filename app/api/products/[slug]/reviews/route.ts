import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import ProductModel from '@/models/Product';

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { name, rating, comment } = await request.json();
  if (!name || !rating || !comment) return apiError('Name, rating and comment are required');

  await connectToDatabase();
  const product = await ProductModel.findOne({ slug });
  if (!product) return apiError('Product not found', 404);

  product.reviews.unshift({ name, rating, comment, createdAt: new Date() } as never);
  product.reviewsCount = (product.reviewsCount ?? 0) + 1;
  const sum = product.reviews.reduce((total, review: any) => total + (review.rating || 0), 0);
  product.rating = product.reviews.length ? Math.round((sum / product.reviews.length) * 10) / 10 : product.rating;
  await product.save();
  return apiSuccess({ success: true });
}
