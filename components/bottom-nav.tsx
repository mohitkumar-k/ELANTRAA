"use client";

import Link from 'next/link';
import { Heart, Home, ShoppingBag, User } from 'lucide-react';
import { useCart, useWishlist } from './providers';

export function BottomNav() {
  const { count } = useCart();
  const { items } = useWishlist();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/70 bg-white/95 px-3 py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium text-stone-600">
        <Link href="/" className="flex flex-col items-center gap-1 py-2">
          <Home size={18} />
          Home
        </Link>
        <Link href="/shop" className="flex flex-col items-center gap-1 py-2">
          <ShoppingBag size={18} />
          Shop
        </Link>
        <Link href="/wishlist" className="flex flex-col items-center gap-1 py-2">
          <span className="relative">
            <Heart size={18} />
            {items.length ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-brand-maroon px-1.5 py-0.5 text-[10px] text-white">
                {items.length}
              </span>
            ) : null}
          </span>
          Wishlist
        </Link>
        <Link href="/cart" className="flex flex-col items-center gap-1 py-2">
          <span className="relative">
            <User size={18} />
            {count ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-brand-gold px-1.5 py-0.5 text-[10px] text-brand-maroonDeep">
                {count}
              </span>
            ) : null}
          </span>
          Account
        </Link>
      </div>
    </nav>
  );
}
