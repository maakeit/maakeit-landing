import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BlogCard, CategoryPill, AuthorBadge, ShareButtons } from "@/components/blog";
import type { BlogPost } from "@/components/blog";
import {
  ArrowLeft,
  Twitter,
  Linkedin,
  LinkIcon,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface APIBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  author: {
    _id: string;
    name: string;
    slug: string;
    bio: string;
    avatar?: string;
    role: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
}

const BASE_URL = "http://localhost:3001"

// Fetch post data
async function getPost(slug: string): Promise<APIBlogPost | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/blog/posts/${slug}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Fetch related posts
async function getRelatedPosts(
  slug: string,
  category: string
): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/blog/related?slug=${slug}&category=${category}&limit=3`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return (
      data.posts?.map((post: APIBlogPost) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.publishedAt,
        author: post.author?.name || "Maakeit Team",
        readingTime: post.readingTime,
        image: post.coverImage,
        category: post.category,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Maakeit Blog",
    };
  }

  const title = post.metaTitle || `${post.title} | Maakeit Blog`;
  const description = post.metaDescription || post.excerpt;
  const ogImage = post.ogImage || post.coverImage;

  return {
    title,
    description,
    authors: [{ name: post.author?.name }],
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name],
      url: `/blog/${slug}`,
      siteName: "Maakeit",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
      creator: post.author?.social?.twitter,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

// JSON-LD structured data
function generateArticleSchema(post: APIBlogPost, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name,
      url: post.author?.social?.website || `${BASE_URL}/authors/${post.author?.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Maakeit",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
    keywords: post.tags?.join(", "),
  };
}

