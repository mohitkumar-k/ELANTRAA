import { CheckoutForm } from '@/components/checkout-form';
import { SectionHeading } from '@/components/section-heading';

export default function CheckoutPage() {
  return (
    <section className="luxe-container py-10">
      <SectionHeading eyebrow="Secure checkout" title="Complete your order" description="Choose COD or Razorpay and get a smooth premium checkout experience." />
      <div className="mt-10 max-w-4xl">
        <CheckoutForm />
      </div>
    </section>
  );
}
