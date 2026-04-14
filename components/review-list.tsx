import { Star } from 'lucide-react';

type Review = {
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
};

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return <p className="text-sm text-stone-500">No reviews yet. Be the first to share your experience.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={`${review.name}-${index}`} className="rounded-3xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-brand-maroonDeep">{review.name}</p>
              {review.createdAt ? <p className="text-xs text-stone-500">{new Date(review.createdAt).toDateString()}</p> : null}
            </div>
            <div className="flex items-center gap-1 text-brand-gold">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-stone-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
