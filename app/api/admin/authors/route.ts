import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Author } from "@/models";

// GET - List all authors
export async function GET() {
  try {
    await connectDB();

    const authors = await Author.find().sort({ name: 1 }).lean();

    return NextResponse.json({ authors });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}

// POST - Create new author
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, slug, email, bio, avatar, role, social } = body;

    // Validate required fields
    if (!name || !bio) {
      return NextResponse.json(
        { error: "Name and bio are required" },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const authorSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    // Check if slug already exists
    const existingAuthor = await Author.findOne({ slug: authorSlug });
    if (existingAuthor) {
      return NextResponse.json(
        { error: "An author with this slug already exists" },
        { status: 409 }
      );
    }

    // Create new author
    const author = await Author.create({
      name,
      slug: authorSlug,
      email,
      bio,
      avatar: avatar || "",
      role: role || "Contributor",
      social: social || {},
    });

    return NextResponse.json({ success: true, author }, { status: 201 });
  } catch (error) {
    console.error("Error creating author:", error);
    return NextResponse.json(
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}

// PUT - Update existing author
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Author ID is required" }, { status: 400 });
    }

    // If changing slug, check it doesn't conflict
    if (updateData.slug) {
      const existingAuthor = await Author.findOne({
        slug: updateData.slug,
        _id: { $ne: id },
      });
      if (existingAuthor) {
        return NextResponse.json(
          { error: "An author with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const author = await Author.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, author });
  } catch (error) {
    console.error("Error updating author:", error);
    return NextResponse.json(
      { error: "Failed to update author" },
      { status: 500 }
    );
  }
}

// DELETE - Delete an author
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Author ID is required" }, { status: 400 });
    }

    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting author:", error);
    return NextResponse.json(
      { error: "Failed to delete author" },
      { status: 500 }
    );
  }
}
