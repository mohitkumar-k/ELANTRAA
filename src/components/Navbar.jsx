import { useState } from 'react'
import { FiHeart, FiMail, FiMenu, FiPhone, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo-trimmed.png'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { useCategoriesData } from '../hooks/useStoreData'

const mobileLinks = [
  { label: 'Wishlist', href: '/wishlist', icon: FiHeart },
  { label: 'Login / Register', href: '/auth', icon: FiUser },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()
  const { user } = useAuth()
  const { categories } = useCategoriesData()

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E0B84A] bg-white/95 backdrop-blur">
        <div className="container-shell flex h-18 items-center gap-2 sm:h-18 sm:gap-3">
          <button
            type="button"
            className="inline-flex shrink-0 rounded-full p-2 text-lg lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <FiMenu />
          </button>

          <div className="hidden items-center gap-6 text-sm tracking-[0.16em] text-[#C9A227] lg:flex">
            {categories.map((category) => (
              <NavLink key={category.slug} to={`/category/${category.slug}`}>
                {category.name}
              </NavLink>
            ))}
          </div>

          <Link
            to="/"
            className="flex min-w-0 flex-1 items-center justify-center px-2 lg:flex-none lg:justify-start"
            aria-label="ELANTRAA home"
          >
            <img
              src={logo}
              alt="ELANTRAA"
              className="h-8 w-auto max-w-[200px] object-contain sm:h-12 sm:max-w-[250px] lg:h-12 lg:max-w-[280px]"
            />
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
            <button type="button" className="hidden rounded-full p-2 text-lg sm:inline-flex" aria-label="Search">
              <FiSearch />
            </button>
            <Link to="/wishlist" className="rounded-full p-1.5 text-base sm:p-2 sm:text-lg" aria-label="Wishlist">
              <FiHeart />
            </Link>
            <Link
              to={user ? '/profile' : '/auth'}
              className="rounded-full p-1.5 text-base sm:p-2 sm:text-lg"
              aria-label="Account"
            >
              <FiUser />
            </Link>
            <Link
              to="/cart"
              className="relative rounded-full p-1.5 text-base sm:p-2 sm:text-lg"
              aria-label="Cart"
            >
              <FiShoppingBag />
              {count > 0 && (
                <span className="absolute right-1 top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-[rgba(201,162,39,0.22)]"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
          <aside className="fixed left-0 top-0 z-50 flex h-full w-[82%] max-w-sm fade-in-up flex-col overflow-hidden bg-white">
            <div className="flex border-b border-[#E0B84A]">
              <div className="flex flex-1">
                <button
                  type="button"
                  className="px-6 py-5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#A8841F]"
                >
                  Menu
                </button>
              </div>
              <button
                type="button"
                className="flex w-24 items-center justify-center bg-brand text-[34px] text-white"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[#E0B84A] px-6 py-5 text-[13px] font-normal text-[#A8841F]"
                >
                  {category.name}
                </Link>
              ))}
              {mobileLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-[#E0B84A] px-6 py-5 text-[13px] font-normal text-[#A8841F]"
                >
                  <link.icon className="text-[18px]" />
                  <span>{link.label}</span>
                </Link>
              ))}

              <div className="px-6 py-8">
                <p className="mb-4 text-[14px] font-medium text-[#A8841F]">Need help?</p>
                <div className="space-y-3 text-[13px] text-[#C9A227]">
                  <a href="tel:+919015342951" className="flex items-center gap-3 underline underline-offset-4">
                    <FiPhone className="text-[16px]" />
                    <span>+91 90153 42951</span>
                  </a>
                  <a
                    href="mailto:elantraa.01@gmail.com"
                    className="flex items-center gap-3 underline underline-offset-4"
                  >
                    <FiMail className="text-[16px]" />
                    <span>elantraa.01@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

export default Navbar
