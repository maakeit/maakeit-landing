"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Trash2,
  Plus,
  Users,
  Edit,
  X,
  Image as ImageIcon,
} from "lucide-react";

interface Author {
  _id: string;
  name: string;
  slug: string;
  bio: string;
  avatar?: string;
  role: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  status: "draft" | "published";
  publishedAt?: string;
  readingTime: string;
  createdAt: string;
}

const CATEGORIES = [
  "Marketing",
  "Creator Tips",
  "Brand Strategy",
  "Social Media",
  "Collaboration",
  "Growth",
  "Getting Started",
  "News",
];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&h=600&fit=crop",
];

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "create" | "authors" | "edit">("posts");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Post form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "Marketing",
    tags: "",
    authorId: "",
    status: "draft" as "draft" | "published",
    metaTitle: "",
    metaDescription: "",
  });

  // Author form state
  const [authorForm, setAuthorForm] = useState({
    name: "",
    bio: "",
    avatar: "",
    role: "Contributor",
    email: "",
    twitter: "",
    linkedin: "",
    website: "",
  });
  const [showAuthorModal, setShowAuthorModal] = useState(false);

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
      fetchAuthors();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const res = await fetch("/api/admin/authors");
      if (res.ok) {
        const data = await res.json();
        setAuthors(data.authors || []);
        if (data.authors?.length > 0 && !formData.authorId) {
          setFormData((prev) => ({ ...prev, authorId: data.authors[0]._id }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch authors:", error);
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
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug === generateSlug(prev.title) ? generateSlug(value) : prev.slug,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "Marketing",
      tags: "",
      authorId: authors[0]?._id || "",
      status: "draft",
      metaTitle: "",
      metaDescription: "",
    });
    setEditingPost(null);
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const endpoint = "/api/admin/posts";
      const method = editingPost ? "PUT" : "POST";

      const payload = {
        ...(editingPost && { id: editingPost._id }),
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage,
        category: formData.category,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        authorId: formData.authorId,
        status: formData.status,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
      };

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingPost ? "Post updated successfully!" : "Post created successfully!",
        });
        resetForm();
        fetchPosts();
        setActiveTab("posts");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save post" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save post" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      category: post.category,
      tags: post.tags?.join(", ") || "",
      authorId: post.author?._id || "",
      status: post.status,
      metaTitle: "",
      metaDescription: "",
    });
    setEditingPost(post);
    setActiveTab("edit");
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });

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

  const handleSubmitAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: authorForm.name,
          bio: authorForm.bio,
          avatar: authorForm.avatar,
          role: authorForm.role,
          email: authorForm.email,
          social: {
            twitter: authorForm.twitter,
            linkedin: authorForm.linkedin,
            website: authorForm.website,
          },
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Author created successfully!" });
        setShowAuthorModal(false);
        setAuthorForm({
          name: "",
          bio: "",
          avatar: "",
          role: "Contributor",
          email: "",
          twitter: "",
          linkedin: "",
          website: "",
        });
        fetchAuthors();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to create author" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create author" });
    } finally {
      setIsLoading(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brown-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-cream-50 rounded-2xl shadow-warm-lg p-8">
            <h1 className="text-2xl font-bold text-brown-900 mb-6 text-center">
              Blog Admin
            </h1>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none mb-4 bg-white"
              />
              <button
                type="submit"
                className="w-full bg-brown-800 text-cream-50 py-3 rounded-xl hover:bg-brown-900 transition-colors font-medium"
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
    <div className="min-h-screen bg-brown-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-brown-600 hover:text-brown-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Link>
            <h1 className="text-2xl font-bold text-brown-900">Blog Admin</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { resetForm(); setActiveTab("posts"); }}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === "posts" ? "bg-brown-800 text-cream-50" : "bg-cream-50 text-brown-700 hover:bg-brown-100"
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Posts
            </button>
            <button
              onClick={() => { resetForm(); setActiveTab("create"); }}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === "create" ? "bg-brown-800 text-cream-50" : "bg-cream-50 text-brown-700 hover:bg-brown-100"
              }`}
            >
              <Plus className="h-4 w-4 inline mr-2" />
              New Post
            </button>
            <button
              onClick={() => setActiveTab("authors")}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === "authors" ? "bg-brown-800 text-cream-50" : "bg-cream-50 text-brown-700 hover:bg-brown-100"
              }`}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Authors
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {message.text}
          </div>
        )}

        {/* Posts List */}
        {activeTab === "posts" && (
          <div className="bg-cream-50 rounded-2xl shadow-warm-md p-6">
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
                  <div key={post._id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-brown-100">
                    {post.coverImage && (
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-brown-900 truncate">{post.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          post.status === "published" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="text-sm text-brown-500">
                        {post.category} • {post.author?.name || "Unknown"} • {post.readingTime}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="p-2 text-brown-600 hover:text-brown-900 hover:bg-brown-100 rounded-lg"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-brown-600 hover:text-brown-900 hover:bg-brown-100 rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post._id)}
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
        )}

        {/* Create/Edit Post Form */}
        {(activeTab === "create" || activeTab === "edit") && (
          <form onSubmit={handleSubmitPost} className="space-y-6">
            <div className="bg-cream-50 rounded-2xl shadow-warm-md p-6">
              <h2 className="text-xl font-semibold text-brown-900 mb-6">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                      placeholder="post-url-slug"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Excerpt *</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                      required
                      rows={3}
                      maxLength={300}
                      className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none resize-none bg-white"
                      placeholder="Brief description (max 300 chars)"
                    />
                    <p className="text-xs text-brown-400 mt-1">{formData.excerpt.length}/300</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as "draft" | "published" }))}
                        className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Author *</label>
                    <select
                      value={formData.authorId}
                      onChange={(e) => setFormData((prev) => ({ ...prev, authorId: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                    >
                      <option value="">Select an author</option>
                      {authors.map((author) => (
                        <option key={author._id} value={author._id}>{author.name} ({author.role})</option>
                      ))}
                    </select>
                    {authors.length === 0 && (
                      <p className="text-xs text-amber-600 mt-1">
                        No authors yet. <button type="button" onClick={() => setShowAuthorModal(true)} className="underline">Create one</button>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                      placeholder="ugc, marketing, creators"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Cover Image URL *</label>
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                      placeholder="https://..."
                    />
                    {formData.coverImage && (
                      <div className="mt-2 relative aspect-video rounded-xl overflow-hidden">
                        <Image src={formData.coverImage} alt="Cover preview" fill className="object-cover" />
                      </div>
                    )}
                    <div className="mt-2">
                      <p className="text-xs text-brown-500 mb-2">Or choose a sample image:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {SAMPLE_IMAGES.map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, coverImage: img }))}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                              formData.coverImage === img ? "border-brown-600" : "border-transparent hover:border-brown-300"
                            }`}
                          >
                            <Image src={img} alt={`Sample ${i + 1}`} fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-brown-700 mb-2">Content * (Markdown supported)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  required
                  rows={20}
                  className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none font-mono text-sm bg-white"
                  placeholder={`Write your blog post content here...

# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

> Blockquote for important callouts

- List item 1
- List item 2

[Link text](https://example.com)`}
                />
              </div>

              {/* SEO Fields */}
              <div className="mt-6 p-4 bg-brown-50 rounded-xl">
                <h3 className="font-medium text-brown-800 mb-4">SEO Settings (Optional)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                      maxLength={60}
                      className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                      placeholder="Custom meta title (max 60 chars)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Meta Description</label>
                    <input
                      type="text"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                      maxLength={160}
                      className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                      placeholder="Custom meta description (max 160 chars)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => { resetForm(); setActiveTab("posts"); }}
                className="px-6 py-3 rounded-xl border border-brown-200 text-brown-700 hover:bg-brown-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brown-800 text-cream-50 hover:bg-brown-900 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
              </button>
            </div>
          </form>
        )}

        {/* Authors List */}
        {activeTab === "authors" && (
          <div className="bg-cream-50 rounded-2xl shadow-warm-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-brown-900">Authors ({authors.length})</h2>
              <button
                onClick={() => setShowAuthorModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-brown-800 text-cream-50 rounded-xl hover:bg-brown-900 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Author
              </button>
            </div>

            {authors.length === 0 ? (
              <p className="text-brown-500 text-center py-8">
                No authors yet. Add your first author to start creating posts!
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {authors.map((author) => (
                  <div key={author._id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-brown-100">
                    <div className="w-12 h-12 rounded-full bg-brown-200 flex items-center justify-center text-brown-700 font-semibold">
                      {author.avatar ? (
                        <Image src={author.avatar} alt={author.name} width={48} height={48} className="rounded-full object-cover" />
                      ) : (
                        author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-brown-900">{author.name}</h3>
                      <p className="text-sm text-brown-500">{author.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Author Modal */}
        {showAuthorModal && (
          <div className="fixed inset-0 bg-brown-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-cream-50 rounded-2xl shadow-warm-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-brown-900">Add New Author</h2>
                <button onClick={() => setShowAuthorModal(false)} className="p-2 hover:bg-brown-100 rounded-lg">
                  <X className="h-5 w-5 text-brown-600" />
                </button>
              </div>

              <form onSubmit={handleSubmitAuthor} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={authorForm.name}
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Role</label>
                  <input
                    type="text"
                    value={authorForm.role}
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                    placeholder="e.g., Content Strategist, Founder"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Bio *</label>
                  <textarea
                    value={authorForm.bio}
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, bio: e.target.value }))}
                    required
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none resize-none bg-white"
                    placeholder="Short bio (max 500 chars)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Avatar URL</label>
                  <input
                    type="url"
                    value={authorForm.avatar}
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, avatar: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={authorForm.email}
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 outline-none bg-white"
                    placeholder="author@example.com"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Twitter</label>
                    <input
                      type="text"
                      value={authorForm.twitter}
                      onChange={(e) => setAuthorForm((prev) => ({ ...prev, twitter: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-brown-200 focus:border-brown-500 outline-none bg-white text-sm"
                      placeholder="@handle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">LinkedIn</label>
                    <input
                      type="text"
                      value={authorForm.linkedin}
                      onChange={(e) => setAuthorForm((prev) => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-brown-200 focus:border-brown-500 outline-none bg-white text-sm"
                      placeholder="URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Website</label>
                    <input
                      type="text"
                      value={authorForm.website}
                      onChange={(e) => setAuthorForm((prev) => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-brown-200 focus:border-brown-500 outline-none bg-white text-sm"
                      placeholder="URL"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAuthorModal(false)}
                    className="px-4 py-2 rounded-xl border border-brown-200 text-brown-700 hover:bg-brown-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl bg-brown-800 text-cream-50 hover:bg-brown-900 disabled:opacity-50"
                  >
                    {isLoading ? "Creating..." : "Create Author"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
