"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BlogCard, CategoryPill } from "@/components/blog";
import type { BlogPost } from "@/components/blog";
import { Search, ChevronDown } from "lucide-react";

// ============================================
// MOCK DATA - Replace with real data in production
// ============================================
const mockPosts: BlogPost[] = [
  {
    slug: "ugc-marketing-guide",
    title: "The Ultimate UGC Marketing Guide for Brands in 2025",
    excerpt: "Discover how user-generated content can transform your marketing strategy and drive authentic engagement with your audience.",
    date: "2024-12-15",
    author: "Sarah Chen",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    category: "Marketing",
  },
  {
    slug: "creator-pricing-strategies",
    title: "Creator Pricing Strategies That Actually Work",
    excerpt: "Set the right rates for your content and maximize your earning potential as a creator. Learn from industry experts.",
    date: "2024-12-12",
    author: "James Wilson",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Creator Tips",
  },
  {
    slug: "brand-collaboration-tips",
    title: "10 Tips for Successful Brand Collaborations",
    excerpt: "Master the art of brand partnerships and create content that resonates with audiences and drives results.",
    date: "2024-12-10",
    author: "Emily Rodriguez",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    category: "Collaboration",
  },
  {
    slug: "content-creation-workflow",
    title: "Streamlining Your Content Creation Workflow",
    excerpt: "Optimize your creative process with proven systems that save time and boost quality for consistent output.",
    date: "2024-12-08",
    author: "Alex Thompson",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    category: "Creator Tips",
  },
  {
    slug: "social-media-trends-2025",
    title: "Social Media Trends to Watch in 2025",
    excerpt: "Stay ahead of the curve with these emerging trends shaping the future of social media marketing.",
    date: "2024-12-05",
    author: "Maakeit Team",
    readingTime: "10 min read",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
    category: "Social Media",
  },
  {
    slug: "building-creator-portfolio",
    title: "Building a Portfolio That Brands Can't Ignore",
    excerpt: "Create a compelling creator portfolio that showcases your unique value and attracts premium brand deals.",
    date: "2024-12-02",
    author: "Maya Johnson",
    readingTime: "9 min read",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop",
    category: "Growth",
  },
  {
    slug: "negotiating-brand-deals",
    title: "How to Negotiate Brand Deals Like a Pro",
    excerpt: "Learn the negotiation tactics that top creators use to secure better rates and favorable contract terms.",
    date: "2024-11-28",
    author: "David Park",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    category: "Brand Strategy",
  },
  {
    slug: "authentic-content-creation",
    title: "The Art of Creating Authentic Content",
    excerpt: "Why authenticity matters more than ever and how to maintain your voice while working with brands.",
    date: "2024-11-25",
    author: "Lisa Chen",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop",
    category: "Creator Tips",
  },
];

const categories = ["All", "Marketing", "Creator Tips", "Brand Strategy", "Social Media", "Collaboration", "Growth"];

// ============================================
// MAIN CLIENT COMPONENT
// ============================================
export default function BlogPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);

  const featuredPost = mockPosts[0];
  const gridPosts = mockPosts.slice(1);

  // Filter posts based on search and category
  const filteredPosts = gridPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredPosts.length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brown-50">
        {/* ============================================
            HERO SECTION
        ============================================ */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          {/* Background Gradient */}
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
                  Discover expert insights on brand collaborations, content creation, 
                  and growing your influence. Learn from the best in the creator economy.
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
              <div className="hidden lg:block">
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-xl">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-[0.65]"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-brown-900/50 to-brown-900/20" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <CategoryPill category={featuredPost.category || "Featured"} variant="dark" className="mb-4" />
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
            </div>
          </div>
        </section>

        {/* ============================================
            FEATURED ARTICLE (Mobile + Desktop)
        ============================================ */}
        <section className="py-12 md:py-16 lg:hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <BlogCard post={featuredPost} variant="featured" />
          </div>
        </section>

        {/* ============================================
            CATEGORY FILTERS
        ============================================ */}
        <section className="py-6 border-y border-brown-200/60 bg-cream-50/50 sticky top-16 z-40 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
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

        {/* ============================================
            BLOG GRID
        ============================================ */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brown-900 mb-2">
                  {activeCategory === "All" ? "All Articles" : activeCategory}
                </h2>
                <p className="text-brown-500">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} 
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            </div>

            {/* Grid */}
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
                  We couldn&apos;t find any articles matching your search. 
                  Try adjusting your filters or search terms.
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

            {/* Load More */}
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

        {/* ============================================
            NEWSLETTER CTA
        ============================================ */}
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
                Join 5,000+ creators and brands getting weekly tips on collaborations, 
                content strategy, and growing in the creator economy.
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
