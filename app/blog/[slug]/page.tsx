import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BlogCard, CategoryPill, AuthorBadge } from "@/components/blog";
import type { BlogPost } from "@/components/blog";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { ArrowLeft, Share2, Twitter, Linkedin, LinkIcon, Calendar, Clock, BookOpen } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// MOCK DATA FOR RELATED POSTS
// ============================================
const relatedPosts: BlogPost[] = [
  {
    slug: "creator-pricing-strategies",
    title: "Creator Pricing Strategies That Actually Work",
    excerpt: "Set the right rates for your content and maximize your earning potential as a creator.",
    date: "2024-12-12",
    author: "James Wilson",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Creator Tips",
  },
  {
    slug: "brand-collaboration-tips",
    title: "10 Tips for Successful Brand Collaborations",
    excerpt: "Master the art of brand partnerships and create content that resonates.",
    date: "2024-12-10",
    author: "Emily Rodriguez",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    category: "Collaboration",
  },
  {
    slug: "social-media-trends-2025",
    title: "Social Media Trends to Watch in 2025",
    excerpt: "Stay ahead of the curve with these emerging trends shaping the future.",
    date: "2024-12-05",
    author: "Maakeit Team",
    readingTime: "10 min read",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
    category: "Social Media",
  },
];

// Fallback image if post doesn't have one
const fallbackImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Maakeit",
    };
  }

  return {
    title: `${post.title} | Maakeit Blog`,
    description: post.excerpt,
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
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postImage = post.image || fallbackImage;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brown-50">
        {/* ============================================
            HERO SECTION WITH COVER IMAGE
        ============================================ */}
        <section className="relative pt-16">
          {/* Cover Image */}
          <div className="relative h-[50vh] min-h-[400px] max-h-[560px]">
            <Image
              src={postImage}
              alt={post.title}
              fill
              className="object-cover opacity-[0.65]"
              priority
            />
            {/* Warm Gradient Overlay - consistent with featured card */}
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
                  <CategoryPill category={post.category || "Article"} variant="dark" size="md" className="mb-4" />
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 leading-tight mb-6">
                    {post.title}
                  </h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-cream-100/90">
                    <AuthorBadge
                      name={post.author}
                      size="md"
                      variant="light"
                      showMeta={false}
                    />
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
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

        {/* ============================================
            ARTICLE CONTENT + SIDEBAR
        ============================================ */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex gap-12 lg:gap-16">
              {/* Main Content */}
              <article className="flex-1 max-w-3xl">
                {/* Article Card */}
                <div className="bg-cream-50 rounded-3xl shadow-warm-lg overflow-hidden">
                  <div className="p-6 sm:p-10 lg:p-12">
                    {/* Prose Content */}
                    <div className="prose-custom">
                      <ArticleContent content={post.content} />
                    </div>
                  </div>
                </div>

                {/* Share Section - Mobile */}
                <div className="mt-8 p-6 bg-cream-50 rounded-2xl shadow-warm-sm lg:hidden">
                  <p className="text-brown-600 text-sm font-medium mb-4">Share this article</p>
                  <ShareButtons />
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
                      <div className="w-14 h-14 rounded-full bg-brown-200 flex items-center justify-center text-brown-700 font-semibold text-lg">
                        {getInitials(post.author)}
                      </div>
                      <div>
                        <p className="font-semibold text-brown-900">{post.author}</p>
                        <p className="text-brown-500 text-sm">Content Creator</p>
                      </div>
                    </div>
                    <p className="text-brown-600 text-sm leading-relaxed">
                      Passionate about helping creators and brands build meaningful collaborations 
                      in the digital space.
                    </p>
                  </div>

                  {/* Share Buttons */}
                  <div className="bg-cream-50 rounded-2xl shadow-warm-sm p-6">
                    <p className="text-brown-400 text-xs font-medium uppercase tracking-wider mb-4">
                      Share Article
                    </p>
                    <ShareButtons />
                  </div>

                  {/* Table of Contents (simplified) */}
                  <div className="bg-cream-50 rounded-2xl shadow-warm-sm p-6">
                    <p className="text-brown-400 text-xs font-medium uppercase tracking-wider mb-4">
                      Quick Links
                    </p>
                    <nav className="space-y-2">
                      <a href="#" className="block text-brown-600 text-sm hover:text-brown-900 transition-colors py-1">
                        → Introduction
                      </a>
                      <a href="#" className="block text-brown-600 text-sm hover:text-brown-900 transition-colors py-1">
                        → Key Strategies
                      </a>
                      <a href="#" className="block text-brown-600 text-sm hover:text-brown-900 transition-colors py-1">
                        → Best Practices
                      </a>
                      <a href="#" className="block text-brown-600 text-sm hover:text-brown-900 transition-colors py-1">
                        → Conclusion
                      </a>
                    </nav>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ============================================
            RELATED ARTICLES
        ============================================ */}
        <section className="py-16 md:py-20 border-t border-brown-200/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brown-900 mb-3">
                Continue Reading
              </h2>
              <p className="text-brown-500 max-w-lg mx-auto">
                Explore more insights on creator growth and brand collaborations
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            CTA BANNER
        ============================================ */}
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
                Maakeit connects brands with authentic creators. Join thousands of 
                successful partnerships and grow your influence.
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

