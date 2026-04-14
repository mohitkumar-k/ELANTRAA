"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react';
import { useCart, useWishlist } from './providers';

const navItems = [
  { label: 'New Arrivals', href: '/shop?sort=new' },
  { label: 'Lehenga Choli', href: '/shop?category=lehenga-choli' },
  { label: 'Sarees', href: '/shop?category=saree' },
  { label: 'Hot Selling', href: '/shop?hot=true' }
];

export function Header() {
  const router = useRouter();
  const { count } = useCart();
  const { items } = useWishlist();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const submitSearch = () => {
    const query = search.trim();
    if (!query) return;
    router.push(`/shop?search=${encodeURIComponent(query)}`);
    setSearch('');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 backdrop-blur-xl">
      <div className="bg-brand-maroonDeep text-white">
        <div className="luxe-container flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
          <div className="flex flex-wrap gap-4 text-white/80">
            <span>+91 98765 43210</span>
            <span>hello@elantraa.com</span>
          </div>
          <span className="font-medium text-brand-gold">Free Shipping & COD Available</span>
        </div>
      </div>

      <div className="luxe-container flex items-center gap-5 py-4">
        <Link href="/" className="flex flex-none items-center justify-center rounded-2xl">
          <Image
            src="/logo.jpeg"
            alt="ELANTRAA logo"
            width={200}
            height={68}
            priority
            className="block h-12 w-auto max-w-none object-contain sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-brand-maroonDeep transition hover:text-brand-maroon">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 lg:flex">
          <Search size={16} className="text-stone-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
            placeholder="Search lehengas, sarees..."
            className="w-72 border-none bg-transparent text-sm outline-none placeholder:text-stone-400"
          />
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={submitSearch}
            className="rounded-full border border-brand-maroon/10 bg-brand-cream p-3 text-brand-maroon"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <Link href="/wishlist" className="relative rounded-full border border-brand-maroon/10 bg-brand-cream p-3 text-brand-maroon">
            <Heart size={18} />
            {items.length ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-brand-gold px-1.5 py-0.5 text-[10px] font-semibold text-brand-maroonDeep">
                {items.length}
              </span>
            ) : null}
          </Link>
          <Link href="/cart" className="relative rounded-full border border-brand-maroon/10 bg-brand-cream p-3 text-brand-maroon">
            <ShoppingBag size={18} />
            {count ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-brand-maroon px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </Link>
          <Link href="/account" className="rounded-full border border-brand-maroon/10 bg-brand-cream p-3 text-brand-maroon">
            <User size={18} />
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((current) => !current)}
          className="ml-auto rounded-full border border-brand-maroon/10 bg-brand-cream p-3 text-brand-maroon lg:hidden"
          aria-label="Toggle navigation"
        >
          <Menu size={18} />
        </button>
      </div>

      <div className={`border-t border-stone-100 lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}>
        <div className="luxe-container space-y-4 py-4">
          <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2">
            <Search size={16} className="text-stone-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
              placeholder="Search"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-stone-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="rounded-2xl bg-brand-cream px-4 py-3 text-sm font-medium text-brand-maroonDeep">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
