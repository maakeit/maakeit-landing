import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";
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

    // Build the insert object with optional name and role
    const insertData: { email: string; name?: string; role?: string } = { email };
    if (name) insertData.name = name.trim();
    if (role) insertData.role = role;

    // Store in Supabase - try with all fields first, fallback to email-only if columns don't exist
    let dbError = null;
    
    // First try with all fields
    const { error: fullInsertError } = await supabase
      .from("waitlist")
      .insert([insertData]);

    if (fullInsertError) {
      // If column doesn't exist (PGRST204), fallback to email-only insert
      if (fullInsertError.code === "PGRST204") {
        console.log("Name/role columns not found, falling back to email-only insert");
        const { error: emailOnlyError } = await supabase
          .from("waitlist")
          .insert([{ email }]);
        dbError = emailOnlyError;
      } else {
        dbError = fullInsertError;
      }
    }

    if (dbError) {
      // Check if it's a duplicate email error
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist" },
          { status: 409 }
        );
      }
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save to waitlist" },
        { status: 500 }
      );
    }

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
        console.log("New waitlist signup:", email, "Name:", name, "Role:", role, "Email ID:", data?.id);
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
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
