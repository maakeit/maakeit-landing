import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { BlogPost } from "@/models";

// GET - Fetch all published blog posts
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build query
    const query: Record<string, unknown> = { status: "published" };
    if (category && category !== "All") {
      query.category = category;
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .populate("author", "name slug avatar role")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
