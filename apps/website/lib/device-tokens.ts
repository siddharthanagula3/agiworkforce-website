import { createHash, randomBytes } from 'crypto'

/**
 * Generate a cryptographically secure device token
 */
export function generateDeviceToken(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Generate a secure 6-character device link code
 * Excludes ambiguous characters (0, O, I, 1, L)
 */
export function generateDeviceLinkCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  const bytes = randomBytes(6)

  for (let i = 0; i < 6; i++) {
    code += chars[bytes[i] % chars.length]
  }

  return code
}

/**
 * Hash a device token for secure storage
 */
export function hashDeviceToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

/**
 * Verify a device token against a hash
 */
export function verifyDeviceToken(token: string, hash: string): boolean {
  return hashDeviceToken(token) === hash
}
