import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

/**
 * Map Stripe price IDs to plan names
 */
export const STRIPE_PLANS = {
  free: 'free',
  'pay-per-result': process.env.STRIPE_PRICE_PAY_PER_RESULT!,
  pro: process.env.STRIPE_PRICE_PRO!,
} as const

/**
 * Get plan name from Stripe price ID
 */
export function getPlanFromPriceId(priceId: string): 'free' | 'pay-per-result' | 'pro' | 'enterprise' {
  if (priceId === process.env.STRIPE_PRICE_PAY_PER_RESULT) return 'pay-per-result'
  if (priceId === process.env.STRIPE_PRICE_PRO) return 'pro'
  return 'free'
}

/**
 * Get Stripe price ID from plan name
 */
export function getPriceIdFromPlan(plan: string): string | null {
  switch (plan) {
    case 'pay-per-result':
      return process.env.STRIPE_PRICE_PAY_PER_RESULT!
    case 'pro':
      return process.env.STRIPE_PRICE_PRO!
    default:
      return null
  }
}
