import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog - Maakeit",
  description:
    "Discover expert insights on brand collaborations, content creation, and growing your influence. Learn from the best in the creator economy.",
  alternates: {
    canonical: "/blog",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
