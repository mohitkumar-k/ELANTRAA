"use client";

import { useState } from 'react';
import { toast } from 'sonner';

export function ReviewForm({ slug, onSubmitted }: { slug: string; onSubmitted?: () => void }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    const response = await fetch(`/api/products/${slug}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, rating, comment })
    });
    setPending(false);
    const payload = await response.json();
    if (!response.ok) {
      toast.error(payload.message ?? 'Unable to submit review');
      return;
    }
    toast.success('Review submitted');
    setName('');
    setComment('');
    setRating(5);
    onSubmitted?.();
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-[28px] border border-stone-200 bg-white p-5">
      <h3 className="font-serif text-2xl text-brand-maroonDeep">Write a review</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="luxe-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
        <select className="luxe-input" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} star{value > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="luxe-input min-h-32"
        placeholder="Share your experience"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button className="luxe-btn" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
