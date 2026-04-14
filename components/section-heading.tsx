import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: Props) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-maroonDeep sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base">{description}</p> : null}
    </div>
  );
}
