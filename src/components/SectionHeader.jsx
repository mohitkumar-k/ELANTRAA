function SectionHeader({ eyebrow, title, description, action, variant }) {
  if (variant === 'lined') {
    return (
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="h-px flex-1 bg-[#E0B84A]" aria-hidden="true" />
          <h2 className="text-center text-xl font-semibold uppercase tracking-[0.08em] text-[#A8841F] sm:text-3xl">
            {title}
          </h2>
          <span className="h-px flex-1 bg-[#E0B84A]" aria-hidden="true" />
        </div>
        {description && <p className="mt-3 text-center text-sm leading-7 text-[#C9A227]">{description}</p>}
      </div>
    )
  }

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand">{eyebrow}</p>
        )}
        <h2 className="heading-display text-4xl text-[#A8841F] sm:text-5xl">{title}</h2>
        {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-[#C9A227]">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export default SectionHeader
