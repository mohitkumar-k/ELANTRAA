import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth';
import { getProducts } from '@/lib/products';
import { getOrders } from '@/lib/orders';
import { connectToDatabase } from '@/lib/db';
import UserModel from '@/models/User';
import CouponModel from '@/models/Coupon';
import { AdminManager } from '@/components/admin-manager';
import { SectionHeading } from '@/components/section-heading';

export default async function AdminPage() {
  const user = await getAuthUser();
  if (!user) redirect('/auth/login?next=/admin');
  if (user.role !== 'admin') redirect('/account');

  const [products, orders, userCount, couponCount] = await Promise.all([
    getProducts(),
    getOrders(),
    (async () => {
      await connectToDatabase();
      return UserModel.countDocuments();
    })(),
    (async () => {
      await connectToDatabase();
      return CouponModel.countDocuments();
    })()
  ]);
  const recentUsers = await UserModel.find().sort({ createdAt: -1 }).limit(5).lean();

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <section className="luxe-container py-10">
      <SectionHeading eyebrow="Admin console" title="Store analytics and product management" />

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { label: 'Products', value: products.length },
          { label: 'Orders', value: orders.length },
          { label: 'Users', value: userCount },
          { label: 'Coupons', value: couponCount }
        ].map((item) => (
          <div key={item.label} className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-soft">
            <p className="text-sm text-stone-500">{item.label}</p>
            <p className="mt-2 font-serif text-3xl text-brand-maroonDeep">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[28px] border border-stone-200 bg-white p-5 shadow-soft">
        <p className="text-sm text-stone-500">Total revenue</p>
        <p className="mt-2 font-serif text-3xl text-brand-maroonDeep">₹{revenue.toLocaleString('en-IN')}</p>
      </div>

      <div className="mt-10">
        <AdminManager initialProducts={products} />
      </div>

      <div className="mt-10 rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
        <h3 className="font-serif text-2xl text-brand-maroonDeep">Recent orders</h3>
        <div className="mt-5 space-y-4">
          {orders.slice(0, 5).map((order) => (
            <div key={order.orderNumber} className="flex flex-col gap-2 rounded-3xl border border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-brand-maroonDeep">{order.orderNumber}</p>
                <p className="text-sm text-stone-500">{order.paymentMethod} · {order.status}</p>
              </div>
              <p className="font-semibold text-brand-maroon">{order.total}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
        <h3 className="font-serif text-2xl text-brand-maroonDeep">Users</h3>
        <div className="mt-5 space-y-4">
          {recentUsers.map((user) => (
            <div key={user._id.toString()} className="flex flex-col gap-2 rounded-3xl border border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-brand-maroonDeep">{user.name}</p>
                <p className="text-sm text-stone-500">{user.email}</p>
              </div>
              <p className="text-sm text-stone-500">{user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
