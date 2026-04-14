import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts, getHotProducts } from '@/lib/products';
import { calculateDiscountedPrice, formatCurrency } from '@/lib/utils';
import type { Product } from '@/lib/types';

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <h2 className="text-[24px] font-semibold tracking-tight text-stone-900 sm:text-[29px]">{title}</h2>
      {subtitle ? <p className="mt-2 font-serif text-[14px] italic text-stone-500 sm:text-[18px]">{subtitle}</p> : null}
    </div>
  );
}

function CategoryCard({
  title,
  href,
  image,
  className
}: {
  title: string;
  href: string;
  image: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`group relative overflow-hidden bg-[#f5f5f5] ${className ?? ''}`}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.02))]" />
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-2 text-[11px] font-semibold text-stone-900 shadow-sm sm:bottom-6 sm:px-6 sm:py-3 sm:text-[18px]">
        {title}
      </span>
    </Link>
  );
}

function HomeProductCard({ product }: { product: Product }) {
  const primaryImage = product.images[0];
  const discounted = calculateDiscountedPrice(product.mrp, product.discount);

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[6px] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f7f7]">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-[#ff6a00] text-[11px] font-medium text-white shadow-sm sm:h-16 sm:w-16 sm:text-[16px]">
            -{product.discount}%
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <p className="line-clamp-2 text-[13px] leading-5 text-stone-900 sm:text-[15px] sm:leading-6">{product.title}</p>
          <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px]">
            <span className="text-stone-500 line-through">{formatCurrency(product.mrp)}</span>
            <span className="font-medium text-red-600">{formatCurrency(discounted)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const hot = await getHotProducts();
  const heroImage = hot[0]?.images[0]?.url ?? featured[0]?.images[0]?.url ?? '/logo.png';

  return (
    <div className="bg-white pb-24 text-stone-900 md:pb-0">
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[74vw] min-h-[320px] max-h-[760px] w-full sm:h-[62vw]">
          <Image src={heroImage} alt="ELANTRAA hero banner" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.12)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.16))]" />

          <div className="luxe-container absolute inset-x-0 bottom-6 sm:bottom-12">
            <div className="max-w-[16rem] text-white sm:max-w-xl">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-[22px]">NEW Arrival</p>
              <h1 className="mt-2 text-[28px] font-semibold leading-none tracking-tight text-[#d2c4a6] sm:text-[58px] lg:text-[76px]">
                Saree Collection
              </h1>
              <div className="mt-5">
                <Link href="/shop?category=saree" className="inline-flex rounded-full bg-white/10 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-sm transition hover:bg-white/20 sm:px-5 sm:py-3 sm:text-sm">
                  Shop sarees
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 sm:bottom-4">
            <span className="h-2 w-2 rounded-full bg-black/50" />
            <span className="h-2 w-2 rounded-full bg-black/80" />
          </div>
        </div>
      </section>

      <section className="luxe-container py-10 sm:py-12">
        <div className="flex items-center gap-5">
          <span className="h-px flex-1 bg-stone-200" />
          <h2 className="shrink-0 text-[18px] font-semibold uppercase tracking-[0.08em] text-stone-900 sm:text-[22px]">Shop by category</h2>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="mt-8 grid gap-2 sm:gap-3 md:grid-cols-3">
          <CategoryCard
            title="Designer Lehenga"
            href="/shop?category=lehenga-choli"
            image="https://images.pexels.com/photos/20043153/pexels-photo-20043153.jpeg?cs=srgb&dl=pexels-fliqaindia-20043153.jpg&fm=jpg"
            className="aspect-[3/4] md:aspect-[4/5]"
          />
          <CategoryCard
            title="Sequence Lehenga"
            href="/shop?category=sequence-lehenga"
            image="https://images.pexels.com/photos/33088091/pexels-photo-33088091.jpeg?cs=srgb&dl=pexels-fliqaindia-33088091.jpg&fm=jpg"
            className="aspect-[3/4] md:aspect-[4/5]"
          />
          <CategoryCard
            title="Saree"
            href="/shop?category=saree"
            image="https://images.pexels.com/photos/28428044/pexels-photo-28428044.jpeg?cs=srgb&dl=pexels-dream_-makkerzz-1603229-28428044.jpg&fm=jpg"
            className="col-span-2 aspect-[2/1] md:col-span-1 md:aspect-[4/5]"
          />
        </div>
      </section>

      <section className="bg-white py-8 sm:py-12">
        <div className="luxe-container">
          <SectionTitle title="New Arrival" subtitle="Hot Selling Designer Lehenga with Premium Quality" />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {featured.slice(0, 4).map((product) => (
              <HomeProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-12">
        <div className="luxe-container">
          <SectionTitle title="Trending" subtitle="Top styles in this week" />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {hot.slice(0, 4).map((product) => (
              <HomeProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
