import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from './section-heading';

const categories = [
  {
    title: 'Designer Lehenga',
    slug: 'lehenga-choli',
    image: 'https://images.pexels.com/photos/20043153/pexels-photo-20043153.jpeg?cs=srgb&dl=pexels-fliqaindia-20043153.jpg&fm=jpg'
  },
  {
    title: 'Sequence Lehenga',
    slug: 'sequence-lehenga',
    image: 'https://images.pexels.com/photos/33088091/pexels-photo-33088091.jpeg?cs=srgb&dl=pexels-fliqaindia-33088091.jpg&fm=jpg'
  },
  {
    title: 'Saree',
    slug: 'saree',
    image: 'https://images.pexels.com/photos/28428044/pexels-photo-28428044.jpeg?cs=srgb&dl=pexels-dream_-makkerzz-1603229-28428044.jpg&fm=jpg'
  }
];

export function CategoryGrid() {
  return (
    <section className="luxe-container py-16">
      <SectionHeading
        eyebrow="Shop by category"
        title="Curated silhouettes for every celebration"
        description="Discover statement pieces crafted for weddings, festivals, and premium occasion dressing."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop?category=${category.slug}`}
            className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-soft"
          >
            <div className="relative aspect-[4/5]">
              <Image src={category.image} alt={category.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroonDeep/75 via-brand-maroonDeep/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Explore</p>
              <h3 className="mt-2 font-serif text-2xl">{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
