# AGI Workforce Website - Deployment Guide

## 🚀 Deployment Checklist

This document provides a comprehensive checklist for deploying the AGI Workforce marketing website to production.

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [x] All pages build successfully without errors
- [x] TypeScript compilation passes with no errors
- [x] ESLint checks pass with no warnings
- [x] No console errors in browser
- [x] All components render correctly
- [x] Mobile responsiveness verified
- [x] Dark/light theme works correctly

### Content
- [ ] Replace all placeholder images with real assets
- [ ] Add real company logos to social proof section
- [ ] Add real customer testimonials (or remove section)
- [ ] Update download URLs with actual file links
- [ ] Add real YouTube video URL to demo modal
- [ ] Review all copy for accuracy
- [ ] Check all links are working
- [ ] Verify contact information (email, phone)

### Configuration
- [ ] Set production `NEXT_PUBLIC_SITE_URL` in environment
- [ ] Configure email service API keys
- [ ] Configure newsletter service API keys
- [ ] Add Google Analytics tracking ID (if using)
- [ ] Add search console verification codes
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure CDN for static assets (optional)

### SEO
- [x] Sitemap generated at `/sitemap.xml`
- [x] Robots.txt configured at `/robots.txt`
- [x] All pages have meta descriptions
- [x] Open Graph tags configured
- [x] Twitter Cards configured
- [x] Structured data (JSON-LD) implemented
- [ ] Update Google/Yandex verification codes
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

### Forms & APIs
- [ ] Test contact form submission
- [ ] Test newsletter signup
- [ ] Integrate email service (SendGrid/Resend/AWS SES)
- [ ] Integrate newsletter service (Mailchimp/ConvertKit/etc.)
- [ ] Set up form spam protection (if needed)
- [ ] Test cookie consent functionality
- [ ] Verify API endpoints are secure

### Performance
- [x] Production build optimized
- [x] Images optimized (WebP, AVIF)
- [x] Code splitting enabled
- [x] Bundle size optimized (102 kB shared JS)
- [ ] Set up CDN for static assets
- [ ] Configure caching headers
- [ ] Test page load speeds
- [ ] Run Lighthouse audit (aim for 90+ scores)

### Security
- [x] X-Powered-By header disabled
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure Content Security Policy (CSP)
- [ ] Set up rate limiting for API endpoints
- [ ] Add CORS configuration if needed
- [ ] Review environment variables security
- [ ] Enable security headers

### Monitoring & Analytics
- [ ] Set up Google Analytics or Plausible
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Configure performance monitoring
- [ ] Set up logging aggregation
- [ ] Create alerts for critical errors

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Pros**: Zero config, automatic deployments, edge network, built for Next.js

**Steps**:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd apps/website
vercel --prod
```

**Environment Variables** (set in Vercel dashboard):
```
NEXT_PUBLIC_SITE_URL=https://agiworkforce.com
EMAIL_SERVICE_API_KEY=your_key
NEWSLETTER_API_KEY=your_key
```

**Custom Domain**:
1. Go to Vercel dashboard → Settings → Domains
2. Add `agiworkforce.com`
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

---

### Option 2: Netlify

**Pros**: Great for static sites, easy configuration, generous free tier

**Steps**:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
cd apps/website
netlify deploy --prod
```

**Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### Option 3: AWS Amplify

**Pros**: AWS integration, scalable, good for enterprise

**Steps**:
1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy

**Build Settings**:
```yaml
version: 1
applications:
  - appRoot: apps/website
    frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
```

---

### Option 4: Docker + VPS

**Pros**: Full control, cost-effective for high traffic

**Dockerfile**:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]
```

**Deploy**:
```bash
# Build image
docker build -t agiworkforce-website .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://agiworkforce.com \
  agiworkforce-website
