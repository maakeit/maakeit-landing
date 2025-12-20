import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Author, BlogPost } from "@/models";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET - Fetch author by slug with their posts
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { slug } = await params;

    const author = await Author.findOne({ slug }).lean();

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    // Get author's published posts
    const posts = await BlogPost.find({
      author: author._id,
      status: "published",
    })
      .select("title slug excerpt coverImage category publishedAt readingTime")
      .sort({ publishedAt: -1 })
      .lean();

    return NextResponse.json({ author, posts });
  } catch (error) {
    console.error("Error fetching author:", error);
    return NextResponse.json(
      { error: "Failed to fetch author" },
      { status: 500 }
    );
  }
}
