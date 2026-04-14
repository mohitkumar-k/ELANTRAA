"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useCart, useWishlist } from './providers';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const primaryImage = product.images[0];
  const discounted = calculateDiscountedPrice(product.mrp, product.discount);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-luxe">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-brand-maroon shadow-soft backdrop-blur transition hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <Heart className={isWishlisted(product.slug) ? 'fill-brand-gold text-brand-gold' : ''} size={18} />
        </button>

        <div className="absolute left-4 top-4 rounded-full bg-brand-maroon px-3 py-1 text-xs font-semibold text-white">
          -{product.discount}%
        </div>

        <div className="absolute inset-x-4 bottom-4 flex translate-y-4 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link href={`/product/${product.slug}`} className="flex-1 rounded-full bg-white/95 px-4 py-3 text-center text-xs font-semibold text-brand-maroon shadow-soft">
            <span className="inline-flex items-center justify-center gap-2">
              <Eye size={14} />
              Quick View
            </span>
          </Link>
          <button
            onClick={() => addItem(product, product.sizes[0] ?? 'Free Size')}
            className="flex-1 rounded-full bg-brand-maroon px-4 py-3 text-xs font-semibold text-white shadow-soft"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <ShoppingBag size={14} />
              Add
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="line-clamp-2 text-base font-semibold text-brand-maroonDeep transition group-hover:text-brand-maroon">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-brand-maroon">{formatCurrency(discounted)}</span>
          <span className="text-sm text-stone-400 line-through">{formatCurrency(product.mrp)}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>{product.rating.toFixed(1)} rating</span>
          <span>{product.reviewsCount} reviews</span>
        </div>
      </div>
    </article>
  );
}
