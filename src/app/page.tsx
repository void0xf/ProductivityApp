"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center bg-bkg text-textcolor">
      <h1 className="text-4xl font-bold mb-4 font-sans">Productivity App</h1>
      <p className="text-lg mb-12 max-w-md">
        Manage your tasks, track your time, and boost your productivity
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => router.push("/auth")}
          className="px-6 py-3 rounded-md bg-acent text-white font-medium transition-all hover:opacity-90"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push("/app")}
          className="px-6 py-3 rounded-md border-2 border-bordercolor bg-transparent text-textcolor font-medium transition-all hover:bg-bordercolor/10"
        >
          View App
        </button>
      </div>
    </div>
  );
}
