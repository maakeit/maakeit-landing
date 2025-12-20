import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/models";

// GET - Fetch related blog posts
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "3");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Find related posts by category, excluding current post
    const query: Record<string, unknown> = {
      slug: { $ne: slug },
      status: "published",
    };

    if (category) {
      query.category = category;
    }

    const relatedPosts = await BlogPost.find(query)
      .populate("author", "name slug avatar")
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ posts: relatedPosts });
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch related posts" },
      { status: 500 }
    );
  }
}
