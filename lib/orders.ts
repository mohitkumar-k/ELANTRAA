import { connectToDatabase } from './db';
import OrderModel from '@/models/Order';
import type { Order } from './types';

function normalizeOrder(doc: any): Order {
  return {
    _id: doc._id?.toString(),
    orderNumber: doc.orderNumber,
    userId: doc.userId?.toString(),
    items: doc.items.map((item: any) => ({
      productId: item.productId?.toString(),
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: item.image
    })),
    address: doc.address,
    subtotal: doc.subtotal,
    shipping: doc.shipping,
    discount: doc.discount,
    total: doc.total,
    paymentMethod: doc.paymentMethod,
    paymentStatus: doc.paymentStatus,
    status: doc.status,
    couponCode: doc.couponCode,
    createdAt: doc.createdAt?.toISOString()
  };
}

export async function getOrdersByUserId(userId: string) {
  await connectToDatabase();
  const docs = await OrderModel.find({ userId }).sort({ createdAt: -1 }).lean();
  return docs.map(normalizeOrder);
}

export async function getOrderById(id: string) {
  await connectToDatabase();
  const doc = await OrderModel.findById(id).lean();
  return doc ? normalizeOrder(doc) : null;
}

export async function getOrders() {
  await connectToDatabase();
  const docs = await OrderModel.find().sort({ createdAt: -1 }).lean();
  return docs.map(normalizeOrder);
}
