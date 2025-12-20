import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuthor extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  email?: string;
  bio: string;
  avatar?: string;
  role: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Author slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    bio: {
      type: String,
      required: [true, "Author bio is required"],
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "Contributor",
    },
    social: {
      twitter: String,
      linkedin: String,
      website: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from name if not provided
AuthorSchema.pre("save", function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

const Author: Model<IAuthor> =
  mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);

export default Author;
