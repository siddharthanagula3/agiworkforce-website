import { NextRequest, NextResponse } from 'next/server'
import { stripe, getPriceIdFromPlan } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

/**
 * Create Stripe Checkout Session
 *
 * POST /api/stripe/checkout
 *
 * Request Body:
 * {
 *   "plan": "pay-per-result" | "pro"
 * }
 *
 * Creates a Stripe Checkout session for the user to subscribe to a plan.
 * Redirects to Stripe Checkout page.
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { plan } = body

    if (!plan || (plan !== 'pay-per-result' && plan !== 'pro')) {
      return NextResponse.json(
        { error: 'Invalid plan', message: 'Plan must be pay-per-result or pro' },
        { status: 400 }
      )
    }

    // Get user profile from database
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    if (profileError || !userProfile) {
      return NextResponse.json(
        { error: 'User not found', message: 'Could not find user profile' },
        { status: 404 }
      )
    }

    const priceId = getPriceIdFromPlan(plan)
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan', message: 'Plan price not configured' },
        { status: 400 }
      )
    }

    // Create or retrieve Stripe customer
    let customerId = userProfile.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userProfile.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Update user with customer ID
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      client_reference_id: user.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?cancelled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_update: {
        address: 'auto',
      },
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
