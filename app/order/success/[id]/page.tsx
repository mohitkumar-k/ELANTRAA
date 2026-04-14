import Link from 'next/link';
import { getOrderById } from '@/lib/orders';
import { formatCurrency } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function OrderSuccessPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <section className="luxe-container flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-2xl rounded-[32px] border border-stone-200 bg-white p-8 text-center shadow-luxe">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Order confirmed</p>
        <h1 className="mt-4 font-serif text-4xl text-brand-maroonDeep">Thank you for shopping with ELANTRAA</h1>
        <p className="mt-4 text-stone-600">Your order number is <strong>{order.orderNumber}</strong>.</p>
        <p className="mt-2 text-stone-600">Total paid: {formatCurrency(order.total)}</p>
        <Link href="/shop" className="luxe-btn mt-8">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
