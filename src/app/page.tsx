"use client";

export default function Home() {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth2/callback&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline&prompt=consent`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-2xl font-bold">Rrishi Connect</h1>
      <a
        href={googleAuthUrl}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Connect Google Calendar
      </a>
    </div>
  );
}
