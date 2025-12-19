"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CategoryPill } from "./CategoryPill";
import { AuthorBadge } from "./AuthorBadge";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  image: string;
  category?: string;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "horizontal" | "featured";
  className?: string;
}

export function BlogCard({ post, variant = "default", className }: BlogCardProps) {
  if (variant === "featured") {
    return <FeaturedCard post={post} className={className} />;
  }

  if (variant === "horizontal") {
    return <HorizontalCard post={post} className={className} />;
  }

  return <DefaultCard post={post} className={className} />;
}

function DefaultCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group block", className)}>
      <article className="h-full bg-cream-50 rounded-2xl overflow-hidden shadow-warm-sm hover:shadow-warm-md transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.category && (
            <div className="absolute top-4 left-4">
              <CategoryPill category={post.category} variant="light" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-brown-900 mb-3 line-clamp-2 group-hover:text-brown-700 transition-colors">
            {post.title}
          </h3>
          <p className="text-brown-600 text-sm leading-relaxed line-clamp-2 mb-6">
            {post.excerpt}
          </p>
          
          {/* Author */}
          <div className="pt-4 border-t border-brown-100">
            <AuthorBadge
              name={post.author}
              date={post.date}
              readTime={post.readingTime}
              size="sm"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}

function HorizontalCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group block", className)}>
      <article className="flex gap-4 bg-cream-50 rounded-xl p-4 shadow-warm-sm hover:shadow-warm-md transition-all duration-300">
        {/* Image */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {post.category && (
            <CategoryPill category={post.category} size="sm" className="self-start mb-2" />
          )}
          <h3 className="font-display text-base md:text-lg font-semibold text-brown-900 line-clamp-2 group-hover:text-brown-700 transition-colors mb-1">
            {post.title}
          </h3>
          <p className="text-brown-500 text-xs md:text-sm line-clamp-2 hidden md:block">
            {post.excerpt}
          </p>
          <div className="mt-2">
            <AuthorBadge
              name={post.author}
              readTime={post.readingTime}
              size="sm"
              showMeta={true}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}

function FeaturedCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group block", className)}>
      <article className="relative h-full min-h-[480px] md:min-h-[560px] rounded-3xl overflow-hidden shadow-warm-lg hover:shadow-warm-xl transition-all duration-500">
        {/* Background Image - slightly dimmed for text readability */}
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.5]"
          priority
        />
        
        {/* Warm Gradient Overlay - stronger for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-brown-900/50 to-brown-900/20" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          {post.category && (
            <CategoryPill category={post.category} variant="dark" size="md" className="self-start mb-4" />
          )}
          
          <h2 className="font-display text-2xl md:text-4xl font-bold text-cream-50 mb-4 leading-tight">
            {post.title}
          </h2>
          
          <p className="text-cream-100/90 text-base md:text-lg leading-relaxed line-clamp-2 mb-6 max-w-2xl">
            {post.excerpt}
          </p>
          
          <AuthorBadge
            name={post.author}
            date={post.date}
            readTime={post.readingTime}
            size="md"
            variant="light"
          />
        </div>
      </article>
    </Link>
  );
}
