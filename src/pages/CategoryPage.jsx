import { useEffect, useMemo, useState } from 'react'
import { FiChevronDown, FiFilter } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ProductCard from '../components/ProductCard'
import Seo from '../components/Seo'
import { useCategoriesData, useProducts } from '../hooks/useStoreData'
import { slugify } from '../utils/format'

function CategoryPage() {
  const { slug } = useParams()
  const { products, loading } = useProducts()
  const { categories } = useCategoriesData()
  const [sort, setSort] = useState('newest')
  const [filters, setFilters] = useState({ maxPrice: 0, colors: [], fabrics: [] })

  const category = categories.find((item) => item.slug === slug || slugify(item.name) === slug)
  const categoryKeys = new Set(
    [slug, category?.slug, slugify(category?.name || ''), category?.name]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase()),
  )
  const categoryProducts = products.filter((item) => {
    const productCategory = String(item.category || '').toLowerCase()
    return categoryKeys.has(productCategory) || categoryKeys.has(slugify(item.category || ''))
  })
  const maxAvailablePrice = categoryProducts.reduce((max, item) => Math.max(max, Number(item.salePrice || 0)), 0)
  const colors = [...new Set(categoryProducts.map((item) => item.color))]
  const fabrics = [...new Set(categoryProducts.map((item) => item.fabric))]
  const heroTitle = String(category?.name || 'Category')
    .replace(/-/g, ' ')
    .toUpperCase()

  useEffect(() => {
    setFilters({ maxPrice: maxAvailablePrice || 0, colors: [], fabrics: [] })
  }, [slug, maxAvailablePrice])

  const filtered = useMemo(() => {
    const next = categoryProducts
      .filter((item) => item.salePrice <= filters.maxPrice)
      .filter((item) => !filters.colors.length || filters.colors.includes(item.color))
      .filter((item) => !filters.fabrics.length || filters.fabrics.includes(item.fabric))

    return next.sort((a, b) => {
      if (sort === 'price-low') return a.salePrice - b.salePrice
      if (sort === 'price-high') return b.salePrice - a.salePrice
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }, [categoryProducts, filters, sort])

  return (
    <>
      <Seo title={category?.name || 'Category'} description={category?.description} />

      <section className="container-shell page-section">
        <div className="overflow-hidden rounded-[6px] bg-[linear-gradient(135deg,#E0B84A_0%,#A8841F_100%)] px-6 py-16 text-center text-white sm:px-10 sm:py-24">
          <p className="text-[22px] font-normal uppercase tracking-[0.05em] sm:text-[34px]">{heroTitle}</p>
          <p className="mx-auto mt-6 max-w-3xl text-[14px] leading-[1.15] text-white sm:text-[24px] sm:leading-[1.2]">
            {category?.description || 'Discover our latest collection with timeless silhouettes and occasion-ready styling.'}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-y border-[#E0B84A] px-1 py-4 text-[#C9A227]">
          <button type="button" className="inline-flex items-center gap-2 text-[14px] sm:text-base">
            <FiFilter className="text-[18px]" />
            <span>Filter</span>
          </button>
          <div className="hidden items-center gap-3 text-[#C9A227] sm:flex">
            <span className="h-10 w-10 border border-[#E0B84A] bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_25%,#E0B84A_25%,#E0B84A_45%,#ffffff_45%,#ffffff_55%,#E0B84A_55%,#E0B84A_75%,#ffffff_75%,#ffffff_100%)]" />
            <span className="h-10 w-10 border border-[#E0B84A] bg-[linear-gradient(90deg,#E0B84A_0%,#c9a227_100%)] opacity-75" />
            <span className="h-10 w-10 border-2 border-[#A8841F] bg-[linear-gradient(90deg,#A8841F_0%,#A8841F_42%,transparent_42%,transparent_58%,#A8841F_58%,#A8841F_100%)]" />
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="appearance-none bg-transparent pr-7 text-right text-[14px] text-[#C9A227] outline-none sm:text-base"
            >
              <option value="newest">Sort</option>
              <option value="price-low">Price low-high</option>
              <option value="price-high">Price high-low</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#C9A227]" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            colors={colors}
            fabrics={fabrics}
            maxAvailablePrice={maxAvailablePrice}
          />
          <div>
            {loading ? (
              <LoadingSkeleton cards={8} />
            ) : filtered.length === 0 ? (
              <div className="glass-card p-10 text-center">
                <p className="heading-display text-4xl text-[#A8841F]">No products found</p>
                <p className="mt-3 text-sm text-[#C9A227]">
                  This category does not have any matching products yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} variant="category-reference" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CategoryPage