function generateBreadcrumbSchema(post: APIBlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${post.slug}`,
      },
    ],
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, post.category);
  const articleUrl = `${BASE_URL}/blog/${slug}`;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(post, articleUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(post)),
        }}
      />

      <Header homePage={false} />
      <main className="min-h-screen bg-brown-50">
        {/* Hero Section with Cover Image */}
        <section className="relative pt-16">
          <div className="relative h-[50vh] min-h-[400px] max-h-[560px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover brightness-[0.5]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-brown-900/50 to-brown-900/20" />

            {/* Back Button */}
            <div className="absolute top-6 left-0 right-0">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <Link
                href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cream-50/10 backdrop-blur-sm text-cream-50 rounded-full text-sm font-medium hover:bg-cream-50/20 transition-colors"
              >
                  <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-12">
                <div className="max-w-3xl">
                  <CategoryPill
                    category={post.category}
                    variant="dark"
                    size="md"
                    className="mb-4"
                  />
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 leading-tight mb-6">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-cream-100/90">
                    <AuthorBadge
                      name={post.author?.name || "Maakeit Team"}
                      avatarUrl={post.author?.avatar}
                      size="md"
                      variant="light"
                      showMeta={false}
                    />
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                      <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readingTime}
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content + Sidebar */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex gap-12 lg:gap-16">
              {/* Main Content */}
              <article className="flex-1 max-w-3xl">
                <div className="bg-cream-50 rounded-3xl shadow-warm-lg overflow-hidden">
                  <div className="p-6 sm:p-10 lg:p-12">
                    <div className="prose-custom">
                      <ArticleContent content={post.content} />
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-brown-100">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-brown-100 text-brown-600 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                    </div>
                  </div>
                    )}
                  </div>
                </div>

                {/* Share Section - Mobile */}
                <div className="mt-8 p-6 bg-cream-50 rounded-2xl shadow-warm-sm lg:hidden">
                  <p className="text-brown-600 text-sm font-medium mb-4">
                    Share this article
                  </p>
                  <ShareButtons url={articleUrl} title={post.title} />
                </div>
              </article>

              {/* Sidebar - Desktop Only */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* Author Bio Card */}
                  <div className="bg-cream-50 rounded-2xl shadow-warm-sm p-6">
                    <p className="text-brown-400 text-xs font-medium uppercase tracking-wider mb-4">
                      Written by
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      {post.author?.avatar ? (
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={56}
                          height={56}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-brown-200 flex items-center justify-center text-brown-700 font-semibold text-lg">
                          {getInitials(post.author?.name || "M")}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-brown-900">
                          {post.author?.name}
                        </p>
                        <p className="text-brown-500 text-sm">
                          {post.author?.role || "Contributor"}
                        </p>
                      </div>
                    </div>
                    <p className="text-brown-600 text-sm leading-relaxed">
                      {post.author?.bio ||
                        "Passionate about helping creators and brands build meaningful collaborations."}
                    </p>

                    {/* Author Social Links */}
                    {post.author?.social && (
                      <div className="flex gap-2 mt-4">
                        {post.author.social.twitter && (
                          <a
                            href={`https://twitter.com/${post.author.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-brown-100 hover:bg-brown-200 rounded-lg transition-colors"
                          >
                            <Twitter className="w-4 h-4 text-brown-600" />
                          </a>
                        )}
                        {post.author.social.linkedin && (
                          <a
                            href={post.author.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-brown-100 hover:bg-brown-200 rounded-lg transition-colors"
                          >
                            <Linkedin className="w-4 h-4 text-brown-600" />
                          </a>
                        )}
                        {post.author.social.website && (
                          <a
                            href={post.author.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-brown-100 hover:bg-brown-200 rounded-lg transition-colors"
                          >
                            <LinkIcon className="w-4 h-4 text-brown-600" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Share Buttons */}
                  <div className="bg-cream-50 rounded-2xl shadow-warm-sm p-6">
                    <p className="text-brown-400 text-xs font-medium uppercase tracking-wider mb-4">
                      Share Article
                    </p>
                    <ShareButtons url={articleUrl} title={post.title} />
                  </div>

                  {/* Internal Links */}
                  <div className="bg-cream-50 rounded-2xl shadow-warm-sm p-6">
                    <p className="text-brown-400 text-xs font-medium uppercase tracking-wider mb-4">
                      Explore More
                    </p>
                    <nav className="space-y-2">
                      <Link
                        href="/blog"
                        className="block text-brown-600 text-sm hover:text-brown-900 transition-colors py-1"
                      >
                        → All Articles
                      </Link>
                      <Link
                        href={`/blog?category=${post.category}`}
                        className="block text-brown-600 text-sm hover:text-brown-900 transition-colors py-1"
                      >
                        → More in {post.category}
                      </Link>
                      <Link
                        href="/"
                        className="block text-brown-600 text-sm hover:text-brown-900 transition-colors py-1"
                      >
                        → About Maakeit
                      </Link>
                    </nav>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 md:py-20 border-t border-brown-200/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brown-900 mb-3">
                  Continue Reading
                </h2>
                <p className="text-brown-500 max-w-lg mx-auto">
                  Explore more insights on creator growth and brand
                  collaborations
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-brown-800 to-brown-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-400/20 rounded-2xl mb-6">
                <BookOpen className="w-8 h-8 text-gold-400" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-50 mb-4">
                Build Better Brand–Creator Collaborations
              </h2>
              <p className="text-cream-100/80 text-lg mb-8 max-w-xl mx-auto">
                Maakeit connects brands with authentic creators. Join thousands
                of successful partnerships and grow your influence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-8 py-4 bg-cream-50 text-brown-900 rounded-2xl font-semibold hover:bg-cream-100 transition-colors shadow-warm-md"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/blog"
                  className="px-8 py-4 bg-cream-50/10 text-cream-50 border border-cream-50/20 rounded-2xl font-semibold hover:bg-cream-50/20 transition-colors"
                >
                  Explore More Articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


// Article Content Renderer
function ArticleContent({ content }: { content: string }) {
  const html = parseMarkdown(content);
  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function parseMarkdown(markdown: string): string {
  let html = markdown
    .replace(
      /^### (.*$)/gim,
      '<h3 class="font-display text-xl font-semibold text-brown-900 mt-10 mb-4">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="font-display text-2xl font-semibold text-brown-900 mt-12 mb-5">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="font-display text-3xl font-bold text-brown-900 mt-12 mb-6">$1</h1>'
    )
    .replace(
      /\*\*(.*?)\*\*/gim,
      '<strong class="font-semibold text-brown-800">$1</strong>'
    )
    .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
    .replace(
      /\[(.*?)\]\((.*?)\)/gim,
      '<a href="$2" class="text-brown-700 underline decoration-brown-300 hover:decoration-brown-600 underline-offset-2 transition-colors">$1</a>'
    )
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-gold-400 bg-cream-100 pl-6 py-4 pr-4 my-6 rounded-r-xl text-brown-700 italic">$1</blockquote>'
    )
    .replace(
      /`([^`]+)`/gim,
      '<code class="px-2 py-1 bg-brown-100 text-brown-800 rounded-lg text-sm font-mono">$1</code>'
    )
    .replace(
      /^- (.*$)/gim,
      '<li class="text-brown-700 leading-relaxed pl-2">$1</li>'
    )
    .replace(
      /^\d+\. (.*$)/gim,
      '<li class="text-brown-700 leading-relaxed pl-2">$1</li>'
    )
    .replace(
      /\n\n/gim,
      '</p><p class="text-brown-700 leading-[1.8] mb-6">'
    )
    .replace(/\n/gim, "<br />");

  html = `<p class="text-brown-700 leading-[1.8] mb-6">${html}</p>`;

  html = html.replace(/(<li.*?<\/li>\s*)+/g, (match) => {
    return `<ul class="list-disc pl-6 mb-6 space-y-3 marker:text-brown-400">${match}</ul>`;
  });

  html = html.replace(/<p class="[^"]*"><\/p>/g, "");

  return html;
}
