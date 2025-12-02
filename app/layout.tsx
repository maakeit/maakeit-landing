import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Maakeit - Where Brands Discover Creators. Build Together.",
    template: "%s | Maakeit",
  },
  description:
    "Join a thriving community of creators and brands. Connect, collaborate, and grow. Unlock the full potential of content marketing with transparent pricing and instant payments.",
  keywords: [
    "creator marketplace",
    "brand collaboration",
    "content creators",
    "influencer marketing",
    "creator economy",
    "brand partnerships",
    "content marketing",
    "instant payments",
    "creator platform",
    "UGC content",
    "social media creators",
  ],
  authors: [{ name: "Maakeit" }],
  creator: "Maakeit",
  publisher: "Maakeit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://maakeit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Maakeit - Where Brands Discover Creators. Build Together.",
    description:
      "Join a thriving community of creators and brands. Connect, collaborate, and grow. Unlock the full potential of content marketing with transparent pricing and instant payments.",
    siteName: "Maakeit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maakeit - Creator & Brand Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maakeit - Where Brands Discover Creators. Build Together.",
    description:
      "Join a thriving community of creators and brands. Connect, collaborate, and grow.",
    images: ["/og-image.png"],
    creator: "@maakeit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <StructuredData />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

