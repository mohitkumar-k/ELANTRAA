"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const colors = ['Maroon', 'Gold', 'Ivory', 'Pink', 'Emerald', 'Blue', 'Rose Gold'];
const fabrics = ['Silk Blend', 'Banarasi Silk', 'Georgette', 'Organza', 'Net'];
const categories = [
  { label: 'All', value: '' },
  { label: 'Lehenga Choli', value: 'lehenga-choli' },
  { label: 'Sequence Lehenga', value: 'sequence-lehenga' },
  { label: 'Saree', value: 'saree' },
  { label: 'Designer Ethnic', value: 'designer-ethnic' }
];

export function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  const values = useMemo(
    () => ({
      category: params?.get('category') ?? '',
      color: params?.get('color') ?? '',
      fabric: params?.get('fabric') ?? '',
      minPrice: params?.get('minPrice') ?? '',
      maxPrice: params?.get('maxPrice') ?? '',
      search: params?.get('search') ?? ''
    }),
    [params]
  );

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params?.toString() ?? '');
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/shop?${next.toString()}`);
  };

  return (
    <div className="glass-panel space-y-4 p-5">
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-maroon">Search</label>
        <input
          className="luxe-input"
          placeholder="Search products"
          defaultValue={values.search}
          onChange={(e) => update('search', e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-maroon">Category</label>
        <select className="luxe-input" value={values.category} onChange={(e) => update('category', e.target.value)}>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-maroon">Color</label>
        <select className="luxe-input" value={values.color} onChange={(e) => update('color', e.target.value)}>
          <option value="">All Colors</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-maroon">Fabric</label>
        <select className="luxe-input" value={values.fabric} onChange={(e) => update('fabric', e.target.value)}>
          <option value="">All Fabrics</option>
          {fabrics.map((fabric) => (
            <option key={fabric} value={fabric}>
              {fabric}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-maroon">Min</label>
          <input
            type="number"
            className="luxe-input"
            placeholder="0"
            value={values.minPrice}
            onChange={(e) => update('minPrice', e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-maroon">Max</label>
          <input
            type="number"
            className="luxe-input"
            placeholder="50000"
            value={values.maxPrice}
            onChange={(e) => update('maxPrice', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
