# TECHPLACE — Next-Gen Hardware/electronics Commerce

**TechPlace** is an immersive, high-end eCommerce ecosystem designed with a cinematic, dark-tech aesthetic. Moving beyond traditional retail, TechPlace offers a premium user experience powered by advanced web motion and industrial architectural patterns.

---

## Project Philosophy
The core of TechPlace is **Visual Excellence**. Every interaction is designed to feel fast, responsive, and futuristic.
- **Cinematic Experience**: 100vh hero sections with interactive gradient transitions.
- **Bento Architecture**: Asymmetrical grid systems for featured collections.
- **Micro-Interactions**: Framer Motion powered transitions for every click and scroll.
- **Premium Aesthetics**: A curated palette of `techBlack`, `techElectric`, and `techNeon`.

---

## Technology Stack

### Frontend & UI
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API
- **Auth**: [Clerk](https://clerk.com/)

### Backend & Database
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Payments**: [Stripe](https://stripe.com/) (Checkout & Webhooks)
- **Background Tasks**: [Inngest](https://www.inngest.com/)
- **File Storage**: [Cloudinary](https://cloudinary.com/) (Product Images)

---

## Core Features

### Consumer Experience
- **Cinematic Discovery**: Fullscreen hardware galleries with glassmorphic navigation.
- **Smart Checkout**: Choice between **Stripe Card Payment** or **Cash on Delivery**.
- **Logistics Registry**: A high-fidelity "My Orders" page with real-time status indicators and payment tracking.
- **Secure Handling**: Protected user profiles and address management.

### Seller Control Center
- **Mission Control**: Dashboard for monitoring entire products .
- **Product Deployment**: Advanced multi-image upload system integrated with Cloudinary.
- **Order Management**: Real-time sales tracking with granular shipping and payment status controls.

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone [repository-url]
cd techPlace
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
# Public
NEXT_PUBLIC_CURRENCY=$
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key

# Database
MONGODB_URI=your_mongodb_uri

# Clerk Auth
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe (Payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary (Media)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Inngest (Background Jobs)
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 4. Run Development Server
```bash
npm run dev
```

---

## Deployment

TechPlace is optimized for **Vercel**. When deploying, ensure all environment variables are added to the Vercel project settings. For Stripe Webhooks in production, ensure the endpoint URL is set to `https://your-domain.com/api/stripe`.

---

##  Security Features
- **Role-Based Access**: Specialized middleware for Seller vs Consumer paths.
- **Webhook Verification**: Secure Stripe signature validation.
- **Atomic Operations**: Direct database writes for critical order data.
- **Privacy First**: User identity and sensitive data managed by Clerk.


