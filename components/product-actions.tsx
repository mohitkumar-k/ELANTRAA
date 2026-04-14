"use client";

import { useState } from 'react';
import { Heart, ShoppingBag, Zap } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart, useWishlist } from './providers';
import { QuantitySelector } from './quantity-selector';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [size, setSize] = useState(product.sizes[0] ?? 'Free Size');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem(product, size, quantity);
  };

  const buyNow = () => {
    addItem(product, size, quantity);
    toast.success('Proceeding to checkout');
    router.push('/checkout');
  };

  const discounted = calculateDiscountedPrice(product.mrp, product.discount);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">{product.category.replace('-', ' ')}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-brand-maroonDeep">{product.title}</h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-3xl font-semibold text-brand-maroon">{formatCurrency(discounted)}</span>
          <span className="text-lg text-stone-400 line-through">{formatCurrency(product.mrp)}</span>
          <span className="rounded-full bg-brand-maroon px-3 py-1 text-sm font-semibold text-white">-{product.discount}%</span>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-maroon">Select size</p>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((candidate) => (
            <button
              key={candidate}
              onClick={() => setSize(candidate)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                size === candidate
                  ? 'border-brand-maroon bg-brand-maroon text-white'
                  : 'border-stone-200 bg-white text-brand-maroonDeep hover:border-brand-gold'
              }`}
            >
              {candidate}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <span className="text-sm text-stone-500">Only {product.stock} pieces in stock</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={handleAdd} className="luxe-btn">
          <ShoppingBag size={18} />
          Add to Cart
        </button>
        <button onClick={buyNow} className="luxe-btn-secondary">
          <Zap size={18} />
          Buy Now
        </button>
        <button
          onClick={() => toggleWishlist(product)}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-maroon/15 bg-white px-5 py-3 text-sm font-medium text-brand-maroon transition hover:bg-brand-maroon/5"
        >
          <Heart size={18} className={isWishlisted(product.slug) ? 'fill-brand-gold text-brand-gold' : ''} />
          Wishlist
        </button>
      </div>

      <div className="grid gap-4 rounded-[28px] border border-stone-200 bg-white p-5 text-sm text-stone-600 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-brand-maroonDeep">Fabric details</p>
          <p className="mt-2">Fabric: {product.fabric}</p>
          <p>Color: {product.color}</p>
        </div>
        <div>
          <p className="font-semibold text-brand-maroonDeep">Delivery info</p>
          <p className="mt-2">Free delivery above ₹15,000.</p>
          <p>COD and prepaid via Razorpay.</p>
        </div>
      </div>
    </div>
  );
}
