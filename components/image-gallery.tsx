"use client";

import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@/lib/types';

export function ImageGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(product.images[0]);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[32px] bg-white shadow-luxe">
        <div className="relative aspect-[4/5]">
          <Image src={active.url} alt={active.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image) => (
          <button
            key={image.url}
            onClick={() => setActive(image)}
            className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
              active.url === image.url ? 'border-brand-gold ring-2 ring-brand-gold/30' : 'border-stone-200'
            }`}
          >
            <Image src={image.url} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
