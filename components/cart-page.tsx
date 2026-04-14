"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from './providers';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';

export function CartPage() {
  const { items, subtotal, shipping, total, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="luxe-container py-20 text-center">
        <h1 className="font-serif text-4xl text-brand-maroonDeep">Your cart is empty</h1>
        <p className="mt-4 text-stone-600">Add premium pieces to continue to checkout.</p>
        <Link href="/shop" className="luxe-btn mt-8">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="luxe-container py-10">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-4">
          <h1 className="font-serif text-4xl text-brand-maroonDeep">Cart</h1>
          {items.map((item) => (
            <div key={`${item.product.slug}-${item.size}`} className="flex flex-col gap-4 rounded-[28px] border border-stone-200 bg-white p-4 sm:flex-row">
              <div className="relative h-40 w-full overflow-hidden rounded-3xl sm:w-32">
                <Image src={item.product.images[0].url} alt={item.product.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/product/${item.product.slug}`} className="font-semibold text-brand-maroonDeep">
                      {item.product.title}
                    </Link>
                    <p className="mt-1 text-sm text-stone-500">Size: {item.size}</p>
                    <p className="mt-2 text-sm text-stone-500">
                      {formatCurrency(calculateDiscountedPrice(item.product.mrp, item.product.discount))}
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.product.slug, item.size)} className="text-stone-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.product.slug, item.size, item.quantity - 1)}
                    className="rounded-full border border-stone-200 p-2"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-10 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.slug, item.size, item.quantity + 1)}
                    className="rounded-full border border-stone-200 p-2"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-2xl text-brand-maroonDeep">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="luxe-btn mt-6 w-full">
              Proceed to checkout
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