```

---

## 📋 Post-Deployment Checklist

### Immediate (Day 1)
- [ ] Verify homepage loads correctly
- [ ] Test all navigation links
- [ ] Submit forms to test email delivery
- [ ] Check mobile responsiveness
- [ ] Test dark/light theme switching
- [ ] Verify download links work
- [ ] Test cookie consent banner
- [ ] Check all images load correctly

### Within First Week
- [ ] Monitor error logs for issues
- [ ] Check analytics for traffic
- [ ] Review form submissions
- [ ] Monitor page load speeds
- [ ] Check SEO indexing status
- [ ] Review security logs
- [ ] Test from different devices/browsers
- [ ] Collect user feedback

### Within First Month
- [ ] Run full Lighthouse audit
- [ ] Review analytics data
- [ ] Optimize based on user behavior
- [ ] Update content based on feedback
- [ ] Check search engine rankings
- [ ] Review and optimize performance
- [ ] Plan next iteration of features

---

## 🔧 Environment Variables Reference

### Required
```env
NEXT_PUBLIC_SITE_URL=https://agiworkforce.com
```

### Email Service (Choose One)
```env
# SendGrid
EMAIL_SERVICE_API_KEY=SG.xxxxx
EMAIL_FROM_ADDRESS=noreply@agiworkforce.com
EMAIL_TO_ADDRESS=support@agiworkforce.com

# OR Resend
RESEND_API_KEY=re_xxxxx
```

### Newsletter Service (Choose One)
```env
# Mailchimp
MAILCHIMP_API_KEY=xxxxx
MAILCHIMP_LIST_ID=xxxxx

# OR ConvertKit
CONVERTKIT_API_KEY=xxxxx
CONVERTKIT_FORM_ID=xxxxx

# OR Beehiiv
BEEHIIV_API_KEY=xxxxx
BEEHIIV_PUBLICATION_ID=xxxxx
```

### Analytics (Optional)
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=agiworkforce.com
```

### Monitoring (Optional)
```env
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxx
```

### Search Console
```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code_here
NEXT_PUBLIC_YANDEX_VERIFICATION=your_code_here
```

---

## 🧪 Testing Procedure

### Manual Testing
1. **Homepage**: Verify all 11 sections render correctly
2. **Navigation**: Test all menu items and links
3. **Forms**: Submit contact form and newsletter signup
4. **Mobile**: Test on iOS and Android devices
5. **Themes**: Switch between light/dark modes
6. **Browsers**: Test on Chrome, Firefox, Safari, Edge
7. **404 Page**: Navigate to non-existent page
8. **Error Handling**: Test error boundary (if possible)

### Automated Testing (Future)
```bash
# E2E tests (when implemented)
npm run test:e2e

# Unit tests (when implemented)
npm run test:unit

# Lighthouse CI
npm run lighthouse
```

---

## 📊 Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Lighthouse Scores (Target: 90+)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Bundle Size
- Current: 102 kB (shared)
- Target: Keep under 150 kB

---

## 🚨 Rollback Procedure

### Vercel
```bash
# View deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Netlify
```bash
# View deployments
netlify sites:list

# Rollback via dashboard or CLI
netlify rollback
```

### Git-based Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard [commit-hash]
git push origin main --force
```

---

## 📞 Support Contacts

### Technical Issues
- Developer: [Your contact]
- DevOps: [Your contact]

### Content Updates
- Marketing: [Your contact]
- Product: [Your contact]

### Emergency
- On-call: [Your contact]
- Escalation: [Your contact]

---

## 📚 Additional Resources

### Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)

### Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [Google Search Console](https://search.google.com/search-console)

---

## ✅ Final Checks Before Go-Live

- [ ] All pre-deployment checklist items completed
- [ ] Production environment variables set
- [ ] DNS configured correctly
- [ ] SSL certificate active
- [ ] All forms working with real email services
- [ ] Analytics tracking verified
- [ ] Error monitoring active
- [ ] Backup strategy in place
- [ ] Rollback procedure tested
- [ ] Stakeholders notified
- [ ] Launch announcement ready

---

**Ready to launch? Double-check this list and deploy with confidence!** 🚀

*Last Updated: 2025-11-11*
