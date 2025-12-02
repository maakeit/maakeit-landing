import Link from "next/link";
import { Footer } from "@/components/Footer";

const blogPosts = [
  {
    slug: "getting-started-with-creator-campaigns",
    title: "Getting Started with Creator Campaigns on Maakeit",
    excerpt: "Learn how to launch your first creator campaign and find the perfect content creators for your brand.",
    date: "November 20, 2024",
    author: "Maakeit Team",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-beige-100">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-5xl font-bold text-brown-900">Blog</h1>
          <p className="mb-12 text-xl text-brown-600">
            Insights, tips, and stories from the creator economy
          </p>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl bg-white p-8 shadow-brown-md transition-all hover:shadow-brown-lg"
              >
                <h2 className="mb-3 text-2xl font-semibold text-brown-900">
                  {post.title}
                </h2>
                <p className="mb-4 text-brown-600">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-brown-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

