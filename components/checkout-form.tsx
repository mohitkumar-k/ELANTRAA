"use client";

import Script from 'next/script';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCart } from './providers';
import { formatCurrency } from '@/lib/utils';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const initialAddress = {
  fullName: '',
  phone: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India'
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Razorpay'>('COD');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const couponValue = useMemo(() => {
    const discounted = Math.max(0, total - couponDiscount);
    return discounted;
  }, [couponDiscount, total]);

  const update = (field: keyof typeof initialAddress, value: string) => {
    setAddress((current) => ({ ...current, [field]: value }));
  };

  const validateCoupon = async () => {
    if (!couponCode.trim()) return null;
    const response = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: couponCode, orderValue: total })
    });
    const payload = await response.json();
    if (!response.ok) {
      toast.error(payload.message ?? 'Coupon failed');
      return null;
    }
    setCouponDiscount(payload.data.discountAmount);
    toast.success(`Coupon applied: ${formatCurrency(payload.data.discountAmount)}`);
    return payload.data.discountAmount as number;
  };

  const placeCodOrder = async () => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item.product._id ?? item.product.slug,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
          image: item.product.images[0].url
        })),
        address,
        paymentMethod,
        couponCode: couponCode || undefined
      })
    });
    const payload = await response.json();
    if (!response.ok) {
      toast.error(payload.message ?? 'Unable to create order');
      return;
    }
    clearCart();
    router.push(`/order/success/${payload.data._id}`);
  };

  const placeRazorpayOrder = async () => {
    const response = await fetch('/api/payments/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total,
        couponCode: couponCode || undefined
      })
    });
    const payload = await response.json();
    if (!response.ok) {
      toast.error(payload.message ?? 'Unable to initialize payment');
      return;
    }

    const options = {
      key: payload.data.key,
      amount: payload.data.amount,
      currency: 'INR',
      name: 'ELANTRAA',
      description: 'Premium ethnic fashion order',
      order_id: payload.data.orderId,
      handler: async (responseData: any) => {
        const finalize = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.product._id ?? item.product.slug,
              title: item.product.title,
              price: item.product.price,
              quantity: item.quantity,
              size: item.size,
              image: item.product.images[0].url
            })),
            address,
            paymentMethod,
            couponCode: couponCode || undefined,
            razorpayOrderId: responseData.razorpay_order_id,
            razorpayPaymentId: responseData.razorpay_payment_id,
            razorpaySignature: responseData.razorpay_signature
          })
        });
        const finalizePayload = await finalize.json();
        if (!finalize.ok) {
          toast.error(finalizePayload.message ?? 'Payment verification failed');
          return;
        }
        clearCart();
        router.push(`/order/success/${finalizePayload.data._id}`);
      },
      prefill: {
        name: address.fullName,
        email: address.email,
        contact: address.phone
      },
      theme: { color: '#651f2d' }
    };

    const payment = new window.Razorpay(options);
    payment.open();
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!items.length) {
      toast.error('Your cart is empty');
      return;
    }
    setLoading(true);
    try {
      if (couponCode && !couponDiscount) {
        const validated = await validateCoupon();
        if (validated === null) return;
      }
      if (paymentMethod === 'COD') {
        await placeCodOrder();
      } else {
        await placeRazorpayOrder();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <form onSubmit={submit} className="space-y-8 rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(initialAddress).map(([field]) => (
            <input
              key={field}
              className="luxe-input"
              placeholder={field}
              value={address[field as keyof typeof initialAddress]}
              onChange={(e) => update(field as keyof typeof initialAddress, e.target.value)}
              required={field !== 'address2'}
            />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 px-4 py-3">
            <input type="radio" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
            <span>Cash on Delivery</span>
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 px-4 py-3">
            <input type="radio" checked={paymentMethod === 'Razorpay'} onChange={() => setPaymentMethod('Razorpay')} />
            <span>Razorpay</span>
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input className="luxe-input flex-1" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
          <button type="button" onClick={validateCoupon} className="luxe-btn-secondary">
            Apply coupon
          </button>
        </div>

        <div className="rounded-[28px] bg-brand-cream p-5 text-sm text-brand-maroonDeep">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Coupon discount</span>
            <span>- {formatCurrency(couponDiscount)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-brand-maroon/10 pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(couponValue)}</span>
          </div>
        </div>

        <button className="luxe-btn w-full" disabled={loading}>
          {loading ? 'Processing...' : paymentMethod === 'COD' ? 'Place COD Order' : 'Pay with Razorpay'}
        </button>
      </form>
    </>
  );
}
