const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const products = require('./seed-data');

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const productSchema = new mongoose.Schema(
    {
      slug: String,
      title: String,
      description: String,
      category: String,
      fabric: String,
      color: String,
      price: Number,
      mrp: Number,
      discount: Number,
      rating: Number,
      reviewsCount: Number,
      sizes: [String],
      images: [{ url: String, alt: String }],
      isFeatured: Boolean,
      isHotSelling: Boolean,
      tags: [String],
      stock: Number,
      reviews: []
    },
    { timestamps: true }
  );

  const userSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
      role: String,
      wishlist: [String]
    },
    { timestamps: true }
  );

  const couponSchema = new mongoose.Schema(
    {
      code: String,
      discountType: String,
      value: Number,
      minOrderValue: Number,
      active: Boolean,
      expiresAt: Date,
      usageLimit: Number,
      usedCount: Number
    },
    { timestamps: true }
  );

  const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
  const User = mongoose.models.User || mongoose.model('User', userSchema);
  const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);

  await Product.deleteMany({});
  await User.deleteMany({});
  await Coupon.deleteMany({});

  await Product.insertMany(products);
  await User.create({
    name: 'ELANTRAA Admin',
    email: 'admin@elantraa.com',
    password: await bcrypt.hash('Admin@1234', 10),
    role: 'admin',
    wishlist: []
  });
  await Coupon.create({
    code: 'ELAN10',
    discountType: 'percent',
    value: 10,
    minOrderValue: 4999,
    active: true,
    usageLimit: 500,
    usedCount: 0
  });

  console.log('Seed completed');
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
