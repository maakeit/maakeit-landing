# Maakeit Landing Page

A high-converting landing page for Maakeit, built with Next.js 14, featuring a premium beige + brown aesthetic.

## 🎨 Design System

### Color Palette

The landing page uses a warm, premium beige + brown brand palette:

- **Beige Background**: `#F5EFE7`
- **Deep Brown Accents**: `#5A4634`
- **Soft Brown Text**: `#6D5A4C`
- **Cream/White Cards**: `#FFFFFF`
- **Light Brown Shadows**: `rgba(90, 70, 52, 0.06)`
- **Highlight Gold/Tan**: `#C7A689`

### Typography

- Headlines: `text-5xl md:text-6xl font-semibold tracking-tight`
- Section titles: `text-3xl font-semibold`
- Body text: `text-lg text-brown-600 leading-relaxed`

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom beige/brown palette
- **Components**: shadcn/ui (Button, Input, Accordion)
- **Animations**: Framer Motion for fade/slide reveals
- **Content**: MDX for blog posts
- **Icons**: Lucide React

## 📂 Project Structure

```
maakeit-landing/
├── app/
│   ├── blog/           # Blog listing page
│   ├── globals.css     # Global styles with custom theme
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main landing page
├── components/
│   ├── ui/             # shadcn/ui components
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   └── input.tsx
│   ├── CTASection.tsx
│   ├── EmailWaitlist.tsx
│   ├── FAQAccordion.tsx
│   ├── FeatureCardsGrid.tsx
│   ├── Footer.tsx
│   ├── FounderSection.tsx
│   ├── Hero.tsx
│   ├── PaymentsSection.tsx
│   ├── PressBar.tsx
│   ├── ResourcesShowcase.tsx
│   └── Testimonials.tsx
├── content/
│   └── posts/          # MDX blog posts
├── lib/
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env.local file
cp ENV_SETUP.md .env.local
# Then edit .env.local with your actual values
```

Required environment variables:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Your Google Analytics Measurement ID
- `NEXT_PUBLIC_SITE_URL` - Your production site URL
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - (Optional) Google Search Console verification

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed setup instructions.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📄 Landing Page Sections

1. **Hero Section** - Main headline, subtext, email waitlist input, profile bubbles
2. **Press Bar** - Featured media logos
3. **Feature Cards Grid** - 2×3 grid showcasing platform features
4. **Payments Section** - Stat cards explaining pricing model
5. **Resources Showcase** - Four resource cards
6. **Founder Section** - Video placeholder and mission statement
7. **Testimonials** - Three testimonial cards
8. **FAQ Accordion** - Five frequently asked questions
9. **CTA Section** - Final call-to-action with email signup
10. **Footer** - Navigation links and copyright

## 🎯 Key Features

- **100% Responsive** - Mobile-first design with perfect spacing
- **Smooth Animations** - Framer Motion fade-up reveals
- **Premium Design** - Generous negative space and soft shadows
- **Type-safe** - Built with TypeScript
- **MDX Blog** - Ready for content marketing
- **Email Waitlist** - Capture early signups
- **Google Analytics** - Full GA4 integration with custom event tracking
- **SEO Optimized** - Complete meta tags, Open Graph, Twitter Cards, structured data
- **Auto-generated Sitemap** - Dynamic XML sitemap at `/sitemap.xml`
- **Robots.txt** - SEO-friendly robots configuration
- **PWA Ready** - Web app manifest with theme colors

## 📝 Customization

### Colors

Edit the color palette in `tailwind.config.ts`:

```typescript
colors: {
  brown: { /* custom shades */ },
  beige: { /* custom shades */ },
}
```

### Content

Update section content in the respective component files:
- Hero text: `components/Hero.tsx`
- Features: `components/FeatureCardsGrid.tsx`
- FAQs: `components/FAQAccordion.tsx`
- etc.

### Blog Posts

Add new MDX files to `content/posts/` and update the post list in `app/blog/page.tsx`

## 📧 Email Waitlist

The email waitlist component uses an API route at `/api/waitlist`. 

To connect a real backend:

1. Update the API route in `app/api/waitlist/route.ts`
2. Consider using:
   - Supabase for database storage
   - Resend/SendGrid for email notifications
   - Airtable for simple storage

## 📊 Google Analytics & Tracking

### Event Tracking

The landing page includes custom event tracking utilities in `lib/analytics.ts`:

```typescript
import { trackButtonClick, trackFormSubmission, trackCTAClick } from '@/lib/analytics';

// Track button clicks
trackButtonClick('Join Waitlist');

// Track form submissions
trackFormSubmission('waitlist', true);

// Track CTA clicks
trackCTAClick('Get Started', 'Hero Section');
```

### Available Tracking Functions

- `trackEvent(action, category, label, value)` - Generic event tracking
- `trackButtonClick(buttonName)` - Track button interactions
- `trackFormSubmission(formName, success)` - Track form submissions
- `trackPageView(url)` - Track page views (for SPAs)
- `trackOutboundLink(url)` - Track external link clicks
- `trackCTAClick(ctaName, location)` - Track CTA interactions

## 🔍 SEO Features

### Implemented SEO Features

1. **Comprehensive Meta Tags**
   - Title, description, keywords
   - Open Graph tags for social sharing
   - Twitter Card tags
   - Canonical URLs

2. **Structured Data (JSON-LD)**
   - Organization schema
   - Automatic rich snippets

3. **Auto-generated Files**
   - `/sitemap.xml` - Dynamic sitemap
   - `/robots.txt` - Search engine directives
   - `/manifest.json` - PWA manifest

4. **Performance Optimizations**
   - Next.js automatic code splitting
   - Image optimization ready
   - Font optimization with `next/font`

### Verifying SEO Setup

1. **Google Search Console**
   - Add your property
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`
   - Verify ownership using meta tag

2. **Test Tools**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Run in Chrome DevTools

## 🎨 Design Philosophy

This landing page follows these principles:

- **Warm & Premium**: Beige/brown palette creates a high-end, editorial feel
- **Clear Hierarchy**: Large headlines, generous spacing, clear CTAs
- **Trust Building**: Testimonials, press mentions, transparent pricing
- **Conversion Focused**: Multiple email capture points, clear value props

## 📦 Dependencies

Key dependencies:
- `next` - React framework
- `react` & `react-dom` - UI library
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Animation library
- `@radix-ui/react-accordion` - Accessible accordion
- `lucide-react` - Icon library
- `@next/mdx` - MDX support

## 🤝 Contributing

This is a custom landing page. For modifications, update the components and styles as needed.

## 📄 License

ISC

---

Built with ❤️ for Maakeit

