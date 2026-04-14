import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { connectToDatabase } from '@/lib/db';
import ProductModel from '@/models/Product';
import { productSchema } from '@/lib/validators';
import { getUserFromRequest } from '@/lib/request-auth';
import { getProducts } from '@/lib/products';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const filters = {
    category: url.searchParams.get('category') ?? undefined,
    color: url.searchParams.get('color') ?? undefined,
    fabric: url.searchParams.get('fabric') ?? undefined,
    search: url.searchParams.get('search') ?? undefined,
    featuredOnly: url.searchParams.get('featuredOnly') === 'true',
    hotOnly: url.searchParams.get('hotOnly') === 'true',
    minPrice: url.searchParams.get('minPrice') ? Number(url.searchParams.get('minPrice')) : undefined,
    maxPrice: url.searchParams.get('maxPrice') ? Number(url.searchParams.get('maxPrice')) : undefined
  };
  return apiSuccess(await getProducts(filters));
}

export async function POST(request: NextRequest) {
  const auth = getUserFromRequest(request);
  if (!auth || auth.role !== 'admin') return apiError('Forbidden', 403);

  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return apiError('Invalid product data');

  await connectToDatabase();
  const product = await ProductModel.create({
    ...parsed.data,
    slug: body.slug ?? parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    reviews: []
  });

  return apiSuccess({ id: product._id.toString() }, { status: 201 });
}
