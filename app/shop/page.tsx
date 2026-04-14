import { Filters } from '@/components/filters';
import { ProductGrid } from '@/components/product-grid';
import { SectionHeading } from '@/components/section-heading';
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
  });

  return (
    <section className="luxe-container py-10">
      <SectionHeading
        eyebrow="Shop collection"
        title="Premium ethnic fashion"
        description="Filter by category, color, fabric, and price to find the perfect ELANTRAA statement piece."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Filters />
        </aside>

        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-3xl bg-white/70 px-5 py-4 text-sm text-stone-600 shadow-soft">
            <span>{products.length} products found</span>
            <span>4 column grid on desktop, 2 on mobile</span>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
