/**
 * Content API Endpoint
 * Provides LLM-friendly content for AI agents
 * Supports both JSON and Markdown formats
 */

import { NextRequest, NextResponse } from 'next/server'
import { formatContent, createConciseVersion } from '@/lib/llm-content-formatter'

export const dynamic = 'force-static'
export const revalidate = 3600

// Define available content pages
const contentPages: Record<string, { title: string; description: string; content: string }> = {
  home: {
    title: 'AGI Workforce - Desktop Automation Platform',
    description: 'Free, open-source desktop automation platform built with Tauri and Rust. Create powerful workflows with visual builders, browser automation, and multi-LLM support.',
    content: `
# AGI Workforce

AGI Workforce is a free, open-source desktop automation platform that empowers you to automate repetitive tasks using AI.

## Key Features

- **Visual Workflow Builder**: Create automation workflows with a drag-and-drop interface
- **Browser Automation**: Automate web tasks using Playwright
- **Desktop UI Automation**: Control desktop applications programmatically
- **Multi-LLM Support**: Works with OpenAI, Anthropic, Google, and Ollama
- **Free Local LLMs**: Use Ollama for 100% free local AI processing
- **Built with Tauri + Rust**: Fast, secure, and cross-platform

## Current Status

Version 0.1.0-alpha - Early access release
- Platform: Windows 10/11 (macOS planned Q2 2026)
- License: MIT License
- Pricing: 100% free during alpha

## Future Plans (Q2 2026)

- Pay-Per-Result pricing: $0.50 per successful automation
- Pro Unlimited: $39/month for unlimited automations
- Enterprise: Custom pricing for organizations
- macOS and Linux support

## Use Cases

- Data entry automation
- Web scraping and data extraction
- Report generation
- Email automation
- CRM data management
- Spreadsheet processing
- Document processing
- Browser testing

## Technology Stack

- Frontend: Tauri + React + TypeScript
- Backend: Rust
- Automation: Playwright, UI Automation
- LLMs: OpenAI, Anthropic, Google, Ollama
- Database: SQLite (local)

## Getting Started

1. Download for Windows from https://agiworkforce.com/download
2. Install the application
3. Configure your preferred LLM (or use free Ollama)
4. Create your first workflow
5. Automate away!

## Community & Support

- GitHub: https://github.com/siddharthanagula3/agiworkforce-desktop
- Issues: https://github.com/siddharthanagula3/agiworkforce-desktop/issues
- Email: contact@agiworkforce.com

## Disclaimer

This is alpha software built by a solo founder. Expect bugs, breaking changes, and limited support. Use at your own risk. Community support via GitHub Issues only.
`,
  },
  features: {
    title: 'AGI Workforce Features',
    description: 'Comprehensive feature list for AGI Workforce desktop automation platform',
    content: `
# AGI Workforce Features

## Core Features

### Visual Workflow Builder
Create complex automation workflows using a visual drag-and-drop interface. No coding required for basic automations.

### Browser Automation
Powered by Playwright, automate any web-based task:
- Form filling and submission
- Data extraction and scraping
- Screenshot capture
- Navigation and clicking
- File downloads

### Desktop UI Automation
Control any desktop application:
- Click buttons and menu items
- Enter text into fields
- Read text from windows
- Capture screenshots
- Monitor application state

### Multi-LLM Support
Connect to multiple LLM providers:
- **OpenAI**: GPT-4, GPT-3.5
- **Anthropic**: Claude 3 Opus, Sonnet, Haiku
- **Google**: Gemini Pro
- **Ollama**: Free local LLMs (Llama, Mistral, etc.)

### Free Local LLMs (Ollama)
Run AI models locally at zero cost:
- Complete privacy - data never leaves your machine
- No API costs
- Unlimited usage
- Support for 50+ open-source models

## Advanced Features (In Development)

### AI Employee Library
Pre-trained AI agents for specific tasks:
- Email responder
- Data entry specialist
- Report generator
- Research assistant
- Customer service agent

### Workflow Marketplace
Share and download automation workflows:
- Community templates
- Pre-built solutions
- Workflow ratings and reviews
- One-click installation

### ROI Dashboard
Track automation value:
- Time saved calculations
- Cost savings analysis
- Success/failure rates
- Performance metrics

### Team Collaboration
Work together on automation:
- Share workflows
- Version control
- Access permissions
- Team analytics

## Technical Capabilities

### Performance
- Built with Rust for maximum speed
- Native desktop app (not Electron)
- Low memory footprint
- Fast execution times

### Security
- Local-first architecture
- Optional cloud sync
- Encrypted credential storage
- No telemetry (privacy-focused)

### Integrations
- Database connections (SQLite, PostgreSQL, MySQL, MongoDB)
- REST API calls
- File system operations
- Email (SMTP/IMAP)
- Messaging (Slack, Teams, WhatsApp - planned)

### Platform Support
- **Current**: Windows 10/11
- **Planned Q2 2026**: macOS, Linux
`,
  },
  pricing: {
    title: 'AGI Workforce Pricing',
    description: 'Transparent pricing for AGI Workforce - currently 100% free (alpha)',
    content: `
# AGI Workforce Pricing

## Current Status (2025)

**100% Free - Alpha Release**

During the alpha phase, AGI Workforce is completely free:
- Unlimited local automations
- All current features included
- Free Ollama LLM support
- Windows 10/11 desktop app
- Community support via GitHub

No payment required. No credit card needed. No hidden costs.

## Future Pricing (Planned Q2 2026)

### Free Forever Tier
Always available at no cost:
- Unlimited local automation
- Visual workflow builder
- Browser automation (Playwright)
- Desktop UI automation
- Free Ollama LLM support
- Community support

### Pay-Per-Result: $0.50 per success
Outcome-based pricing:
- Only pay for successful automations
- Failed automations are FREE
- Cloud LLM credits included
- AI employee library access
- Workflow marketplace access
- Email support

### Pro Unlimited: $39/month
Fixed monthly price:
- UNLIMITED automations
- All AI employees included
- Priority email support
- Advanced analytics & ROI dashboard
- Workflow sharing & collaboration
- Custom AI employee training
- Messaging integrations (Slack, Teams, WhatsApp)
- API access for external triggers

### Enterprise: Custom Pricing
For organizations (target: late 2026):
- Everything in Pro
- Volume discounts available
- Custom feature development
- SSO/SAML authentication
- On-premise deployment option
- Uptime SLA guarantees (99.9%)
- Priority feature requests
- Team training & onboarding
- Custom integrations & white-labeling

## Monetization Roadmap

**Phase 1: Current (2025)**
- 100% free alpha release
- Build user base & gather feedback
- Solo founder development
- Open source community growth

**Phase 2: Monetization (2026)**
- Launch Pay-Per-Result tier
- Launch Pro subscription ($39/mo)
- Enterprise custom pricing
- Freemium model (free tier remains)

## Revenue Strategy

Freemium SaaS with outcome-based pricing option.
- Target: 10% conversion rate from free to paid
- ARR potential: $500K-$2M by end of 2026

## Fair Pricing Philosophy

1. **Free tier never goes away** - Always available for individuals
2. **Outcome-based option** - Pay for results, not attempts
3. **Transparent pricing** - No hidden fees or surprises
4. **Fair value exchange** - Pricing aligned with value delivered
5. **Flexible options** - Choose what works for you

## FAQ

**Q: Will the free tier have limitations?**
A: The free tier will always support unlimited local automations with Ollama. Paid tiers add cloud features, support, and convenience.

**Q: Can I switch between plans?**
A: Yes, upgrade or downgrade anytime. No long-term contracts.

**Q: What happens to my data if I cancel?**
A: All workflows and data remain on your local machine. Nothing is lost.

**Q: Do you offer discounts for nonprofits?**
A: Yes, 30% off Pro plans for verified nonprofits and educational institutions (planned).

**Q: Can I try Pro before buying?**
A: Yes, there will be a free trial period when paid tiers launch (details TBD).
`,
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const concise = searchParams.get('concise') === 'true'

    // Get content
    const page = contentPages[slug]

    if (!page) {
      return NextResponse.json(
        { error: 'Content not found', availablePages: Object.keys(contentPages) },
        { status: 404 }
      )
    }

    // Format content
    const formatted = formatContent(page.content, {
      title: page.title,
      description: page.description,
      url: `https://agiworkforce.com/${slug === 'home' ? '' : slug}`,
      published: '2025-11-01',
      modified: new Date().toISOString().split('T')[0],
      category: 'Documentation',
    })

    // Apply concise mode if requested
    if (concise) {
      formatted.markdown = createConciseVersion(formatted.markdown, 500)
      formatted.json.content = createConciseVersion(formatted.json.content, 500)
    }

    // Return requested format
    if (format === 'markdown' || format === 'md') {
      return new NextResponse(formatted.markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      })
    }

    // Default to JSON
    return NextResponse.json(formatted.json, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Content API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
