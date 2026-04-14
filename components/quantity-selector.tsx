"use client";

export function QuantitySelector({
  value,
  onChange
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-stone-200 bg-white">
      <button className="px-4 py-3 text-lg text-brand-maroon" onClick={() => onChange(Math.max(1, value - 1))}>
        -
      </button>
      <span className="min-w-10 text-center text-sm font-semibold text-brand-maroonDeep">{value}</span>
      <button className="px-4 py-3 text-lg text-brand-maroon" onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
