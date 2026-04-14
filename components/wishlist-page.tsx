"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlist } from './providers';
import { formatCurrency } from '@/lib/utils';

export function WishlistPage() {
  const { items, removeWishlistItem } = useWishlist();

  if (!items.length) {
    return (
      <div className="luxe-container py-20 text-center">
        <Heart className="mx-auto text-brand-maroon" size={42} />
        <h1 className="mt-4 font-serif text-4xl text-brand-maroonDeep">Your wishlist is empty</h1>
        <p className="mt-4 text-stone-600">Save pieces you love and revisit them later.</p>
        <Link href="/shop" className="luxe-btn mt-8">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <section className="luxe-container py-10">
      <h1 className="font-serif text-4xl text-brand-maroonDeep">Wishlist</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((product) => (
          <div key={product.slug} className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-soft">
            <div className="relative aspect-[4/5]">
              <Image src={product.images[0].url} alt={product.title} fill className="object-cover" />
            </div>
            <div className="space-y-3 p-5">
              <Link href={`/product/${product.slug}`} className="block font-semibold text-brand-maroonDeep">
                {product.title}
              </Link>
              <p className="text-sm text-brand-maroon">{formatCurrency(product.price)}</p>
              <button onClick={() => removeWishlistItem(product.slug)} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-red-500">
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
