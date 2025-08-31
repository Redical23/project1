// pages/index.js
"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [eventStatus, setEventStatus] = useState("");

  const createEvent = async () => {
    const res = await fetch("/api/create-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test Event" }),
    });
    const data = await res.json();
    setEventStatus(data.message);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Google Calendar Integration</h1>

      {!session && (
        <button onClick={() => signIn("google")}>
          Connect Google Calendar
        </button>
      )}

      {session && (
        <div>
          <p>Logged in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
          <button onClick={createEvent}>Create Sample Event</button>
          <p>{eventStatus}</p>
        </div>
      )}
    </div>
  );
}
