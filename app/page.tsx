import { Hero } from '@/components/hero';
import { CategoryGrid } from '@/components/category-grid';
import { ProductGrid } from '@/components/product-grid';
import { SectionHeading } from '@/components/section-heading';
import { getFeaturedProducts, getHotProducts } from '@/lib/products';
import Link from 'next/link';

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const hot = await getHotProducts();

  return (
    <>
      <Hero />
      <CategoryGrid />

      <section className="luxe-container py-16">
        <SectionHeading
          eyebrow="Featured edits"
          title="Best-selling couture pieces"
          description="Luxury pieces curated for wedding season, festive gifting, and premium occasion dressing."
        />
        <div className="mt-10">
          <ProductGrid products={featured.slice(0, 4)} />
        </div>
      </section>

      <section className="bg-brand-maroonDeep py-16 text-white">
        <div className="luxe-container grid gap-6 md:grid-cols-3">
          {[
            { title: 'Premium quality', desc: 'Curated fabrics and craftsmanship.' },
            { title: 'COD available', desc: 'Flexible payment at checkout.' },
            { title: 'Fast dispatch', desc: 'Speedy fulfillment and support.' }
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="font-serif text-2xl">{item.title}</p>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="luxe-container py-16">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Hot selling"
            title="Trending designs customers love"
            description="From bridal statements to lightweight festive staples, these are the pieces drawing the most attention."
          />
          <Link href="/shop?hot=true" className="hidden text-sm font-semibold text-brand-maroon underline-offset-4 hover:underline md:block">
            View all
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={hot.slice(0, 4)} />
        </div>
      </section>
    </>
  );
}
