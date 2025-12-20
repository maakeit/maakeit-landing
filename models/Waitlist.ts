import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWaitlist extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  name?: string;
  role?: "creator" | "brand";
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    name: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["creator", "brand"],
    },
    source: {
      type: String,
      default: "website",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
WaitlistSchema.index({ createdAt: -1 });
WaitlistSchema.index({ role: 1 });

const Waitlist: Model<IWaitlist> =
  mongoose.models.Waitlist || mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);

export default Waitlist;
