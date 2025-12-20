import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import connectDB from "@/lib/mongodb";
import { Waitlist } from "@/models";
import WaitlistWelcome from "@/emails/WaitlistWelcome";
import CreatorWelcome from "@/emails/CreatorWelcome";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, role } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate name if provided
    if (name !== undefined && typeof name === "string" && name.trim() === "") {
      return NextResponse.json(
        { error: "Name cannot be empty" },
        { status: 400 }
      );
    }

    // Validate role if provided
    if (role !== undefined && !["creator", "brand"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'creator' or 'brand'" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Check if email already exists
    const existingEntry = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existingEntry) {
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    // Create waitlist entry
    const waitlistEntry = await Waitlist.create({
      email: email.toLowerCase(),
      name: name?.trim(),
      role,
      source: "website",
    });

    // Send welcome email via Resend based on role
    try {
      const isCreator = role === "creator";
      const emailSubject = isCreator
        ? "Welcome to Maakeit, Creator!"
        : "You're on the Maakeit Waitlist";

      const emailComponent = isCreator
        ? CreatorWelcome({ name: name || undefined })
        : WaitlistWelcome({ name: name || undefined });

      const { data, error: sendError } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "marketing@maakeit.com",
        to: email,
        subject: emailSubject,
        react: emailComponent,
      });

      if (sendError) {
        console.error("Resend error:", JSON.stringify(sendError, null, 2));
        console.log("Email failed but waitlist entry saved for:", email);
      } else {
        console.log(
          "New waitlist signup:",
          email,
          "Name:",
          name,
          "Role:",
          role,
          "Email ID:",
          data?.id
        );
      }
    } catch (emailError) {
      console.error("Email send exception:", emailError);
      // Don't fail the request if email fails - user is still on waitlist
    }

    return NextResponse.json(
      { success: true, message: "Successfully joined waitlist", email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist signup error:", error);
    
    // Handle MongoDB duplicate key error
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

// GET - Fetch waitlist entries (admin only)
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const limit = parseInt(searchParams.get("limit") || "100");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build query
    const query: Record<string, unknown> = {};
    if (role && ["creator", "brand"].includes(role)) {
      query.role = role;
    }

    const [entries, total] = await Promise.all([
      Waitlist.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Waitlist.countDocuments(query),
    ]);

    return NextResponse.json({
      entries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        total: await Waitlist.countDocuments(),
        creators: await Waitlist.countDocuments({ role: "creator" }),
        brands: await Waitlist.countDocuments({ role: "brand" }),
      },
    });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist" },
      { status: 500 }
    );
  }
}
