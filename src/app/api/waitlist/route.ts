import { NextResponse } from "next/server";

import { config } from "@/lib/config";
import { getResendClient } from "@/lib/resend";

interface WaitlistPayload {
  email: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parsePayload(value: unknown): WaitlistPayload | null {
  if (!isObjectRecord(value)) {
    return null;
  }

  const maybeEmail = value.email;
  if (typeof maybeEmail !== "string") {
    return null;
  }

  const normalizedEmail = maybeEmail.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return null;
  }

  return { email: normalizedEmail };
}

function getSenderDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "example.com";
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!config.integrations.resendApiKey || !config.integrations.resendAudienceId) {
    return NextResponse.json({ error: "Waitlist integration is not configured" }, { status: 503 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const resend = getResendClient();

  try {
    const contactResult = await resend.contacts.create({
      email: payload.email,
      audienceId: config.integrations.resendAudienceId,
      unsubscribed: false
    });

    if (contactResult.error) {
      console.error("Failed to add waitlist contact:", contactResult.error);
      return NextResponse.json({ error: "Could not add contact to waitlist" }, { status: 500 });
    }

    const senderDomain = getSenderDomain(config.meta.url);
    const subject = `You're on the ${config.meta.title} waitlist`;
    const text =
      `Thanks for joining the ${config.meta.title} waitlist. ` +
      "We will email you as soon as early access opens for your team.\n\n" +
      `- The ${config.meta.title} team`;

    const emailResult = await resend.emails.send({
      from: `noreply@${senderDomain}`,
      to: payload.email,
      subject,
      text
    });

    if (emailResult.error) {
      console.error("Failed to send waitlist confirmation email:", emailResult.error);
      return NextResponse.json({ error: "Could not send confirmation email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected waitlist API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
