import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

/**
 * Create Stripe Customer Portal Session
 *
 * POST /api/stripe/portal
 *
 * Creates a Stripe Customer Portal session for the user to manage their subscription.
 * Redirects to Stripe Customer Portal.
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

    // Get user profile from database
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (profileError || !userProfile || !userProfile.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No subscription', message: 'You do not have an active subscription' },
        { status: 400 }
      )
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: userProfile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error) {
    console.error('Portal error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
