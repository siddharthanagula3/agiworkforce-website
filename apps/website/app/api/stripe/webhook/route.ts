import { NextRequest, NextResponse } from 'next/server'
import { stripe, getPlanFromPriceId } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

/**
 * Stripe Webhook Handler
 *
 * Handles subscription lifecycle events from Stripe:
 * - customer.subscription.created
 * - customer.subscription.updated
 * - customer.subscription.deleted
 * - checkout.session.completed
 *
 * IMPORTANT: Configure webhook in Stripe Dashboard:
 * 1. Go to Developers → Webhooks
 * 2. Add endpoint: https://yourdomain.com/api/stripe/webhook
 * 3. Select events: checkout.session.completed, customer.subscription.*
 * 4. Copy webhook secret to STRIPE_WEBHOOK_SECRET env var
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string
          const customerId = session.customer as string
          const clientReferenceId = session.client_reference_id // user ID

          if (!clientReferenceId) {
            console.error('No client_reference_id in checkout session')
            break
          }

          // Get subscription details to determine plan
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const priceId = subscription.items.data[0]?.price.id
          const plan = priceId ? getPlanFromPriceId(priceId) : 'free'

          // Update user in database
          await supabaseAdmin
            .from('users')
            .update({
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              plan: plan,
              plan_status: 'active',
              updated_at: new Date().toISOString(),
            })
            .eq('id', clientReferenceId)

          console.log('✅ Subscription created:', { userId: clientReferenceId, plan })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const priceId = subscription.items.data[0]?.price.id
        const plan = priceId ? getPlanFromPriceId(priceId) : 'free'

        // Determine plan status
        let planStatus: 'active' | 'trial' | 'cancelled' | 'past_due' = 'active'
        if (subscription.status === 'trialing') planStatus = 'trial'
        else if (subscription.cancel_at_period_end) planStatus = 'cancelled'
        else if (subscription.status === 'past_due') planStatus = 'past_due'

        // Update user plan
        await supabaseAdmin
          .from('users')
          .update({
            plan: plan,
            plan_status: planStatus,
            trial_ends_at: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        console.log('✅ Subscription updated:', { customerId, plan, status: planStatus })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Downgrade to free plan
        await supabaseAdmin
          .from('users')
          .update({
            plan: 'free',
            plan_status: 'cancelled',
            stripe_subscription_id: null,
            trial_ends_at: null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        console.log('✅ Subscription cancelled:', { customerId })
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
