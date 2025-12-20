import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog - Maakeit | Creator Economy Insights",
  description:
    "Discover expert insights on brand collaborations, content creation, and growing your influence. Learn from the best in the creator economy.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog - Maakeit | Creator Economy Insights",
    description:
      "Discover expert insights on brand collaborations, content creation, and growing your influence.",
    url: "/blog",
    siteName: "Maakeit",
    type: "website",
    images: [
      {
        url: "/og-blog.png",
        width: 1200,
        height: 630,
        alt: "Maakeit Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Maakeit | Creator Economy Insights",
    description:
      "Discover expert insights on brand collaborations, content creation, and growing your influence.",
    images: ["/og-blog.png"],
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
