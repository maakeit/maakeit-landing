"use client";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Maakeit",
    description:
      "Join a thriving community of creators and brands. Connect, collaborate, and grow. Unlock the full potential of content marketing with transparent pricing and instant payments.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://maakeit.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://maakeit.com"}/logo.png`,
    sameAs: [
      "https://twitter.com/maakeit",
      "https://www.facebook.com/maakeit",
      "https://www.instagram.com/maakeit",
      "https://www.linkedin.com/company/maakeit",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

