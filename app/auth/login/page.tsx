import { AuthCard } from '@/components/auth-card';
import { SectionHeading } from '@/components/section-heading';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <section className="luxe-container py-12">
      <div className="mx-auto max-w-xl">
        <SectionHeading eyebrow="Welcome back" title="Login to your ELANTRAA account" />
        <div className="mt-8">
          <Suspense fallback={<div className="rounded-[28px] border border-stone-200 bg-white p-6">Loading...</div>}>
            <AuthCard mode="login" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
