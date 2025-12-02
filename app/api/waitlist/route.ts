import { NextResponse } from "next/server";

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

    // TODO: Integrate with your database/email service
    // Example integrations:
    // - Save to Supabase
    // - Send to email marketing service (Mailchimp, ConvertKit, etc.)
    // - Save to a JSON file
    // - Send notification email

    console.log("New waitlist signup:", email);

    // Simulate successful submission
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

