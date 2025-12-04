import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";
import WaitlistWelcome from "@/emails/WaitlistWelcome";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Store email in Supabase before sending
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert([{ email }]);

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

    // Send welcome email via Resend
    const { data, error: sendError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "marketing@maakeit.com",
      to: email,
      subject: "You're on the Maakeit Waitlist 🎉",
      react: WaitlistWelcome({}),
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      console.log("Email failed but waitlist entry saved for:", email);
    } else {
      console.log("New waitlist signup:", email, "Email ID:", data?.id);
    }

    return NextResponse.json(
      { message: "Successfully joined waitlist", email },
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
