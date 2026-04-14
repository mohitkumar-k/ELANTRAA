"use client";

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { Product } from '@/lib/types';

type FormState = {
  slug?: string;
  title: string;
  description: string;
  category: 'lehenga-choli' | 'saree' | 'designer-ethnic' | 'sequence-lehenga';
  fabric: string;
  color: string;
  price: string;
  mrp: string;
  discount: string;
  sizes: string;
  imageUrl: string;
  stock: string;
  featured: boolean;
  hotSelling: boolean;
};

const emptyForm: FormState = {
  title: '',
  description: '',
  category: 'lehenga-choli',
  fabric: '',
  color: '',
  price: '',
  mrp: '',
  discount: '',
  sizes: 'S,M,L',
  imageUrl: '',
  stock: '0',
  featured: false,
  hotSelling: false
};

export function AdminManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const editing = useMemo(() => products.find((product) => product.slug === form.slug), [form.slug, products]);

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const clear = () => setForm(emptyForm);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const body = {
      slug: form.slug,
      title: form.title,
      description: form.description,
      category: form.category,
      fabric: form.fabric,
      color: form.color,
      price: Number(form.price),
      mrp: Number(form.mrp),
      discount: Number(form.discount),
      rating: 4.8,
      reviewsCount: 0,
      sizes: form.sizes.split(',').map((size) => size.trim()).filter(Boolean),
      images: [{ url: form.imageUrl, alt: form.title }],
      isFeatured: form.featured,
      isHotSelling: form.hotSelling,
      tags: [],
      stock: Number(form.stock)
    };

    const response = await fetch(form.slug ? `/api/products/${form.slug}` : '/api/products', {
      method: form.slug ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const payload = await response.json();
    setSaving(false);
    if (!response.ok) {
      toast.error(payload.message ?? 'Unable to save product');
      return;
    }
    toast.success(form.slug ? 'Product updated' : 'Product created');
    clear();
    const refreshed = await fetch('/api/products').then((res) => res.json());
    setProducts(refreshed.data);
  };

  const edit = (product: Product) => {
    setForm({
      slug: product.slug,
      title: product.title,
      description: product.description,
      category: product.category,
      fabric: product.fabric,
      color: product.color,
      price: String(product.price),
      mrp: String(product.mrp),
      discount: String(product.discount),
      sizes: product.sizes.join(', '),
      imageUrl: product.images[0]?.url ?? '',
      stock: String(product.stock),
      featured: Boolean(product.isFeatured),
      hotSelling: Boolean(product.isHotSelling)
    });
  };

  const remove = async (slug: string) => {
    const response = await fetch(`/api/products/${slug}`, { method: 'DELETE' });
    if (!response.ok) {
      toast.error('Unable to delete product');
      return;
    }
    toast.success('Product deleted');
    setProducts((current) => current.filter((product) => product.slug !== slug));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={submit} className="space-y-4 rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
        <h3 className="font-serif text-2xl text-brand-maroonDeep">{form.slug ? 'Edit product' : 'Add product'}</h3>
        {form.slug ? <p className="text-xs text-stone-500">Editing: {editing?.title}</p> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="luxe-input" placeholder="Title" value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
          <input className="luxe-input" placeholder="Image URL" value={form.imageUrl} onChange={(e) => updateField('imageUrl', e.target.value)} required />
        </div>
        <textarea className="luxe-input min-h-28" placeholder="Description" value={form.description} onChange={(e) => updateField('description', e.target.value)} required />
        <div className="grid gap-4 sm:grid-cols-2">
          <select className="luxe-input" value={form.category} onChange={(e) => updateField('category', e.target.value as FormState['category'])}>
            <option value="lehenga-choli">Lehenga Choli</option>
            <option value="sequence-lehenga">Sequence Lehenga</option>
            <option value="saree">Saree</option>
            <option value="designer-ethnic">Designer Ethnic</option>
          </select>
          <input className="luxe-input" placeholder="Fabric" value={form.fabric} onChange={(e) => updateField('fabric', e.target.value)} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <input className="luxe-input" placeholder="Color" value={form.color} onChange={(e) => updateField('color', e.target.value)} required />
          <input className="luxe-input" placeholder="Price" value={form.price} onChange={(e) => updateField('price', e.target.value)} required />
          <input className="luxe-input" placeholder="MRP" value={form.mrp} onChange={(e) => updateField('mrp', e.target.value)} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <input className="luxe-input" placeholder="Discount %" value={form.discount} onChange={(e) => updateField('discount', e.target.value)} required />
          <input className="luxe-input" placeholder="Sizes comma separated" value={form.sizes} onChange={(e) => updateField('sizes', e.target.value)} required />
          <input className="luxe-input" placeholder="Stock" value={form.stock} onChange={(e) => updateField('stock', e.target.value)} required />
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.hotSelling} onChange={(e) => updateField('hotSelling', e.target.checked)} />
            Hot selling
          </label>
        </div>
        <div className="flex gap-3">
          <button className="luxe-btn" disabled={saving}>
            {saving ? 'Saving...' : form.slug ? 'Update product' : 'Create product'}
          </button>
          {form.slug ? (
            <button type="button" onClick={clear} className="luxe-btn-secondary">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-soft">
        <h3 className="font-serif text-2xl text-brand-maroonDeep">Products</h3>
        <div className="mt-6 space-y-4">
          {products.map((product) => (
            <div key={product.slug} className="flex flex-col gap-3 rounded-3xl border border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-brand-maroonDeep">{product.title}</p>
                <p className="text-sm text-stone-500">{product.category} · {product.stock} in stock</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(product)} className="luxe-btn-secondary">
                  Edit
                </button>
                <button onClick={() => remove(product.slug)} className="rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
