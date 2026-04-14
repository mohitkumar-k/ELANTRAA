export type ProductImage = {
  url: string;
  alt: string;
};

export type Product = {
  _id?: string;
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
  images: ProductImage[];
  isFeatured?: boolean;
  isHotSelling?: boolean;
  tags?: string[];
  stock: number;
  reviews?: Array<{
    name: string;
    rating: number;
    comment: string;
    createdAt?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

export type WishlistItem = Product;

export type Address = {
  fullName: string;
  phone: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export type OrderStatus = 'Pending' | 'Paid' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';

export type Order = {
  _id?: string;
  orderNumber: string;
  userId: string;
  items: Array<{
    productId: string;
    title: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }>;
  address: Address;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'COD' | 'Razorpay';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  status: OrderStatus;
  couponCode?: string;
  createdAt?: string;
};

export type User = {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  wishlist: string[];
  createdAt?: string;
};
