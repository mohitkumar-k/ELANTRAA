"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Heart, LogIn, Mail, Menu, Phone, Search, ShieldCheck, ShoppingBag, User, X } from 'lucide-react';
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const submitSearch = () => {
    const query = search.trim();
    if (!query) return;
    router.push(`/shop?search=${encodeURIComponent(query)}`);
    setSearch('');
  };

  const mobileDrawer =
    mobileOpen && typeof document !== 'undefined'
      ? createPortal(
          <div className="fixed inset-0 z-[200] lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/50"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 flex w-[78vw] max-w-[360px] flex-col bg-white shadow-[20px_0_40px_rgba(0,0,0,0.12)]">
              <div className="relative flex items-stretch border-b border-stone-200">
                <button
                  type="button"
                  className="flex-1 border-b-2 border-brand-maroon bg-stone-100 px-4 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-stone-900"
                >
                  Menu
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid w-14 shrink-0 place-items-center bg-stone-900 text-white shadow-lg"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <nav className="divide-y divide-stone-200">
                  <Link href="/shop?sort=new" onClick={() => setMobileOpen(false)} className="block px-6 py-5 text-[18px] text-stone-900">
                    New Arrival
                  </Link>
                  <Link href="/shop?category=lehenga-choli" onClick={() => setMobileOpen(false)} className="block px-6 py-5 text-[18px] text-stone-900">
                    Lehenga choli
                  </Link>
                  <Link href="/shop?category=saree" onClick={() => setMobileOpen(false)} className="block px-6 py-5 text-[18px] text-stone-900">
                    Saree
                  </Link>
                  <Link href="/shop?hot=true" onClick={() => setMobileOpen(false)} className="block px-6 py-5 text-[18px] text-stone-900">
                    Best Seller
                  </Link>
                  <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-6 py-5 text-[18px] text-stone-900">
                    <Heart size={22} />
                    Wishlist
                  </Link>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-6 py-5 text-[18px] text-stone-900">
                    <LogIn size={22} />
                    Login / Register
                  </Link>
                </nav>

                <div className="border-t border-stone-200 px-6 py-6">
                  <p className="text-[18px] text-stone-900">Need help?</p>
                  <div className="mt-5 space-y-3 text-[18px] text-stone-500">
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-stone-400" />
                      <span className="border-b border-stone-300 pb-1">+91 7433999837</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-stone-400" />
                      <span className="border-b border-stone-300 pb-1">contact@blfabric.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )
      : null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 backdrop-blur-xl">
      <div className="hidden bg-black text-white md:block">
        <div className="luxe-container flex items-center justify-center py-2 text-sm">
          <span className="font-medium">2 days easy returns &amp; Exchange</span>
        </div>
      </div>

      <div className="hidden border-b border-black/5 bg-stone-50 text-stone-700 md:block">
        <div className="luxe-container grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3 text-sm">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-stone-400" />
              +91 7433999837
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-stone-400" />
              contact@blfabric.com
            </span>
          </div>
          <div className="text-center text-[13px] uppercase tracking-[0.12em] text-stone-500">
            FREE SHIPPING &amp; COD AVAILABLE IN INDIA{' '}
            <Link href="/shop" className="font-semibold text-stone-900 underline-offset-2 hover:underline">
              Shop Now
            </Link>
          </div>
          <div className="text-right text-sm text-stone-900">
            <Link href="/shop" className="hover:underline">
              Return/Exchange Request
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-black/5 bg-black text-white md:hidden">
        <div className="luxe-container flex items-center justify-center gap-2 py-2 text-[11px] font-medium uppercase tracking-[0.24em]">
          <ShieldCheck size={12} />
          Quality Assured
        </div>
      </div>

      <div className="border-b border-black/5 bg-stone-100 text-stone-700 md:hidden">
        <div className="luxe-container py-2 text-[9px] uppercase tracking-[0.14em] text-stone-600">
          <div className="flex items-center justify-center gap-1 whitespace-nowrap text-center">
            <span className="min-w-0 truncate">FREE SHIPPING &amp; COD AVAILABLE IN INDIA</span>
            <Link href="/shop" className="shrink-0 font-semibold text-brand-maroon underline-offset-2 hover:underline">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="luxe-container grid grid-cols-[auto,1fr,auto] items-center gap-2 py-3 md:hidden">
        <button
          onClick={() => setMobileOpen((current) => !current)}
          className="rounded-full border border-brand-maroon/10 bg-brand-cream p-2.5 text-brand-maroon"
          aria-label="Toggle navigation"
        >
          <Menu size={18} />
        </button>

        <Link href="/" className="mx-auto flex flex-none items-center justify-center rounded-2xl">
          <Image
            src="/logo.png"
            alt="ELANTRAA logo"
            width={320}
            height={100}
            priority
            className="block h-11 w-auto max-w-none object-contain sm:h-12"
          />
        </Link>

        <div className="flex items-center justify-end gap-2">
          <button onClick={submitSearch} className="rounded-full border border-brand-maroon/10 bg-brand-cream p-2.5 text-brand-maroon" aria-label="Search">
            <Search size={18} />
          </button>
          <Link href="/wishlist" className="relative rounded-full border border-brand-maroon/10 bg-brand-cream p-2.5 text-brand-maroon">
            <Heart size={18} />
            {items.length ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-brand-maroon px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {items.length}
              </span>
            ) : null}
          </Link>
          <Link href="/cart" className="relative rounded-full border border-brand-maroon/10 bg-brand-cream p-2.5 text-brand-maroon">
            <ShoppingBag size={18} />
            {count ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-brand-maroon px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="luxe-container flex items-center gap-5 py-5">
          <Link href="/" className="flex flex-none items-center justify-center rounded-2xl">
            <Image
              src="/logo.png"
              alt="ELANTRAA logo"
              width={320}
              height={100}
              priority
              className="block h-10 w-auto max-w-none object-contain md:h-16"
            />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-brand-maroonDeep transition hover:text-brand-maroon">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <button onClick={submitSearch} className="text-stone-800 transition hover:text-brand-maroon" aria-label="Search">
              <Search size={24} />
            </button>
            <Link href="/account" className="text-stone-800 transition hover:text-brand-maroon" aria-label="Account">
              <User size={24} />
            </Link>
            <Link href="/wishlist" className="relative text-stone-800 transition hover:text-brand-maroon" aria-label="Wishlist">
              <Heart size={24} />
              {items.length ? (
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-black text-[11px] font-semibold text-white">
                  {items.length}
                </span>
              ) : null}
            </Link>
            <Link href="/cart" className="relative text-stone-800 transition hover:text-brand-maroon" aria-label="Cart">
              <ShoppingBag size={24} />
              {count ? (
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-black text-[11px] font-semibold text-white">
                  {count}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </div>

      {mobileDrawer}
    </header>
  );
}
