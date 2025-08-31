// src/app/api/google-oauth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" });
  }

  const client_id = process.env.GOOGLE_CLIENT_ID!;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirect_uri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-oauth/callback`;

  const params = new URLSearchParams({
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: "authorization_code",
  });

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await tokenResponse.json();
  console.log("Google tokens:", data);

  return NextResponse.redirect(new URL("/sc", req.url));
}
