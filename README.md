# ELANTRAA

Premium ethnic fashion e-commerce built with Next.js, Tailwind CSS, MongoDB, JWT auth, and Razorpay.

## Stack

- Next.js App Router
- Tailwind CSS
- MongoDB + Mongoose
- JWT-based auth
- Razorpay checkout

## Features

- Luxury landing page with premium Indian ethnic branding
- Product listing with filters
- Product detail page with gallery, size selection, reviews, and add-to-cart
- Cart and checkout with COD and Razorpay
- Signup, login, forgot password, and account dashboard
- Admin panel with product CRUD and dashboard analytics
- Wishlist persistence in browser storage
- WhatsApp chat button

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in your values.

3. Seed the database:

```bash
npm run seed
```

4. Start the dev server:

```bash
npm run dev
```

## Default Admin

- Email: `admin@elantraa.com`
- Password: `Admin@1234`

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Set the environment variables from `.env.example`.
4. Deploy.

### Render or Node server

1. Set the same environment variables on your server.
2. Run `npm install`.
3. Run `npm run build`.
4. Start with `npm run start`.

## Notes

- Product images currently use remote fashion stock images. Replace them with brand assets in production.
- Checkout supports COD and Razorpay. For real payments, configure the Razorpay keys and webhooks if needed.
- Wishlist and cart are persisted in browser storage for fast UX.
