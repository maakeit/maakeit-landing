import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BlogCard } from "@/components/blog";
import type { BlogPost } from "@/components/blog";
import { ArrowLeft, Twitter, Linkedin, Globe, Mail } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

interface APIAuthor {
  _id: string;
  name: string;
  slug: string;
  bio: string;
  avatar?: string;
  role: string;
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface APIBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  readingTime: string;
}

const BASE_URL = process.env.BASE_URL || "https://maakeit.com";

async function getAuthor(slug: string): Promise<{ author: APIAuthor; posts: APIBlogPost[] } | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/authors/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAuthor(slug);

  if (!data) {
    return {
      title: "Author Not Found | Maakeit Blog",
    };
  }

  const { author } = data;

  return {
    title: `${author.name} - Author | Maakeit Blog`,
    description: author.bio,
    openGraph: {
      title: `${author.name} - Author | Maakeit Blog`,
      description: author.bio,
      type: "profile",
      url: `/authors/${slug}`,
      siteName: "Maakeit",
      images: author.avatar
        ? [{ url: author.avatar, width: 400, height: 400, alt: author.name }]
        : [],
    },
    twitter: {
      card: "summary",
      title: `${author.name} - Author`,
      description: author.bio,
      creator: author.social?.twitter,
    },
  };
}

function generatePersonSchema(author: APIAuthor) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    description: author.bio,
    image: author.avatar,
    jobTitle: author.role,
    url: `${BASE_URL}/authors/${author.slug}`,
    sameAs: [
      author.social?.twitter ? `https://twitter.com/${author.social.twitter}` : null,
      author.social?.linkedin || null,
      author.social?.website || null,
    ].filter(Boolean),
  };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const data = await getAuthor(slug);

  if (!data) {
    notFound();
  }

  const { author, posts } = data;

  const blogPosts: BlogPost[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt,
    author: author.name,
    readingTime: post.readingTime,
    image: post.coverImage,
    category: post.category,
  }));

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema(author)),
        }}
      />

      <Header homePage={false} />
      <main className="min-h-screen bg-brown-50">
        {/* Hero Section */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brown-600 hover:text-brown-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Author Card */}
            <div className="bg-cream-50 rounded-3xl shadow-warm-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Avatar */}
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] rounded-full bg-brown-200 flex items-center justify-center text-brown-700 font-bold text-3xl">
                    {getInitials(author.name)}
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-brown-900 mb-2">
                    {author.name}
                  </h1>
                  <p className="text-brown-600 text-lg mb-4">{author.role}</p>
                  <p className="text-brown-700 leading-relaxed max-w-2xl">
                    {author.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3 mt-6 justify-center md:justify-start">
                    {author.social?.twitter && (
                      <a
                        href={`https://twitter.com/${author.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                        <span className="text-sm font-medium">Twitter</span>
                      </a>
                    )}
                    {author.social?.linkedin && (
                      <a
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                    )}
                    {author.social?.website && (
                      <a
                        href={author.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-medium">Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author's Posts */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brown-900 mb-8">
              Articles by {author.name} ({blogPosts.length})
            </h2>

            {blogPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-cream-50 rounded-2xl">
                <p className="text-brown-500">No articles published yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
