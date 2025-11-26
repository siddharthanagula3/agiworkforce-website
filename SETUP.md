# AGI Workforce Website - Setup Guide

This guide will help you set up the AGI Workforce website with Supabase authentication, database, and Stripe billing.

## Prerequisites

- Node.js 20.11.0 or later
- A Supabase account (free tier works)
- A Stripe account (test mode for development)

## Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
cd apps/website
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to provision (~2 minutes)
3. Go to **Project Settings** → **API**
4. Copy the following values:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key (click "Reveal" to see it)

### 3. Run Database Migration

1. In your Supabase project, go to **SQL Editor**
2. Click **New query**
3. Copy the entire contents of `apps/website/supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor and click **Run**
5. You should see "Success. No rows returned"

This creates:
- `users` table (extends Supabase auth.users)
- `devices` table (linked devices for desktop app)
- `device_links` table (device linking flow)
- RLS policies for security
- Automatic triggers

### 4. Configure Supabase Auth Providers

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (enabled by default)
3. _(Optional)_ Enable **Google** provider:
   - Toggle Google ON
   - Add your Google OAuth credentials
   - Add authorized redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### 5. Set Up Stripe

1. Go to [stripe.com](https://dashboard.stripe.com) and create an account
2. Make sure you're in **Test mode** (toggle in top right)
3. Go to **Developers** → **API keys**
4. Copy your **Publishable key** and **Secret key**

#### Create Products and Prices

1. Go to **Products** → **Add product**
2. Create products for each plan:

**Pay-Per-Result Plan:**
- Name: `AGI Workforce - Pay Per Result`
- Price: `$0.50` per use (you can use recurring $25/month for simplicity)
- Billing: Recurring / Monthly
- Copy the **Price ID** (starts with `price_...`)

**Pro Plan:**
- Name: `AGI Workforce - Pro Unlimited`
- Price: `$39.00` per month
- Billing: Recurring / Monthly
- Copy the **Price ID** (starts with `price_...`)

#### Set Up Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://your-domain.com/api/stripe/webhook` (use ngrok for local testing)
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)

### 6. Environment Variables

Create a `.env.local` file in `apps/website/`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PAY_PER_RESULT=price_... (from Pay-Per-Result product)
STRIPE_PRICE_PRO=price_... (from Pro product)

# Desktop App Downloads
AGI_WORKFORCE_WIN_DOWNLOAD_URL=https://github.com/yourusername/agiworkforce-desktop-app/releases/download/v1.3.0/AGIWorkforceSetup.exe
```

### 7. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 8. Test the Setup

#### Test Authentication

1. Go to http://localhost:3000/signup
2. Create an account with your email
3. Check your email for confirmation link (check spam folder)
4. Click the confirmation link
5. Sign in at http://localhost:3000/login
6. You should be redirected to http://localhost:3000/account

#### Test Subscription Flow

1. Make sure you're signed in
2. Go to http://localhost:3000/pricing
3. Click "Go Pro" (or any paid plan)
4. You'll be redirected to Stripe Checkout (test mode)
5. Use test card: `4242 4242 4242 4242`, any future expiry, any CVC
6. Complete checkout
7. You should be redirected back to `/account?success=true`
8. Refresh the page - your plan should now show "Pro"

#### Test Desktop App Integration

The desktop app will use these endpoints (already implemented):

- `POST /api/device/link-init` - Start device linking (no auth required)
- `POST /api/device/link-complete` - User approves device (requires web login)
- `GET /api/device/status/:id` - Desktop polls for approval
- `GET /api/me` - Get user profile and plan (requires auth token)

---

## Architecture Overview

```
┌─────────────────┐
│   Next.js App   │
│  (Website)      │
└────────┬────────┘
         │
         ├─ Supabase Auth (Email + OAuth)
         ├─ Supabase Database (PostgreSQL)
         ├─ Stripe (Subscriptions)
         └─ Desktop App Integration
```

### Database Schema

- **users**: User profiles (extends Supabase auth.users)
  - plan (free/pay-per-result/pro/enterprise)
  - plan_status (active/trial/cancelled/past_due)
  - stripe_customer_id, stripe_subscription_id

- **devices**: Linked devices
  - user_id, name, platform, token_hash
  - linked_at, last_seen_at

- **device_links**: Device linking flow
  - code (6-char code), device_name, platform
  - status (pending/approved/expired)
  - expires_at (10 minutes)

### Key Features

✅ **Authentication**
- Email/password signup and login
- Google OAuth (optional)
- Protected routes via middleware
- Automatic user profile creation

✅ **Billing**
- Stripe Checkout for subscriptions
- Webhook handlers for subscription events
- Customer portal for self-service

✅ **Desktop App Integration**
- Device linking flow (6-digit code)
- Secure token generation and storage
- Feature flags based on plan

✅ **Windows Download Flow**
- Configurable installer URL
- No code changes needed for updates

---

## Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables from `.env.local`
4. Deploy!

**Important for production:**

1. Update `NEXT_PUBLIC_SITE_URL` to your production domain
2. Update Supabase redirect URLs:
   - Go to **Authentication** → **URL Configuration**
   - Add your production domain to **Redirect URLs**
3. Update Stripe webhook URL to production domain
4. Set `AGI_WORKFORCE_WIN_DOWNLOAD_URL` to your installer hosting URL

### Other Platforms

The app works on any platform that supports Next.js 15:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

---

## Troubleshooting

### "Invalid JWT" or Auth Errors

- Make sure all Supabase environment variables are correct
- Check that you're using the `anon` key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check that you're using the `service_role` key for `SUPABASE_SERVICE_ROLE_KEY`

### Stripe Webhook Not Working

- For local development, use [Stripe CLI](https://stripe.com/docs/stripe-cli):
  ```bash
  stripe listen --forward-to localhost:3000/api/stripe/webhook
  ```
- Update `STRIPE_WEBHOOK_SECRET` with the webhook signing secret

### Database Schema Errors

- Make sure you ran the migration SQL in Supabase SQL Editor
- Check for typos in table names (they're case-sensitive)
- RLS is enabled - make sure you're authenticated

### "Module not found" Errors

- Run `npm install` again in `apps/website/`
- Delete `node_modules` and `package-lock.json`, then `npm install`

---

## Next Steps

1. **Customize the UI** - Update colors, logos, copy in marketing pages
2. **Add more OAuth providers** - GitHub, Microsoft, etc.
3. **Set up analytics** - Add Google Analytics or Plausible
4. **Configure email templates** - Customize Supabase email templates
5. **Add rate limiting** - Use Upstash Rate Limit for API protection
6. **Set up monitoring** - Sentry for error tracking
7. **Create admin dashboard** - Manage users and subscriptions

---

## Documentation

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Desktop Integration API](./apps/website/docs/DESKTOP_INTEGRATION_API.md)
- [Download Flow](./apps/website/docs/DOWNLOAD_FLOW.md)

---

## Support

- Issues: [GitHub Issues](https://github.com/yourusername/agiworkforce-website/issues)
- Email: support@agiworkforce.com
