import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/70 bg-brand-maroonDeep text-white">
      <div className="luxe-container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image src="/logo.png" alt="ELANTRAA logo" width={220} height={220} className="h-16 w-auto object-contain" />
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
            Premium ethnic fashion curated for modern celebrations. Crafted for luxury, comfort, and standout styling.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Shop</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/shop?category=lehenga-choli">Lehenga Choli</Link></li>
            <li><Link href="/shop?category=saree">Sarees</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Support</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li><Link href="/account">My Account</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/checkout">Checkout</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        © {new Date().getFullYear()} ELANTRAA. All rights reserved.
      </div>
    </footer>
  );
}
