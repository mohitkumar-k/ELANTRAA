import Link from 'next/link';
import Image from 'next/image';
import { getAuthUser } from '@/lib/auth';
import { getOrdersByUserId } from '@/lib/orders';
import { connectToDatabase } from '@/lib/db';
import UserModel from '@/models/User';
import ProductModel from '@/models/Product';
import { formatCurrency } from '@/lib/utils';

export default async function AccountPage() {
  const user = await getAuthUser();
  if (!user) {
    return (
      <section className="luxe-container py-12">
        <div className="mx-auto max-w-2xl rounded-[32px] border border-stone-200 bg-white p-8 text-center shadow-soft">
          <h1 className="font-serif text-4xl text-brand-maroonDeep">Sign in to view your dashboard</h1>
          <p className="mt-4 text-stone-600">Access your orders, wishlist, and profile details from one place.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/auth/login?next=/account" className="luxe-btn">
              Login
            </Link>
            <Link href="/auth/signup" className="luxe-btn-secondary">
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  await connectToDatabase();
  const freshUser = await UserModel.findById(user._id).lean();
  const orders = await getOrdersByUserId(user._id.toString());
  const wishlistProducts = await ProductModel.find({ _id: { $in: freshUser?.wishlist ?? [] } }).lean();

  return (
    <section className="luxe-container py-10">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
          <h1 className="font-serif text-4xl text-brand-maroonDeep">My account</h1>
          <div className="mt-6 space-y-3 text-sm text-stone-600">
            <p><strong>Name:</strong> {freshUser?.name}</p>
            <p><strong>Email:</strong> {freshUser?.email}</p>
            <p><strong>Role:</strong> {freshUser?.role}</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-brand-cream p-4">
              <p className="text-2xl font-semibold text-brand-maroonDeep">{orders.length}</p>
              <p className="text-xs text-stone-500">Orders</p>
            </div>
            <div className="rounded-2xl bg-brand-cream p-4">
              <p className="text-2xl font-semibold text-brand-maroonDeep">{wishlistProducts.length}</p>
              <p className="text-xs text-stone-500">Wishlist</p>
            </div>
            <div className="rounded-2xl bg-brand-cream p-4">
              <p className="text-2xl font-semibold text-brand-maroonDeep">{freshUser?.wishlist?.length ?? 0}</p>
              <p className="text-xs text-stone-500">Saved</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/wishlist" className="luxe-btn-secondary">
              View wishlist
            </Link>
            <Link href="/shop" className="luxe-btn">
              Continue shopping
            </Link>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-2xl text-brand-maroonDeep">Orders</h2>
            <div className="mt-5 space-y-4">
              {orders.length ? (
                orders.map((order) => (
                  <div key={order.orderNumber} className="rounded-3xl border border-stone-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-brand-maroonDeep">{order.orderNumber}</p>
                        <p className="text-sm text-stone-500">{new Date(order.createdAt ?? '').toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-brand-maroon">{formatCurrency(order.total)}</p>
                        <p className="text-sm text-stone-500">{order.status}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-stone-500">No orders yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-2xl text-brand-maroonDeep">Wishlist</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {wishlistProducts.map((product) => (
                <Link key={product.slug} href={`/product/${product.slug}`} className="overflow-hidden rounded-3xl border border-stone-200">
                  <div className="relative aspect-[4/5]">
                    <Image src={product.images[0].url} alt={product.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-brand-maroonDeep">{product.title}</p>
                    <p className="text-sm text-brand-maroon">{formatCurrency(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
