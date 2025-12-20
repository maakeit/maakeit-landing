import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/models";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET - Fetch single blog post by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { slug } = await params;

    const post = await BlogPost.findOne({ slug, status: "published" })
      .populate("author", "name slug avatar bio role social")
      .lean();

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment view count (fire and forget)
    BlogPost.updateOne({ slug }, { $inc: { views: 1 } }).exec();

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
