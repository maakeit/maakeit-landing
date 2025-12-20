"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BlogCard, CategoryPill } from "@/components/blog";
import type { BlogPost } from "@/components/blog";
import { Search, ChevronDown, Loader2 } from "lucide-react";

const CATEGORIES = [
  "All",
  "Marketing",
  "Creator Tips",
  "Brand Strategy",
  "Social Media",
  "Collaboration",
  "Growth",
];

interface APIBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  author: {
    _id: string;
    name: string;
    slug: string;
    avatar?: string;
  };
}

// Transform API response to BlogPost format
function transformPost(post: APIBlogPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt,
    author: post.author?.name || "Maakeit Team",
    readingTime: post.readingTime,
    image: post.coverImage,
    category: post.category,
  };
}

export default function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/blog/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts?.map(transformPost) || []);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredPost = posts[0];
  const gridPosts = posts;

  // Filter posts based on search and category
  const filteredPosts = gridPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredPosts.length;

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header homePage={false} />
        <main className="min-h-screen bg-brown-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-brown-600 animate-spin mx-auto mb-4" />
            <p className="text-brown-600">Loading articles...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <>
        <Header homePage={false} />
        <main className="min-h-screen bg-brown-50">
          <section className="pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl font-bold text-brown-900 mb-4">
                Blog Coming Soon
              </h1>
              <p className="text-brown-600 text-lg max-w-md mx-auto mb-8">
                We're working on some great content. Check back soon for insights
                on creator economy, brand collaborations, and more.
              </p>
              <Link
                href="/"
                className="inline-flex px-6 py-3 bg-brown-800 text-cream-50 rounded-full font-medium hover:bg-brown-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header homePage={false} />
      <main className="min-h-screen bg-brown-50">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-brown-50 to-brown-100/50" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left - Hero Content */}
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-brown-100 text-brown-700 text-sm font-medium rounded-full mb-6">
                  <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                  Maakeit Blog
                </span>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brown-900 leading-[1.1] mb-6">
                  Stories, Insights &{" "}
                  <span className="text-brown-600">Creator Growth</span>
                </h1>

                <p className="text-lg sm:text-xl text-brown-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  Discover expert insights on brand collaborations, content
                  creation, and growing your influence. Learn from the best in
                  the creator economy.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto lg:mx-0">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-4 bg-cream-50 border border-brown-200 rounded-2xl text-brown-800 placeholder:text-brown-400 focus:outline-none focus:border-brown-400 focus:ring-2 focus:ring-brown-200/50 transition-all"
                  />
                </div>
              </div>

              {/* Right - Featured Post Preview */}
              {featuredPost && (
                <div className="hidden lg:block">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-xl">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.5]"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-brown-900/50 to-brown-900/20" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <CategoryPill
                          category={featuredPost.category || "Featured"}
                          variant="dark"
                          className="mb-4"
                        />
                        <h3 className="font-display text-2xl font-bold text-cream-50 mb-2 line-clamp-2">
                          {featuredPost.title}
                        </h3>
                        <p className="text-cream-100/90 text-sm mb-4 line-clamp-2">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-cream-100/90 text-sm">
                          <span>{featuredPost.author}</span>
                          <span>·</span>
                          <span>{featuredPost.readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Article (Mobile) */}
        {featuredPost && (
          <section className="py-12 md:py-16 lg:hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
              <BlogCard post={featuredPost} variant="featured" />
            </div>
          </section>
        )}

        {/* Category Filters */}
        <section className="py-6 border-y border-brown-200/60 bg-cream-50/50 sticky top-16 z-40 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisiblePosts(6);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? "bg-brown-800 text-cream-50 shadow-warm-sm"
                      : "bg-brown-100/50 text-brown-600 hover:bg-brown-100 hover:text-brown-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brown-900 mb-2">
                  {activeCategory === "All" ? "All Articles" : activeCategory}
                </h2>
                <p className="text-brown-500">
                  {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? "s" : ""}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            </div>

            {displayedPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-brown-400" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brown-800 mb-2">
                  No articles found
                </h3>
                <p className="text-brown-500 max-w-md mx-auto">
                  We couldn&apos;t find any articles matching your search. Try
                  adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 px-6 py-3 bg-brown-800 text-cream-50 rounded-full font-medium hover:bg-brown-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {hasMorePosts && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisiblePosts((prev) => prev + 6)}
                  className="group flex items-center gap-2 px-8 py-4 bg-brown-800 text-cream-50 rounded-full font-medium hover:bg-brown-700 transition-all shadow-warm-md hover:shadow-warm-lg"
                >
                  Load More Articles
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-brown-800 to-brown-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-cream-50/10 text-cream-100 text-sm font-medium rounded-full mb-6">
                Stay Updated
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-50 mb-4">
                Get Creator Insights Delivered
              </h2>
              <p className="text-cream-100/80 text-lg mb-8 max-w-xl mx-auto">
                Join 5,000+ creators and brands getting weekly tips on
                collaborations, content strategy, and growing in the creator
                economy.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-cream-50/10 border border-cream-50/20 rounded-2xl text-cream-50 placeholder:text-cream-100/50 focus:outline-none focus:border-cream-50/40 focus:ring-2 focus:ring-cream-50/10 transition-all"
                />
                <button className="px-8 py-4 bg-cream-50 text-brown-900 rounded-2xl font-semibold hover:bg-cream-100 transition-colors shadow-warm-md whitespace-nowrap">
                  Subscribe
                </button>
              </div>

              <p className="text-cream-100/50 text-sm mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