// ============================================
// SHARE BUTTONS COMPONENT
// ============================================
function ShareButtons() {
  return (
    <div className="flex gap-3">
      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors">
        <Twitter className="w-4 h-4" />
        <span className="text-sm font-medium">Twitter</span>
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors">
        <Linkedin className="w-4 h-4" />
        <span className="text-sm font-medium">LinkedIn</span>
      </button>
      <button className="px-4 py-3 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors">
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

// ============================================
// ARTICLE CONTENT RENDERER
// ============================================
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
    // Headers with proper styling
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
    // Bold text
    .replace(
      /\*\*(.*?)\*\*/gim,
      '<strong class="font-semibold text-brown-800">$1</strong>'
    )
    // Italic text
    .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
    // Links
    .replace(
      /\[(.*?)\]\((.*?)\)/gim,
      '<a href="$2" class="text-brown-700 underline decoration-brown-300 hover:decoration-brown-600 underline-offset-2 transition-colors">$1</a>'
    )
    // Blockquotes
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-gold-400 bg-cream-100 pl-6 py-4 pr-4 my-6 rounded-r-xl text-brown-700 italic">$1</blockquote>'
    )
    // Code blocks (inline)
    .replace(
      /`([^`]+)`/gim,
      '<code class="px-2 py-1 bg-brown-100 text-brown-800 rounded-lg text-sm font-mono">$1</code>'
    )
    // Unordered lists
    .replace(
      /^- (.*$)/gim,
      '<li class="text-brown-700 leading-relaxed pl-2">$1</li>'
    )
    // Ordered lists
    .replace(
      /^\d+\. (.*$)/gim,
      '<li class="text-brown-700 leading-relaxed pl-2">$1</li>'
    )
    // Paragraphs (double newlines)
    .replace(
      /\n\n/gim,
      '</p><p class="text-brown-700 leading-[1.8] mb-6">'
    )
    // Single line breaks
    .replace(/\n/gim, '<br />');

  // Wrap in paragraph
  html = `<p class="text-brown-700 leading-[1.8] mb-6">${html}</p>`;

  // Clean up list items - wrap consecutive li elements in ul
  html = html.replace(/(<li.*?<\/li>\s*)+/g, (match) => {
    return `<ul class="list-disc pl-6 mb-6 space-y-3 marker:text-brown-400">${match}</ul>`;
  });

  // Clean up empty paragraphs
  html = html.replace(/<p class="[^"]*"><\/p>/g, '');

  return html;
}
