import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  readingTime: string;
  image?: string;
  category?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  readingTime: string;
  image?: string;
  category?: string;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Parse frontmatter manually without external dependency
function parseFrontmatter(fileContents: string): { data: Record<string, string>; content: string } {
  const frontmatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)/);
  
  if (!frontmatterMatch) {
    return { data: {}, content: fileContents };
  }

  const frontmatterStr = frontmatterMatch[1];
  const content = frontmatterMatch[2] || "";
  
  const data: Record<string, string> = {};
  const lines = frontmatterStr.split("\n");
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
    if (match) {
      data[match[1]] = match[2];
    }
  }

  return { data, content };
}

export function getAllPosts(): BlogPostMeta[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = parseFrontmatter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        author: data.author || "Maakeit Team",
        excerpt: data.excerpt || content.slice(0, 150) + "...",
        readingTime: calculateReadingTime(content),
        image: data.image,
        category: data.category,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);

  let fullPath = "";
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseFrontmatter(fileContents);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    author: data.author || "Maakeit Team",
    excerpt: data.excerpt || content.slice(0, 150) + "...",
    content,
    readingTime: calculateReadingTime(content),
    image: data.image,
    category: data.category,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.mdx?$/, ""));
}
