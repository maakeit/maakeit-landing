"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, FileText, Trash2 } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
}

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  
  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Maakeit Team");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Simple password check (use env variable in production)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "maakeit2024";

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setMessage({ type: "error", text: "Invalid password" });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          author,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Blog post saved successfully!" });
        setTitle("");
        setSlug("");
        setExcerpt("");
        setContent("");
        fetchPosts();
        setActiveTab("list");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save post" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save post" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/posts?slug=${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Post deleted successfully" });
        fetchPosts();
      } else {
        setMessage({ type: "error", text: "Failed to delete post" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete post" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-beige-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-brown-lg p-8">
            <h1 className="text-2xl font-bold text-brown-900 mb-6 text-center">
              Admin Login
            </h1>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none mb-4"
              />
              <button
                type="submit"
                className="w-full bg-brown-800 text-white py-3 rounded-xl hover:bg-brown-900 transition-colors font-medium"
              >
                Login
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-center ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-brown-600 hover:text-brown-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Link>
            <h1 className="text-2xl font-bold text-brown-900">Blog Admin</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "list"
                  ? "bg-brown-800 text-white"
                  : "bg-white text-brown-700 hover:bg-brown-100"
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Posts
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "create"
                  ? "bg-brown-800 text-white"
                  : "bg-white text-brown-700 hover:bg-brown-100"
              }`}
            >
              + New Post
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {activeTab === "list" ? (
          /* Posts List */
          <div className="bg-white rounded-2xl shadow-brown-md p-6">
            <h2 className="text-xl font-semibold text-brown-900 mb-6">
              All Posts ({posts.length})
            </h2>
            {posts.length === 0 ? (
              <p className="text-brown-500 text-center py-8">
                No posts yet. Create your first post!
              </p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="flex items-center justify-between p-4 bg-beige-50 rounded-xl"
                  >
                    <div>
                      <h3 className="font-medium text-brown-900">{post.title}</h3>
                      <p className="text-sm text-brown-500">
                        {post.date} • {post.author}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-brown-600 hover:text-brown-900 hover:bg-brown-100 rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Create Post Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-brown-md p-6">
              <h2 className="text-xl font-semibold text-brown-900 mb-6">
                Create New Post
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none"
                    placeholder="post-url-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    required
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none resize-none"
                    placeholder="Brief description of the post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">
                    Content * (Markdown supported)
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={15}
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none font-mono text-sm"
                    placeholder="Write your blog post content here...

# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- List item 1
- List item 2

[Link text](https://example.com)"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className="px-6 py-3 rounded-xl border border-brown-200 text-brown-700 hover:bg-brown-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brown-800 text-white hover:bg-brown-900 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save Post"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

