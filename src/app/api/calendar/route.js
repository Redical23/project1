import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const { summary, startDateTime, endDateTime } = req.body;

  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          start: { dateTime: startDateTime },
          end: { dateTime: endDateTime },
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
