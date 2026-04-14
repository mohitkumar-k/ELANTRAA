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
    <article className="group overflow-hidden rounded-[22px] border border-stone-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-luxe">
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
          className="absolute left-3 top-3 rounded-full bg-white/90 p-2.5 text-brand-maroon shadow-soft backdrop-blur transition hover:bg-white"
          aria-label="Toggle wishlist"
        >
          <Heart className={isWishlisted(product.slug) ? 'fill-brand-gold text-brand-gold' : ''} size={18} />
        </button>

        <button
          type="button"
          className="absolute left-3 top-16 rounded-full bg-white/90 p-2.5 text-brand-maroon shadow-soft backdrop-blur transition hover:bg-white"
          aria-label="Quick look"
        >
          <Eye size={18} />
        </button>

        <div className="absolute right-3 top-3 rounded-full bg-[#ff6a00] px-3 py-1 text-xs font-semibold text-white shadow-sm">
          -{product.discount}%
        </div>

        <div className="absolute bottom-3 right-3 flex w-12 flex-col items-center gap-2 rounded-[20px] bg-white/95 py-3 text-brand-maroon shadow-soft backdrop-blur sm:w-14">
          <Link href={`/product/${product.slug}`} className="flex items-center justify-center" aria-label="Quick view">
            <Eye size={18} />
          </Link>
          <button
            onClick={() => addItem(product, product.sizes[0] ?? 'Free Size')}
            className="flex items-center justify-center"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-2 px-1 py-4 sm:px-0">
        <p className="text-sm text-stone-500">ELANTRAA</p>
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-stone-900 transition group-hover:text-brand-maroonDeep">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-stone-500 line-through">{formatCurrency(product.mrp)}</span>
          <span className="text-[16px] font-semibold text-red-600">{formatCurrency(discounted)}</span>
        </div>
      </div>
    </article>
  );
}
