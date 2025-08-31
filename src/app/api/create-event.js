// pages/api/create-event.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { google } from "googleapis";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: session.accessToken,
    refresh_token: session.refreshToken,
  });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 min event

    await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: req.body.title || "Sample Event",
        description: "This is a test event created via API",
        start: { dateTime: startTime.toISOString() },
        end: { dateTime: endTime.toISOString() },
      },
    });

    res.status(200).json({ message: "Event created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
}
