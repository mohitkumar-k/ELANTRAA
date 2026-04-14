import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="luxe-container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">404</p>
      <h1 className="mt-4 font-serif text-5xl text-brand-maroonDeep">Page not found</h1>
      <p className="mt-4 max-w-xl text-stone-600">The page you are looking for has moved or does not exist.</p>
      <Link href="/" className="luxe-btn mt-8">
        Back home
      </Link>
    </div>
  );
}
