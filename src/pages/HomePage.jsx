import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import Seo from '../components/Seo'
import { useCategoriesData, useHomeContentData, useProducts } from '../hooks/useStoreData'

function CategoryFeatureCard({ category, index, total }) {
  if (!category) return null
  const isLastOddCard = total % 2 === 1 && index === total - 1

  return (
    <div
      className={`fade-in-up ${isLastOddCard ? 'col-span-2' : ''}`.trim()}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <Link
        to={`/category/${category.slug}`}
        className="group block overflow-hidden transition duration-300 hover:-translate-y-1"
      >
        <div className="relative h-full">
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
              isLastOddCard ? 'h-[250px] rounded-[14px] min-[390px]:h-[280px] sm:h-[380px] lg:h-[420px]' : 'h-[190px] rounded-[14px] min-[390px]:h-[220px] sm:h-[320px] lg:h-[360px]'
            }`}
          />
          <div className="absolute inset-0 rounded-[14px] bg-[linear-gradient(180deg,rgba(34,26,10,0.04),rgba(34,26,10,0.42))]" />
          <div className="absolute inset-x-0 bottom-4 flex justify-center px-3 sm:bottom-5">
            <div className="w-auto max-w-[calc(100%-1.5rem)] border border-white/55 bg-[rgba(255,255,255,0.92)] px-4 py-2.5 text-center backdrop-blur sm:max-w-[220px] sm:px-5 sm:py-3">
              <h3 className="text-[12px] font-semibold uppercase leading-[1.2] tracking-[0.1em] text-ink sm:text-[14px]">
                {category.name}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

function chunkProducts(items, size) {
  const chunks = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

function HomePage() {
  const { categories } = useCategoriesData()
  const { homeContent } = useHomeContentData()
  const { products, loading } = useProducts()
  const trending = products.slice(0, 4)
  const arrivalSlides = chunkProducts(products.slice(0, 8), 2)
  const hero = homeContent?.hero
  const primaryCtaLabel = hero?.ctaLabel?.trim() || 'Shop Now'

  return (
    <>
      <Seo title="Home" description="Premium Indian fashion with new arrivals, sarees, lehengas, and festive edits." />

      <section className="relative overflow-hidden border-b border-[#DED4C5] bg-[#110D0A]">
        <div className="absolute inset-0">
          <img
            src={hero?.image}
            alt={hero?.imageAlt || hero?.title}
            decoding="async"
            className="h-full w-full object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,9,5,0.88)_0%,rgba(13,9,5,0.66)_42%,rgba(13,9,5,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(17,13,10,0.74))]" />
        </div>

        <div className="container-shell relative flex min-h-[560px] items-end py-8 sm:min-h-[660px] sm:py-12 lg:min-h-[calc(100vh-84px)] lg:items-center">
          <div className="max-w-2xl pb-6 text-white sm:pb-8 lg:pb-0">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#E0C78C] sm:mb-5">
              {hero?.eyebrow}
            </p>
            <h1 className="max-w-2xl text-[2.55rem] font-semibold uppercase leading-[0.94] text-white min-[390px]:text-[3rem] sm:text-7xl lg:text-8xl">
              {hero?.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#F3E9D8] sm:mt-6 sm:text-base sm:leading-8">
              {hero?.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
              <Link
                to={hero?.ctaLink || '/'}
                className="inline-flex min-w-[170px] items-center justify-center gap-2 border border-white bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#1F170E] transition duration-300 hover:bg-[#E0C78C] sm:px-7 sm:text-sm"
                style={{ color: '#1F170E' }}
              >
                <span>{primaryCtaLabel}</span>
                <FiArrowRight aria-hidden="true" style={{ color: '#1F170E' }} />
              </Link>
              <Link
                to="/category/saree"
                className="inline-flex items-center justify-center border border-[#E0C78C] bg-[#E0C78C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#1F170E] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition duration-300 hover:border-white hover:bg-white sm:px-7 sm:text-sm"
              >
                Explore Sarees
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell page-section">
        <SectionHeader
          title="Shop By Category"
          description="A softer, more elevated way to browse the silhouettes that define your next celebration."
          variant="lined"
        />
        <div className="grid grid-cols-2 gap-3 min-[390px]:gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <CategoryFeatureCard key={category.slug} category={category} index={index} total={categories.length} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#DED4C5] bg-white">
        <div className="container-shell page-section">
          <div className="mb-6 max-w-3xl sm:mb-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#8E7E67]">Just In</p>
            <h2 className="mt-3 text-[2rem] font-semibold uppercase leading-none tracking-[-0.04em] text-[#1F170E] sm:text-[3.25rem]">
              New Arrival
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6E5F4C] sm:text-base">
              Fresh festive statements with a premium finish
            </p>
          </div>
          {loading ? (
            <LoadingSkeleton cards={4} />
          ) : (
            <div className="overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none]">
              <div className="flex w-full">
                {arrivalSlides.map((slide, slideIndex) => (
                  <div key={`arrival-slide-${slideIndex}`} className="w-full shrink-0 snap-start pr-2 sm:pr-0">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-6 min-[390px]:gap-x-4 sm:grid-cols-2 sm:gap-6">
                      {slide.map((product) => (
                        <ProductCard key={product.id} product={product} variant="arrival-reference" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="container-shell page-section">
        <div className="mb-6 text-center sm:mb-10">
          <div className="flex items-center justify-center gap-5">
            <span className="h-px w-16 bg-[linear-gradient(90deg,transparent,#DED4C5)]" aria-hidden="true" />
            <p className="text-2xl font-semibold uppercase tracking-[-0.03em] text-[#1F170E] sm:text-4xl">Trending</p>
            <span className="h-px w-16 bg-[linear-gradient(90deg,#DED4C5,transparent)]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-[#8E7E67] sm:text-base">Most viewed this week</p>
        </div>
        {loading ? (
          <LoadingSkeleton cards={4} />
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 min-[390px]:gap-x-4 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} variant="trending-reference" />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default HomePage
