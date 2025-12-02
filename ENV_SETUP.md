# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://maakeit.com

# Google Search Console Verification (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code-here
```

## How to Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or select an existing one
3. Go to **Admin** → **Data Streams**
4. Select your web data stream
5. Copy the **Measurement ID** (starts with G-)
6. Add it to your `.env.local` file

## How to Get Google Search Console Verification Code

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Choose **HTML tag** verification method
4. Copy the content value from the meta tag
5. Add it to your `.env.local` file

## Important Notes

- Never commit `.env.local` to version control (it's already in .gitignore)
- For production deployment, add these variables to your hosting platform's environment variables
- The `NEXT_PUBLIC_` prefix makes these variables available in the browser
- Update `NEXT_PUBLIC_SITE_URL` to your actual domain in production

## Testing

After setup, verify that:
- Google Analytics is tracking by checking Real-Time reports in GA
- SEO meta tags are present by viewing page source
- robots.txt is accessible at `/robots.txt`
- sitemap.xml is accessible at `/sitemap.xml`

