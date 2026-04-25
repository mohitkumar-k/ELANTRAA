import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowUpRight, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const shopLinks = [
  { label: 'New Arrivals', href: '/' },
  { label: 'My Orders', href: '/orders' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Return & Exchange', href: '/profile' },
]

const supportLinks = [
  { label: 'Call Us', href: 'tel:+919015342951', icon: FiPhone, value: '+91 90153 42951' },
  { label: 'Email', href: 'mailto:elantraa.01@gmail.com', icon: FiMail, value: 'elantraa.01@gmail.com' },
  { label: 'WhatsApp', href: 'https://wa.me/919015342951', icon: FaWhatsapp, value: 'Chat with ELANTRAA' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/_kajal__bhardwaj_', icon: FiInstagram },
]

function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-[#E0B84A] bg-[#fffaf0]">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(201,162,39,0.12),rgba(255,250,240,0))]" />

      <div className="container-shell relative py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-[30px] border border-[#E0B84A] bg-white p-7 shadow-[0_18px_55px_rgba(168,132,31,0.08)] sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C9A227]">ELANTRAA World</p>
            <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="heading-display text-4xl leading-none text-[#A8841F] sm:text-5xl">
                  Occasionwear with a softer, modern finish.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#A8841F] sm:text-base">
                  Discover curated Indian silhouettes for celebrations, intimate events, and elegant everyday dressing.
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 self-start rounded-full bg-brand px-6 py-3 text-sm font-semibold tracking-[0.16em] text-white transition hover:bg-[#A8841F]"
              >
                Explore Collection
                <FiArrowUpRight className="text-base" />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-[#F0D98E] bg-[#fffaf0] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A227]">Shipping</p>
                <p className="mt-2 text-lg font-semibold text-[#A8841F]">Pan India Delivery</p>
                <p className="mt-1 text-sm leading-6 text-[#A8841F]">Fast dispatch with secure packaging for festive orders.</p>
              </div>
              <div className="rounded-[24px] border border-[#F0D98E] bg-[#fffaf0] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A227]">Support</p>
                <p className="mt-2 text-lg font-semibold text-[#A8841F]">Styling Assistance</p>
                <p className="mt-1 text-sm leading-6 text-[#A8841F]">Reach out for sizing help, order updates, and easy guidance.</p>
              </div>
              <div className="rounded-[24px] border border-[#F0D98E] bg-[#fffaf0] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A227]">Promise</p>
                <p className="mt-2 text-lg font-semibold text-[#A8841F]">Premium Finish</p>
                <p className="mt-1 text-sm leading-6 text-[#A8841F]">Thoughtful detailing and elevated craftsmanship in every piece.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[30px] border border-[#E0B84A] bg-[#A8841F] p-7 text-white shadow-[0_18px_55px_rgba(168,132,31,0.16)] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#F7E2A2]">Quick Access</p>
              <div className="mt-5 space-y-3">
                {shopLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-4 py-3 text-sm font-medium tracking-[0.04em] transition hover:bg-[rgba(255,255,255,0.12)]"
                  >
                    <span>{link.label}</span>
                    <FiArrowUpRight className="text-base" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#E0B84A] bg-white p-7 shadow-[0_18px_55px_rgba(168,132,31,0.08)] sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C9A227]">Contact Studio</p>
              <div className="mt-5 space-y-4">
                {supportLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-start gap-3 rounded-2xl bg-[#fffaf0] px-4 py-3 transition hover:bg-[#fff4d6]"
                  >
                    <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#A8841F] shadow-[0_8px_18px_rgba(168,132,31,0.08)]">
                      <item.icon />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A227]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[#A8841F]">{item.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-[26px] border border-[#E0B84A] bg-white px-6 py-5 text-sm text-[#A8841F] shadow-[0_16px_40px_rgba(168,132,31,0.06)] sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff4d6] text-[#A8841F]">
              <FiMapPin className="text-lg" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A227]">Based In India</p>
              <p className="mt-1 leading-6">Crafted for wedding wardrobes, festive edits, and timeless statement dressing.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E0B84A] bg-[#fffaf0] text-lg text-[#A8841F] transition hover:-translate-y-0.5 hover:bg-[#A8841F] hover:text-white"
              >
                <item.icon />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#E8C96B] pt-5 text-xs tracking-[0.18em] text-[#C9A227] sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 ELANTRAA. Designed for elevated Indian dressing.</p>
          <p>Free shipping & COD available across India.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
