import { AuthCard } from '@/components/auth-card';
import { SectionHeading } from '@/components/section-heading';
import { Suspense } from 'react';

export default function ForgotPasswordPage() {
  return (
    <section className="luxe-container py-12">
      <div className="mx-auto max-w-xl">
        <SectionHeading eyebrow="Reset access" title="Forgot your password?" />
        <div className="mt-8">
          <Suspense fallback={<div className="rounded-[28px] border border-stone-200 bg-white p-6">Loading...</div>}>
            <AuthCard mode="forgot" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
