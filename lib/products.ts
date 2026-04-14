import { connectToDatabase } from './db';
import ProductModel from '@/models/Product';
import { getDefaultProducts, getDefaultProductBySlug } from './data';
import type { Product } from './types';

type ProductFilters = {
  category?: string;
  color?: string;
  fabric?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featuredOnly?: boolean;
  hotOnly?: boolean;
};

function normalizeProduct(doc: any): Product {
  return {
    _id: doc._id?.toString(),
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    fabric: doc.fabric,
    color: doc.color,
    price: doc.price,
    mrp: doc.mrp,
    discount: doc.discount,
    rating: doc.rating,
    reviewsCount: doc.reviewsCount,
    sizes: doc.sizes,
    images: doc.images,
    isFeatured: doc.isFeatured,
    isHotSelling: doc.isHotSelling,
    tags: doc.tags ?? [],
    stock: doc.stock,
    reviews: (doc.reviews ?? []).map((review: any) => ({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt?.toISOString()
    })),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString()
  };
}

export async function getProducts(filters: ProductFilters = {}) {
  try {
    await connectToDatabase();
    const query: Record<string, unknown> = {};

    if (filters.category) query.category = filters.category;
    if (filters.color) query.color = new RegExp(filters.color, 'i');
    if (filters.fabric) query.fabric = new RegExp(filters.fabric, 'i');
    if (filters.featuredOnly) query.isFeatured = true;
    if (filters.hotOnly) query.isHotSelling = true;
    if (filters.search) {
      query.$or = [
        { title: new RegExp(filters.search, 'i') },
        { description: new RegExp(filters.search, 'i') },
        { tags: new RegExp(filters.search, 'i') }
      ];
    }

    if (typeof filters.minPrice === 'number' || typeof filters.maxPrice === 'number') {
      query.price = {};
      if (typeof filters.minPrice === 'number') (query.price as Record<string, number>).$gte = filters.minPrice;
      if (typeof filters.maxPrice === 'number') (query.price as Record<string, number>).$lte = filters.maxPrice;
    }

    const docs = await ProductModel.find(query).sort({ createdAt: -1 }).lean();
    return docs.map(normalizeProduct);
  } catch {
    const fallback = getDefaultProducts();
    return fallback.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.color && !product.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
      if (filters.fabric && !product.fabric.toLowerCase().includes(filters.fabric.toLowerCase())) return false;
      if (filters.featuredOnly && !product.isFeatured) return false;
      if (filters.hotOnly && !product.isHotSelling) return false;
      if (
        typeof filters.minPrice === 'number' &&
        product.price < filters.minPrice
      ) return false;
      if (
        typeof filters.maxPrice === 'number' &&
        product.price > filters.maxPrice
      ) return false;
      if (filters.search) {
        const haystack = `${product.title} ${product.description} ${(product.tags ?? []).join(' ')}`.toLowerCase();
        if (!haystack.includes(filters.search.toLowerCase())) return false;
      }
      return true;
    });
  }
}

export async function getProductBySlug(slug: string) {
  try {
    await connectToDatabase();
    const doc = await ProductModel.findOne({ slug }).lean();
    return doc ? normalizeProduct(doc) : null;
  } catch {
    return getDefaultProductBySlug(slug) ?? null;
  }
}

export async function getFeaturedProducts() {
  return getProducts({ featuredOnly: true });
}

export async function getHotProducts() {
  return getProducts({ hotOnly: true });
}

export async function getCategoryCounts() {
  const products = await getProducts();
  const categories = ['lehenga-choli', 'sequence-lehenga', 'saree', 'designer-ethnic'];
  return categories.map((category) => ({
    category,
    count: products.filter((product) => product.category === category).length
  }));
}
