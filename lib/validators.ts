import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(10).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(['lehenga-choli', 'saree', 'designer-ethnic', 'sequence-lehenga']),
  fabric: z.string().min(2),
  color: z.string().min(2),
  price: z.coerce.number().positive(),
  mrp: z.coerce.number().positive(),
  discount: z.coerce.number().min(0).max(100),
  rating: z.coerce.number().min(0).max(5).default(4.5),
  reviewsCount: z.coerce.number().min(0).default(0),
  sizes: z.array(z.string().min(1)).min(1),
  images: z.array(z.object({ url: z.string().url(), alt: z.string().min(1) })).min(1),
  isFeatured: z.boolean().optional(),
  isHotSelling: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  stock: z.coerce.number().min(0)
});

export const addressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address1: z.string().min(5),
  address2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(4),
  country: z.string().min(2)
});

export const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      title: z.string(),
      price: z.coerce.number(),
      quantity: z.coerce.number().min(1),
      size: z.string(),
      image: z.string().url()
    })
  ).min(1),
  address: addressSchema,
  paymentMethod: z.enum(['COD', 'Razorpay']),
  couponCode: z.string().optional()
});

export const couponSchema = z.object({
  code: z.string().min(2)
});
