import mongoose, { Schema, type Model } from 'mongoose';

export type OrderDocument = {
  orderNumber: string;
  userId: mongoose.Types.ObjectId;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    title: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }>;
  address: {
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
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'COD' | 'Razorpay';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  status: 'Pending' | 'Paid' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  couponCode?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
};

const orderSchema = new Schema<OrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        image: { type: String, required: true }
      }
    ],
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address1: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true }
    },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD', 'Razorpay'], required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    couponCode: String,
    razorpayOrderId: String,
    razorpayPaymentId: String
  },
  { timestamps: true }
);

const OrderModel: Model<OrderDocument> =
  mongoose.models.Order || mongoose.model<OrderDocument>('Order', orderSchema);

export default OrderModel;
