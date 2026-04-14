"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';

export function ShopToolbar({ sort }: { sort: string }) {
  const router = useRouter();
  const params = useSearchParams();

  const setSort = (value: string) => {
    const next = new URLSearchParams(params?.toString() ?? '');
    if (value) next.set('sort', value);
    else next.delete('sort');
    router.push(`/shop?${next.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-3 text-sm text-stone-500 sm:hidden">
      <button type="button" className="inline-flex items-center gap-2 text-base text-stone-500">
        <Filter size={18} />
        <span>Filter</span>
      </button>

      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-sm border border-stone-300 bg-white text-xs">☰</span>
        <span className="grid h-8 w-8 place-items-center rounded-sm border border-stone-300 bg-stone-200 text-xs">◼</span>
        <span className="grid h-8 w-8 place-items-center rounded-sm border border-stone-300 bg-stone-900 text-xs text-white">◧</span>
      </div>

      <label className="flex items-center gap-2">
        <span>Sort</span>
        <select
          value={sort}
          className="border-none bg-transparent text-stone-500 outline-none"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="new">New</option>
          <option value="rating">Rating</option>
          <option value="price-low">Price low</option>
          <option value="price-high">Price high</option>
        </select>
      </label>
    </div>
  );
}
