import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-maroon">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-maroon/20 blur-3xl" />
      </div>

      <div className="luxe-container relative grid min-h-[760px] items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-brand-gold/30 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-maroon">
            Premium ethnic fashion
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight tracking-tight text-brand-maroonDeep sm:text-6xl lg:text-7xl">
            As Seen On Premium Fashion Platforms
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-stone-700 sm:text-lg">
            Discover ELANTRAA, a luxury-first destination for lehenga choli, sarees, and designer ethnic wear crafted to elevate every celebration.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop" className="luxe-btn">
              Shop Now
              <ArrowRight size={18} />
            </Link>
            <Link href="/shop?hot=true" className="luxe-btn-secondary">
              Hot Selling
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm text-brand-maroonDeep">
            {['Free shipping & COD', 'Fast delivery', 'Luxury packaging'].map((item) => (
              <div key={item} className="rounded-full border border-brand-maroon/10 bg-white/70 px-4 py-2">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-brand-gold/25 blur-2xl" />
          <div className="absolute -right-6 bottom-12 h-32 w-32 rounded-full bg-brand-maroon/20 blur-2xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel overflow-hidden p-3">
              <div className="relative aspect-[4/5] rounded-[22px]">
                <Image
                  src="https://images.pexels.com/photos/33088091/pexels-photo-33088091.jpeg?cs=srgb&dl=pexels-fliqaindia-33088091.jpg&fm=jpg"
                  alt="Ethnic fashion model"
                  fill
                  className="rounded-[22px] object-cover"
                  priority
                />
              </div>
            </div>
            <div className="mt-16 glass-panel overflow-hidden p-3">
              <div className="relative aspect-[4/5] rounded-[22px]">
                <Image
                  src="https://images.pexels.com/photos/20043126/pexels-photo-20043126.jpeg?cs=srgb&dl=pexels-fliqaindia-20043126.jpg&fm=jpg"
                  alt="Designer ethnic wear"
                  fill
                  className="rounded-[22px] object-cover"
                />
              </div>
            </div>
          </div>
          <div className="glass-panel absolute -bottom-8 left-6 right-6 flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Exclusive drop</p>
              <p className="mt-1 font-serif text-lg text-brand-maroonDeep">Wedding Edit 2026</p>
            </div>
            <div className="rounded-full bg-brand-maroon px-4 py-2 text-sm font-semibold text-white">
              70% Off
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
