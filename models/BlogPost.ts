import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: mongoose.Types.ObjectId;
  status: "draft" | "published";
  publishedAt?: Date;
  readingTime: string;
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  // Analytics
  views: number;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Marketing",
        "Creator Tips",
        "Brand Strategy",
        "Social Media",
        "Collaboration",
        "Growth",
        "Getting Started",
        "News",
      ],
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author is required"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
    },
    readingTime: {
      type: String,
      default: "5 min read",
    },
    // SEO fields
    metaTitle: {
      type: String,
      maxlength: [60, "Meta title cannot exceed 60 characters"],
    },
    metaDescription: {
      type: String,
      maxlength: [160, "Meta description cannot exceed 160 characters"],
    },
    ogImage: {
      type: String,
    },
    // Analytics
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate reading time before save
BlogPostSchema.pre("save", function () {
  if (this.isModified("content")) {
    const wordsPerMinute = 200;
    const words = this.content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    this.readingTime = `${minutes} min read`;
  }

  // Set publishedAt when first published
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Set meta fields from content if not provided
  if (!this.metaTitle) {
    this.metaTitle = this.title.slice(0, 60);
  }
  if (!this.metaDescription) {
    this.metaDescription = this.excerpt.slice(0, 160);
  }
  if (!this.ogImage) {
    this.ogImage = this.coverImage;
  }
});

// Index for efficient queries
BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ author: 1 });

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPosts || mongoose.model<IBlogPost>("BlogPosts", BlogPostSchema);

export default BlogPost;
