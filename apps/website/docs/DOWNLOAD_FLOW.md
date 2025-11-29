# AGI Workforce Windows Download Flow

This document describes how the Windows desktop app installer is distributed through the AGI Workforce website.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Release Process](#release-process)
- [Hosting Options](#hosting-options)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Overview

The AGI Workforce website provides a configurable download flow for the Windows desktop app installer. The system is designed to:

- Allow easy updates without code changes (environment variable only)
- Support multiple hosting options (GitHub Releases, S3, R2, CDN, etc.)
- Provide clear error messages when misconfigured
- Track download analytics
- Support future macOS and Linux downloads

**Key Principle**: The installer URL is **never hardcoded** in the source code. It's always configured via environment variables.

---

## Architecture

```
User clicks "Download for Windows"
         |
         v
/api/download/windows/latest (API Route)
         |
         v
Reads: AGI_WORKFORCE_WIN_DOWNLOAD_URL (env var)
         |
         v
302 Redirect to actual installer URL
         |
         v
Browser downloads installer from:
  - GitHub Releases
  - S3/R2/GCS
  - CDN
  - Or any public URL
```

### Key Files

- **Frontend**: `apps/website/app/(marketing)/download/page.tsx`
  - Download page UI with OS detection
  - "Download for Windows" button
  - System requirements and instructions

- **API Route**: `apps/website/app/api/download/windows/latest/route.ts`
  - Reads `AGI_WORKFORCE_WIN_DOWNLOAD_URL` from environment
  - Validates URL format
  - Returns 302 redirect to installer
  - Returns 503 if not configured

- **Config**: `apps/website/.env.example`
  - Documents required environment variable
  - Provides example values

---

## Configuration

### Environment Variable

**Required**: `AGI_WORKFORCE_WIN_DOWNLOAD_URL`

**Format**: Full URL to the latest Windows installer (`.exe` or `.msi`)

**Example Values**:

```bash
# GitHub Releases (recommended)
AGI_WORKFORCE_WIN_DOWNLOAD_URL=https://github.com/yourusername/agiworkforce-desktop-app/releases/download/v0.1.0-alpha/AGIWorkforceSetup-0.1.0-alpha.exe

# AWS S3
AGI_WORKFORCE_WIN_DOWNLOAD_URL=https://downloads.agiworkforce.com.s3.amazonaws.com/windows/AGIWorkforceSetup-0.1.0-alpha.exe

# Cloudflare R2
AGI_WORKFORCE_WIN_DOWNLOAD_URL=https://downloads.agiworkforce.com/windows/AGIWorkforceSetup-0.1.0-alpha.exe

# Direct file (not recommended for production)
AGI_WORKFORCE_WIN_DOWNLOAD_URL=https://agiworkforce.com/downloads/AGIWorkforceSetup.exe
```

### Setting the Environment Variable

#### Local Development

1. Create a `.env.local` file (ignored by git):
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and set the URL:
   ```bash
   AGI_WORKFORCE_WIN_DOWNLOAD_URL=https://github.com/.../AGIWorkforceSetup-0.1.0-alpha.exe
   ```

3. Restart the Next.js dev server:
   ```bash
   npm run dev
   ```

#### Production (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables

2. Add variable:
   - **Name**: `AGI_WORKFORCE_WIN_DOWNLOAD_URL`
   - **Value**: `https://github.com/.../AGIWorkforceSetup-0.1.0-alpha.exe`
   - **Environment**: Production (and Preview if needed)

3. Redeploy the website (or it will auto-deploy on next push)

#### Production (Other Platforms)

- **Netlify**: Site settings → Environment → Environment variables
- **Docker**: Pass via `-e AGI_WORKFORCE_WIN_DOWNLOAD_URL=...`
- **AWS/GCP**: Set in platform-specific config (Lambda env vars, App Engine env.yaml, etc.)

---

## How It Works

### User Journey

1. User visits `https://agiworkforce.com/download`
2. Page detects OS (Windows/macOS/Linux) via `navigator.userAgent`
3. For Windows users:
   - Shows prominent "Download for Windows" button
   - Button links to `/api/download/windows/latest`
4. User clicks button
5. Backend redirects to actual installer URL
6. Browser downloads installer (e.g., `AGIWorkforceSetup-0.1.0-alpha.exe`)
7. User runs installer

### API Endpoint Behavior

**Endpoint**: `GET /api/download/windows/latest`

**Success Response (302 Redirect)**:
```http
HTTP/1.1 302 Found
Location: https://github.com/.../AGIWorkforceSetup-0.1.0-alpha.exe
```

**Error Response (503 Service Unavailable)**:
```json
{
  "error": "Download temporarily unavailable",
  "message": "The Windows installer download is not configured. Please contact support.",
  "code": "DOWNLOAD_NOT_CONFIGURED"
}
```

**Validation**:
- Checks if `AGI_WORKFORCE_WIN_DOWNLOAD_URL` is set
- Validates URL format using `new URL()`
- Logs download attempts for analytics

**Security**:
- No authentication required (public endpoint)
- CORS enabled for cross-origin requests
- Rate limiting recommended (TODO)

---

## Release Process

### Step-by-Step Release Workflow

When releasing a new version of the Windows desktop app:

#### 1. Build and Sign the Installer

```bash
# In agiworkforce-desktop-app repo
cd agiworkforce-desktop-app
npm run build
npm run tauri build

# Output: src-tauri/target/release/bundle/nsis/AGIWorkforceSetup-0.1.0-alpha.exe
```

#### 2. Upload Installer to Hosting

**Option A: GitHub Releases (Recommended)**

```bash
# Create a new release on GitHub
gh release create v0.1.0-alpha \
  --title "AGI Workforce v0.1.0-alpha" \
  --notes "Release notes here..." \
  src-tauri/target/release/bundle/nsis/AGIWorkforceSetup-0.1.0-alpha.exe

# Get the download URL
gh release view v0.1.0-alpha --json assets --jq '.assets[0].url'
# Output: https://github.com/org/repo/releases/download/v0.1.0-alpha/AGIWorkforceSetup-0.1.0-alpha.exe
```

**Option B: AWS S3**

```bash
aws s3 cp AGIWorkforceSetup-0.1.0-alpha.exe \
  s3://downloads.agiworkforce.com/windows/ \
  --acl public-read

# URL: https://downloads.agiworkforce.com.s3.amazonaws.com/windows/AGIWorkforceSetup-0.1.0-alpha.exe
```

**Option C: Cloudflare R2**

```bash
wrangler r2 object put \
  downloads/windows/AGIWorkforceSetup-0.1.0-alpha.exe \
  --file=AGIWorkforceSetup-0.1.0-alpha.exe \
  --content-type=application/octet-stream

# URL: https://downloads.agiworkforce.com/windows/AGIWorkforceSetup-0.1.0-alpha.exe
```

#### 3. Update Environment Variable

**Vercel**:
```bash
vercel env add AGI_WORKFORCE_WIN_DOWNLOAD_URL production
# Paste the new URL when prompted
# Then redeploy: vercel --prod
```

**Or via Dashboard**:
1. Go to Vercel Dashboard → Environment Variables
2. Edit `AGI_WORKFORCE_WIN_DOWNLOAD_URL`
3. Update value to new URL
4. Save → Redeploy

#### 4. Update Download Page Metadata (Optional)

Edit `apps/website/app/(marketing)/download/page.tsx`:

```typescript
const versions = {
  windows: {
    version: "0.1.0-alpha",      // Update version number
    size: "128 MB",        // Update file size
    releaseDate: "November 26, 2025",  // Update date
    checksum: "sha256:abc123...",      // Update checksum
  },
  // ...
}
```

Commit and push:
```bash
git add apps/website/app/(marketing)/download/page.tsx
git commit -m "chore: update Windows installer to v0.1.0-alpha"
git push origin main
```

#### 5. Verify Download

1. Visit `https://agiworkforce.com/download`
2. Click "Download for Windows"
3. Verify correct installer downloads
4. Check file size and version match

---

## Hosting Options

### Comparison

| Hosting | Pros | Cons | Cost |
|---------|------|------|------|
| **GitHub Releases** | Free, versioned, easy CI/CD, automatic checksums | 2GB file size limit, rate limits | Free |
| **AWS S3** | Reliable, unlimited size, built-in CDN via CloudFront | Costs $0.023/GB storage + bandwidth | ~$5-20/month |
| **Cloudflare R2** | Free egress, cheap storage ($0.015/GB) | Requires R2 setup | ~$1-5/month |
| **Vercel Blob** | Integrated with Vercel, easy setup | Costs add up for large files | $0.15/GB/month |
| **Self-Hosted** | Full control | Maintenance burden, bandwidth costs | Varies |

### Recommendation

**For startups/small projects**: Use **GitHub Releases**
- Free
- Automatic version management
- Integrates with CI/CD
- Provides download counts
- Community-trusted

**For production/scale**: Use **Cloudflare R2 + CDN**
- Free egress (no bandwidth charges)
- Global CDN for fast downloads
- Cheap storage
- Custom domain support

---

## Testing

### Manual Testing

#### Test Download Flow

```bash
# 1. Start dev server
npm run dev

# 2. Test API endpoint directly
curl -I http://localhost:3000/api/download/windows/latest

# Expected: HTTP/1.1 302 Found
# Expected: Location: <your_configured_url>

# 3. Test without config (should fail gracefully)
unset AGI_WORKFORCE_WIN_DOWNLOAD_URL
curl http://localhost:3000/api/download/windows/latest

# Expected: HTTP/1.1 503 Service Unavailable
# Expected: {"error":"Download temporarily unavailable",...}
```

#### Test Download Page

1. Open `http://localhost:3000/download`
2. Verify OS detection (should highlight Windows if on Windows)
3. Click "Download for Windows" button
4. Verify redirect to installer URL
5. Check browser downloads the file

### Automated Testing (TODO)

Add E2E tests in `apps/website/__tests__/download.test.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('download page loads and detects OS', async ({ page }) => {
  await page.goto('/download');
  await expect(page.locator('h1')).toContainText('Download AGI Workforce');
});

test('download button redirects to installer', async ({ page, context }) => {
  // Listen for redirect
  page.on('response', response => {
    if (response.url().includes('/api/download/windows/latest')) {
      expect(response.status()).toBe(302);
    }
  });

  await page.goto('/download');
  await page.click('text=Download for Windows');
});

test('API returns 503 when not configured', async ({ request }) => {
  // Mock env var being unset
  const response = await request.get('/api/download/windows/latest');

  if (response.status() === 503) {
    const json = await response.json();
    expect(json.code).toBe('DOWNLOAD_NOT_CONFIGURED');
  }
});
```

---

## Troubleshooting

### Common Issues

#### 1. "Download temporarily unavailable" Error

**Cause**: `AGI_WORKFORCE_WIN_DOWNLOAD_URL` environment variable is not set.

**Fix**:
```bash
# Local dev
echo "AGI_WORKFORCE_WIN_DOWNLOAD_URL=https://..." >> .env.local
npm run dev

# Production (Vercel)
vercel env add AGI_WORKFORCE_WIN_DOWNLOAD_URL production
vercel --prod
```

#### 2. "Download configuration error" Error

**Cause**: The URL in `AGI_WORKFORCE_WIN_DOWNLOAD_URL` is malformed.

**Fix**:
- Ensure URL is complete (includes `https://`)
- Check for typos
- Verify URL is publicly accessible

```bash
# Test URL accessibility
curl -I "$AGI_WORKFORCE_WIN_DOWNLOAD_URL"
```

#### 3. 404 Not Found When Downloading

**Cause**: The installer file doesn't exist at the configured URL.

**Fix**:
- Verify file was uploaded to hosting
- Check URL in browser manually
- For GitHub Releases, ensure release is public

```bash
# Test GitHub release URL
curl -I https://github.com/org/repo/releases/download/v0.1.0-alpha/installer.exe
```

#### 4. Download Works Locally But Not in Production

**Cause**: Environment variable not set in production or cached build.

**Fix**:
```bash
# Vercel
vercel env ls  # Check if variable exists
vercel --prod  # Force redeploy

# Other platforms
# Check platform-specific environment variable settings
```

#### 5. CORS Errors from Desktop App

**Cause**: Desktop app trying to fetch download URL directly.

**Fix**:
- Desktop app should open the download URL in browser, not fetch directly
- Or update `/api/download/windows/latest` to include CORS headers (already done)

---

## Future Enhancements

### Roadmap

- [ ] **Download Analytics**
  - Track download counts by OS, region, referrer
  - Store in database or analytics service (Plausible, PostHog)

- [ ] **Auto-Update System**
  - Add `/api/download/windows/latest/version.json` endpoint
  - Desktop app checks for updates on startup
  - Prompt user to download new version

- [ ] **macOS Support**
  - Add `AGI_WORKFORCE_MAC_DOWNLOAD_URL` env var
  - Add `/api/download/macos/latest` endpoint
  - Update download page

- [ ] **Linux Support**
  - Add `AGI_WORKFORCE_LINUX_DOWNLOAD_URL` env var
  - Add `/api/download/linux/latest` endpoint
  - Support multiple formats (`.deb`, `.rpm`, `.AppImage`)

- [ ] **Checksum Verification**
  - Store SHA-256 checksums in database or config
  - Display on download page
  - Provide verification instructions

- [ ] **Rate Limiting**
  - Limit download endpoint to prevent abuse
  - Use Vercel Edge Config or Redis for rate limiting

- [ ] **A/B Testing**
  - Test different download page designs
  - Measure conversion rates

---

## Support

### For Developers

- GitHub Issues: [agiworkforce-website/issues](https://github.com/yourusername/agiworkforce-website/issues)
- Documentation: See `docs/` folder in this repo

### For End Users

- Support Email: support@agiworkforce.com
- Download Issues: https://agiworkforce.com/support

---

## References

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Tauri App Distribution](https://tauri.app/v1/guides/distribution/)
