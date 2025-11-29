# AGI Workforce Desktop Integration API

This document describes the API endpoints that the AGI Workforce desktop application uses to communicate with the website backend for authentication, user profile, plan information, and device linking.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [GET /api/me](#get-apime)
  - [POST /api/device/link-init](#post-apidevicelink-init)
  - [POST /api/device/link-complete](#post-apidevicelink-complete)
  - [GET /api/device/status/:deviceLinkId](#get-apidevicestatusdevicelinkid)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Integration Checklist](#integration-checklist)

---

## Overview

The desktop app integration consists of two main flows:

1. **Device Linking Flow**: Allows users to link their desktop app to their web account
2. **User Profile & Plan Sync**: Allows the desktop app to fetch user data and feature entitlements

### Architecture

```
Desktop App <--> Website API <--> Database
                      |
                      +--> Auth System (NextAuth/Supabase/Clerk/etc.)
```

---

## Authentication

All API endpoints (except `/api/device/link-init` and `/api/device/status/:id`) require authentication.

### Authentication Methods Supported

The API is designed to work with any of these auth systems:

- **Session Cookies**: Standard web session (NextAuth.js, custom sessions)
- **Bearer Tokens**: JWT tokens in `Authorization: Bearer <token>` header
- **Supabase**: Supabase auth session tokens
- **Clerk**: Clerk session tokens

### Desktop App Authentication Flow

The desktop app should:

1. Call `/api/device/link-init` to get a short code
2. Display the code to the user
3. User enters code at `https://agiworkforce.com/link-device` (while logged in)
4. Desktop app polls `/api/device/status/:id` until approved
5. Desktop app receives access token
6. Desktop app stores token and uses it for subsequent API calls

---

## API Endpoints

### GET /api/me

Returns the current authenticated user's profile and subscription plan.

**Authentication**: Required (session cookie or Bearer token)

**Request**:
```http
GET /api/me HTTP/1.1
Host: agiworkforce.com
Authorization: Bearer <device_access_token>
```

**Response (200 OK)**:
```json
{
  "id": "user_123abc",
  "email": "user@example.com",
  "displayName": "John Doe",
  "plan": "free",
  "planStatus": "active",
  "trialEndsAt": null,
  "featureFlags": {
    "automation_hours_limit": 10,
    "cloud_llms_enabled": false,
    "browser_automation_enabled": false,
    "database_integrations_enabled": false,
    "api_integrations_enabled": false,
    "workspace_limit": 1,
    "priority_support": false,
    "advanced_analytics": false,
    "custom_ai_training": false,
    "sso_enabled": false,
    "on_premise_deployment": false
  },
  "linkedDevices": [
    {
      "id": "device_xyz",
      "name": "Work Laptop",
      "platform": "windows",
      "linkedAt": "2025-11-15T10:30:00Z",
      "lastSeenAt": "2025-11-26T08:45:00Z"
    }
  ]
}
```

**Response (401 Unauthorized)**:
```json
{
  "error": "Unauthorized",
  "message": "Authentication required. Please sign in first.",
  "code": "AUTH_REQUIRED"
}
```

**Desktop App Usage**:
- Call this endpoint on app startup
- Call periodically (every 1 hour) to sync plan changes
- Call after user upgrades/downgrades plan
- Use `featureFlags` to enable/disable features in the UI

---

### POST /api/device/link-init

Initiates the device linking flow by generating a short code.

**Authentication**: None required

**Request**:
```http
POST /api/device/link-init HTTP/1.1
Host: agiworkforce.com
Content-Type: application/json

{
  "deviceName": "John's Work Laptop",
  "platform": "windows",
  "appVersion": "0.1.0-alpha",
  "deviceFingerprint": "abc123-unique-id"
}
```

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `deviceName` | string | Yes | User-friendly name for this device |
| `platform` | string | Yes | One of: `windows`, `macos`, `linux` |
| `appVersion` | string | No | Desktop app version (e.g., `0.1.0-alpha`) |
| `deviceFingerprint` | string | No | Unique device identifier for security |

**Response (200 OK)**:
```json
{
  "deviceLinkId": "link_abc123xyz",
  "code": "XYZABC",
  "expiresAt": "2025-11-26T15:30:00Z",
  "verificationUrl": "https://agiworkforce.com/link-device?code=XYZABC"
}
```

**Response (400 Bad Request)**:
```json
{
  "error": "Invalid request",
  "message": "deviceName and platform are required",
  "code": "VALIDATION_ERROR"
}
```

**Desktop App Usage**:
1. Call this endpoint when user clicks "Sign In" or "Link Device"
2. Display the `code` prominently to the user
3. Show the `verificationUrl` as a clickable link
4. Start polling `/api/device/status/:deviceLinkId`
5. Stop polling when status is "approved" or "expired"

**Code Format**:
- 6 uppercase alphanumeric characters
- Excludes ambiguous characters (0, O, I, 1)
- Valid for 10 minutes

---

### POST /api/device/link-complete

Called by the web browser when a logged-in user enters the code to authorize the device.

**Authentication**: Required (user must be logged in)

**Request**:
```http
POST /api/device/link-complete HTTP/1.1
Host: agiworkforce.com
Cookie: session=...
Content-Type: application/json

{
  "code": "XYZABC"
}
```

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string | Yes | The 6-character code from the desktop app |

**Response (200 OK)**:
```json
{
  "success": true,
  "deviceLinkId": "link_abc123xyz",
  "deviceName": "John's Work Laptop",
  "platform": "windows"
}
```

**Response (404 Not Found)**:
```json
{
  "error": "Invalid code",
  "message": "The code you entered is invalid or has expired",
  "code": "CODE_NOT_FOUND"
}
```

**Response (401 Unauthorized)**:
```json
{
  "error": "Unauthorized",
  "message": "You must be logged in to link a device",
  "code": "AUTH_REQUIRED"
}
```

**Desktop App Usage**:
- This endpoint is NOT called by the desktop app
- It's called by the web frontend at `/link-device` page
- Desktop app only polls `/api/device/status` to detect approval

---

### GET /api/device/status/:deviceLinkId

Desktop app polls this endpoint to check if the user has approved the device link.

**Authentication**: None required (uses deviceLinkId as credential)

**Request**:
```http
GET /api/device/status/link_abc123xyz HTTP/1.1
Host: agiworkforce.com
```

**Response (200 OK - Pending)**:
```json
{
  "status": "pending",
  "deviceLinkId": "link_abc123xyz",
  "expiresAt": "2025-11-26T15:30:00Z",
  "message": "Waiting for user approval..."
}
```

**Response (200 OK - Approved)**:
```json
{
  "status": "approved",
  "deviceLinkId": "link_abc123xyz",
  "accessToken": "device_token_xyz123abc...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "displayName": "John Doe"
  }
}
```

**Response (410 Gone - Expired)**:
```json
{
  "status": "expired",
  "message": "This device link request has expired"
}
```

**Desktop App Polling Strategy**:
```typescript
// Recommended polling logic
const pollInterval = 2000; // 2 seconds
const maxAttempts = 300;   // 10 minutes total

for (let attempt = 0; attempt < maxAttempts; attempt++) {
  const response = await fetch(`/api/device/status/${deviceLinkId}`);
  const data = await response.json();

  if (data.status === "approved") {
    // Store access token securely
    saveAccessToken(data.accessToken);
    saveUserProfile(data.user);
    break;
  }

  if (data.status === "expired") {
    // Code expired, show error to user
    showError("Code expired. Please try again.");
    break;
  }

  // Still pending, wait and try again
  await sleep(pollInterval);

  // Optional: Exponential backoff after 60 seconds
  if (attempt > 30) {
    pollInterval = Math.min(pollInterval * 1.2, 10000);
  }
}
```

---

## Data Models

### User

```typescript
interface User {
  id: string;                    // Unique user ID
  email: string;                 // User email
  displayName: string;           // Display name
  plan: PlanType;                // Current plan
  planStatus: PlanStatus;        // Plan status
  trialEndsAt: string | null;    // ISO 8601 timestamp
  featureFlags: FeatureFlags;    // Feature entitlements
  linkedDevices: Device[];       // Linked devices
}

type PlanType = "free" | "pay-per-result" | "pro" | "enterprise";
type PlanStatus = "active" | "trial" | "cancelled" | "past_due";
```

### Feature Flags

```typescript
interface FeatureFlags {
  automation_hours_limit: number;        // -1 = unlimited
  cloud_llms_enabled: boolean;          // OpenAI, Anthropic, Google
  browser_automation_enabled: boolean;   // Browser control
  database_integrations_enabled: boolean; // DB connections
  api_integrations_enabled: boolean;     // API calls
  workspace_limit: number;               // -1 = unlimited
  priority_support: boolean;             // Email support SLA
  advanced_analytics: boolean;           // Advanced metrics
  custom_ai_training: boolean;           // Custom AI employee training
  sso_enabled: boolean;                  // SSO/SAML (Enterprise only)
  on_premise_deployment: boolean;        // On-premise (Enterprise only)
}
```

### Device

```typescript
interface Device {
  id: string;           // Unique device ID
  name: string;         // User-defined device name
  platform: string;     // "windows" | "macos" | "linux"
  linkedAt: string;     // ISO 8601 timestamp
  lastSeenAt: string;   // ISO 8601 timestamp
}
```

### Plan Feature Matrix

| Feature | Free | Pay-Per-Result | Pro | Enterprise |
|---------|------|----------------|-----|------------|
| Automation Hours | 10/month | Unlimited | Unlimited | Unlimited |
| Cloud LLMs | ❌ | ✅ | ✅ | ✅ |
| Browser Automation | ❌ | ✅ | ✅ | ✅ |
| Database Integrations | ❌ | ✅ | ✅ | ✅ |
| API Integrations | ❌ | ✅ | ✅ | ✅ |
| Workspaces | 1 | 5 | 5 | Unlimited |
| Support | Community | Priority | Priority | Dedicated |
| Advanced Analytics | ❌ | ✅ | ✅ | ✅ |
| Custom AI Training | ❌ | ❌ | ✅ | ✅ |
| SSO/SAML | ❌ | ❌ | ❌ | ✅ |
| On-Premise | ❌ | ❌ | ❌ | ✅ |

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error Title",
  "message": "Human-readable error description",
  "code": "MACHINE_READABLE_CODE"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTH_REQUIRED` | 401 | Authentication required |
| `INVALID_TOKEN` | 401 | Access token is invalid or expired |
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `CODE_NOT_FOUND` | 404 | Device link code not found |
| `CODE_EXPIRED` | 410 | Device link code has expired |
| `CODE_ALREADY_USED` | 409 | Code has already been used |
| `INTERNAL_ERROR` | 500 | Server error |

### Desktop App Error Handling

```typescript
try {
  const response = await fetch("/api/me", {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const error = await response.json();

    switch (error.code) {
      case "AUTH_REQUIRED":
      case "INVALID_TOKEN":
        // Token expired or invalid, re-authenticate
        await initiateDeviceLinking();
        break;

      case "INTERNAL_ERROR":
        // Retry with exponential backoff
        await retryWithBackoff(() => fetch("/api/me"));
        break;

      default:
        // Show error to user
        showError(error.message);
    }
  }
} catch (error) {
  // Network error, retry or show offline message
  handleNetworkError(error);
}
```

---

## Integration Checklist

### Website Backend (TODO)

- [ ] **Choose and integrate auth system**
  - [ ] NextAuth.js with email/password and OAuth
  - [ ] Or Supabase Auth
  - [ ] Or Clerk
  - [ ] Or custom JWT auth

- [ ] **Set up database**
  - [ ] User table (id, email, name, plan, created_at, etc.)
  - [ ] Device table (id, user_id, name, platform, token, linked_at, last_seen_at)
  - [ ] DeviceLink table (id, code, device_name, status, expires_at, user_id, device_token)

- [ ] **Implement authentication in API endpoints**
  - [ ] Update `/api/me` to check real auth session
  - [ ] Update `/api/device/link-complete` to check real auth session

- [ ] **Implement device linking logic**
  - [ ] Generate secure random codes (crypto.randomBytes)
  - [ ] Store device link requests in database
  - [ ] Set TTL (10 minutes) and clean up expired requests
  - [ ] Generate device access tokens (JWT or opaque tokens)
  - [ ] Store device records in database

- [ ] **Implement plan/subscription logic**
  - [ ] Integrate Stripe/Paddle/Lemon Squeezy for payments
  - [ ] Webhook handlers for subscription changes
  - [ ] Map subscription state to feature flags
  - [ ] Handle trial periods, cancellations, past due

- [ ] **Add rate limiting and security**
  - [ ] Rate limit `/api/device/link-init` (max 5 per hour per IP)
  - [ ] Rate limit `/api/device/status` (max 1 per second per deviceLinkId)
  - [ ] Add CORS headers for desktop app
  - [ ] Log failed authentication attempts
  - [ ] Add device fingerprinting for security

### Desktop App (Separate Repo)

- [ ] **Implement device linking UI**
  - [ ] "Sign In" button that calls `/api/device/link-init`
  - [ ] Display 6-character code prominently
  - [ ] Show verification URL as clickable link
  - [ ] Poll `/api/device/status` until approved

- [ ] **Implement secure token storage**
  - [ ] Store access token in OS keychain (Windows Credential Manager)
  - [ ] Never log or expose tokens
  - [ ] Clear token on logout

- [ ] **Implement API client**
  - [ ] Fetch user profile on app startup
  - [ ] Sync profile periodically (every hour)
  - [ ] Handle 401 errors by re-authenticating
  - [ ] Retry logic with exponential backoff

- [ ] **Implement feature flag checks**
  - [ ] Disable cloud LLMs if `cloud_llms_enabled: false`
  - [ ] Show upgrade prompt when user tries to use locked features
  - [ ] Track automation hours for free tier

- [ ] **Implement analytics**
  - [ ] Report automation runs back to website (for usage tracking)
  - [ ] Update `lastSeenAt` for device (heartbeat)

---

## Testing

### Manual Testing

1. **Device Linking Flow**:
   ```bash
   # 1. Start device linking
   curl -X POST http://localhost:3000/api/device/link-init \
     -H "Content-Type: application/json" \
     -d '{"deviceName":"Test Device","platform":"windows","appVersion":"1.0.0"}'

   # 2. Poll for status (repeat until approved)
   curl http://localhost:3000/api/device/status/link_xyz123

   # 3. In browser, complete linking (while logged in)
   curl -X POST http://localhost:3000/api/device/link-complete \
     -H "Content-Type: application/json" \
     -H "Cookie: session=..." \
     -d '{"code":"XYZABC"}'

   # 4. Poll again, should return "approved" with access token
   curl http://localhost:3000/api/device/status/link_xyz123
   ```

2. **User Profile API**:
   ```bash
   curl http://localhost:3000/api/me \
     -H "Authorization: Bearer <device_access_token>"
   ```

### Automated Testing (TODO)

- Add integration tests for device linking flow
- Add unit tests for feature flag mapping
- Add E2E tests with Playwright

---

## Support

For questions or issues with the API integration:

- Desktop App Issues: [GitHub Issues](https://github.com/yourusername/agiworkforce-desktop-app/issues)
- Website API Issues: [GitHub Issues](https://github.com/yourusername/agiworkforce-website/issues)
- Email: support@agiworkforce.com
