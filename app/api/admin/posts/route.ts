import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/posts");

// Simple auth check
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "maakeit2024";

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// GET - List all posts
export async function GET() {
  try {
    ensurePostsDirectory();

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Parse frontmatter manually
        const frontmatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) {
          return { slug, title: slug, date: "", author: "", excerpt: "" };
        }

        const frontmatter = frontmatterMatch[1];
        const title = frontmatter.match(/title:\s*"(.*)"/)?.[1] || slug;
        const date = frontmatter.match(/date:\s*"(.*)"/)?.[1] || "";
        const author = frontmatter.match(/author:\s*"(.*)"/)?.[1] || "";
        const excerpt = frontmatter.match(/excerpt:\s*"(.*)"/)?.[1] || "";

        return { slug, title, date, author, excerpt };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST - Create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, author, date } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    ensurePostsDirectory();

    // Check if post already exists
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    // Create MDX content with frontmatter
    const mdxContent = `---
title: "${title}"
date: "${date || new Date().toISOString().split("T")[0]}"
author: "${author || "Maakeit Team"}"
excerpt: "${excerpt || ""}"
---

${content}
`;

    fs.writeFileSync(filePath, mdxContent, "utf8");

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

// DELETE - Delete a post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);

    if (fs.existsSync(mdxPath)) {
      fs.unlinkSync(mdxPath);
    } else if (fs.existsSync(mdPath)) {
      fs.unlinkSync(mdPath);
    } else {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

