import { Filters } from '@/components/filters';
import { ProductGrid } from '@/components/product-grid';
import { ShopToolbar } from '@/components/shop-toolbar';
import { getProducts } from '@/lib/products';
import { safeNumber } from '@/lib/utils';

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const color = typeof params.color === 'string' ? params.color : undefined;
  const fabric = typeof params.fabric === 'string' ? params.fabric : undefined;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const hotOnly = params.hot === 'true';
  const sort = typeof params.sort === 'string' ? params.sort : 'new';
  const minPrice = typeof params.minPrice === 'string' ? safeNumber(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === 'string' ? safeNumber(params.maxPrice) : undefined;

  const products = await getProducts({
    category,
    color,
    fabric,
    search,
    hotOnly,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined
  }).then((items) => {
    const next = [...items];
    if (sort === 'price-low') return next.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return next.sort((a, b) => b.price - a.price);
    if (sort === 'rating') return next.sort((a, b) => b.rating - a.rating);
    return next;
  });

  return (
    <section className="bg-white py-0">
      <div className="relative overflow-hidden bg-stone-500 text-white">
        <div className="luxe-container flex h-44 items-center justify-center text-center sm:h-56 md:h-72">
          <div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">Special Wedding &amp; Party wear Collection</h1>
            <p className="mt-4 text-lg text-white/90 sm:text-2xl">Designer Collection of the week</p>
          </div>
        </div>
      </div>

      <div className="luxe-container py-5 sm:py-8">
        <ShopToolbar sort={sort} />

        <div className="mt-4 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
            <Filters />
          </aside>

          <div className="space-y-4">
            <div className="hidden items-center justify-between rounded-3xl bg-white/70 px-5 py-4 text-sm text-stone-600 shadow-soft sm:flex">
              <span>{products.length} products found</span>
              <span>Clean mobile grid, 4 columns on desktop</span>
            </div>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
