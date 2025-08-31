// src/app/page.tsx
"use client";

import Image from "next/image";

export default function Home() {
const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + "/api/oauth2/callback")}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline&prompt=consent`;


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Connect Your Google Calendar
        </h1>
        <p className="text-center sm:text-left text-sm text-gray-600 dark:text-gray-400">
          Click the button below to securely connect your Google Calendar. After
          connecting, you can start creating events directly from WhatsApp.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-12 px-6"
            href={googleAuthUrl}
          >
            Connect Google Calendar
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
        © 2025 Rrishi Connect
      </footer>
    </div>
  );
}
