import type { Product } from '@/lib/types';
import { ProductGrid } from './product-grid';
import { SectionHeading } from './section-heading';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="mt-16">
      <SectionHeading eyebrow="More to love" title="Similar pieces you may like" />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
