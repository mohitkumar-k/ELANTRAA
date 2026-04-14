import { AuthCard } from '@/components/auth-card';
import { SectionHeading } from '@/components/section-heading';
import { Suspense } from 'react';

export default function SignupPage() {
  return (
    <section className="luxe-container py-12">
      <div className="mx-auto max-w-xl">
        <SectionHeading eyebrow="Create account" title="Join the ELANTRAA circle" />
        <div className="mt-8">
          <Suspense fallback={<div className="rounded-[28px] border border-stone-200 bg-white p-6">Loading...</div>}>
            <AuthCard mode="signup" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
