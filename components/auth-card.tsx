"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type Mode = 'login' | 'signup' | 'forgot';

export function AuthCard({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next') ?? '/account';
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const endpoint =
    mode === 'login'
      ? '/api/auth/login'
      : mode === 'signup'
        ? '/api/auth/register'
        : '/api/auth/forgot-password';

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const payload =
      mode === 'login'
        ? { email: form.email, password: form.password }
        : mode === 'signup'
          ? form
          : { email: form.email };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setLoading(false);
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message ?? 'Request failed');
      return;
    }
    toast.success(mode === 'forgot' ? 'Reset instructions sent' : 'Success');
    router.push(mode === 'login' ? next : '/account');
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
      {mode === 'signup' ? (
        <>
          <input className="luxe-input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="luxe-input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </>
      ) : null}
      <input type="email" className="luxe-input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      {mode !== 'forgot' ? (
        <input
          type="password"
          className="luxe-input"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      ) : null}
      <button className="luxe-btn w-full" disabled={loading}>
        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : mode === 'signup' ? 'Create account' : 'Send reset link'}
      </button>
      <div className="flex justify-between text-sm text-stone-500">
        {mode !== 'login' ? <Link href="/auth/login">Login</Link> : <Link href="/auth/signup">Create account</Link>}
        <Link href="/auth/forgot-password">Forgot password?</Link>
      </div>
    </form>
  );
}
