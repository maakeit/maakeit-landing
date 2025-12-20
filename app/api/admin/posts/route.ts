import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { BlogPost, Author } from "@/models";

// Simple auth check - in production use proper authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "maakeit2024";

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const password = authHeader.replace("Bearer ", "");
  return password === ADMIN_PASSWORD;
}

// GET - List all posts (including drafts) for admin
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const posts = await BlogPost.find()
      .populate("author", "name slug avatar")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST - Create new post
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      authorId,
      status,
      metaTitle,
      metaDescription,
    } = body;

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !coverImage || !category || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    // Verify author exists
    const author = await Author.findById(authorId);
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    // Create new post
    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags: tags || [],
      author: authorId,
      status: status || "draft",
      metaTitle,
      metaDescription,
      ogImage: coverImage,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

// PUT - Update existing post
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // If changing slug, check it doesn't conflict
    if (updateData.slug) {
      const existingPost = await BlogPost.findOne({
        slug: updateData.slug,
        _id: { $ne: id },
      });
      if (existingPost) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const post = await BlogPost.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("author", "name slug avatar");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a post
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
