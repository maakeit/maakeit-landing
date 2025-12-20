import { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import { BlogPost, Author } from "@/models";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://maakeit.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    await connectDB();

    // Fetch all published blog posts
    const posts = await BlogPost.find({ status: "published" })
      .select("slug publishedAt updatedAt")
      .sort({ publishedAt: -1 })
      .lean();

    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Fetch all authors
    const authors = await Author.find()
      .select("slug updatedAt")
      .lean();

    const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
      url: `${baseUrl}/authors/${author.slug}`,
      lastModified: author.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...blogPages, ...authorPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return at least static pages if database fails
    return staticPages;
  }
}
