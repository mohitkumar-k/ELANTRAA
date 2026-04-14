import { notFound } from 'next/navigation';
import { ImageGallery } from '@/components/image-gallery';
import { ProductActions } from '@/components/product-actions';
import { RelatedProducts } from '@/components/related-products';
import { ReviewForm } from '@/components/review-form';
import { ReviewList } from '@/components/review-list';
import { SectionHeading } from '@/components/section-heading';
import { getProductBySlug, getProducts } from '@/lib/products';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (await getProducts({ category: product.category }))
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  return (
    <section className="luxe-container py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <ImageGallery product={product} />
        <ProductActions product={product} />
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-[28px] border border-stone-200 bg-white p-6">
            <SectionHeading eyebrow="Product story" title="Description" />
            <p className="mt-4 leading-8 text-stone-600">{product.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-brand-cream p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">MRP</p>
                <p className="mt-2 text-lg font-semibold text-brand-maroonDeep">{formatCurrency(product.mrp)}</p>
              </div>
              <div className="rounded-2xl bg-brand-cream p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">Discounted</p>
                <p className="mt-2 text-lg font-semibold text-brand-maroonDeep">
                  {formatCurrency(calculateDiscountedPrice(product.mrp, product.discount))}
                </p>
              </div>
              <div className="rounded-2xl bg-brand-cream p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">Rating</p>
                <p className="mt-2 text-lg font-semibold text-brand-maroonDeep">
                  {product.rating} / 5 from {product.reviewsCount} reviews
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-white p-6">
            <SectionHeading eyebrow="Customer voices" title="Reviews" />
            <div className="mt-6">
              <ReviewList reviews={product.reviews ?? []} />
            </div>
          </div>

          <ReviewForm slug={product.slug} />
        </div>

        <div className="space-y-6 rounded-[28px] border border-stone-200 bg-white p-6">
          <SectionHeading eyebrow="Policies" title="Delivery and returns" />
          <div className="space-y-4 text-sm leading-7 text-stone-600">
            <p>Free shipping above ₹15,000 and COD support across serviceable pin codes.</p>
            <p>Easy exchange or return within 7 days of delivery for unused products with tags intact.</p>
            <p>Orders are packed with premium protective packaging to preserve fabric and embellishment quality.</p>
          </div>
        </div>
      </div>

      <RelatedProducts products={related} />
    </section>
  );
}
