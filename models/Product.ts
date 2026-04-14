import mongoose, { Schema, type Model } from 'mongoose';

const reviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

export type ProductDocument = {
  slug: string;
  title: string;
  description: string;
  category: 'lehenga-choli' | 'saree' | 'designer-ethnic' | 'sequence-lehenga';
  fabric: string;
  color: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  sizes: string[];
  images: { url: string; alt: string }[];
  isFeatured?: boolean;
  isHotSelling?: boolean;
  tags?: string[];
  stock: number;
  reviews: {
    userId?: mongoose.Types.ObjectId;
    name: string;
    rating: number;
    comment: string;
    createdAt?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

const productSchema = new Schema<ProductDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['lehenga-choli', 'saree', 'designer-ethnic', 'sequence-lehenga'],
      required: true,
      index: true
    },
    fabric: { type: String, required: true },
    color: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    discount: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    sizes: [{ type: String }],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true }
      }
    ],
    isFeatured: { type: Boolean, default: false, index: true },
    isHotSelling: { type: Boolean, default: false, index: true },
    tags: [{ type: String }],
    stock: { type: Number, default: 0 },
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

const ProductModel: Model<ProductDocument> =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
