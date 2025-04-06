"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductivityApp from "./pages/AppPage/ProductivityApp";
import Authentication from "./pages/AuthPage/Authentication";

function App() {
  // This component is now largely unnecessary with Next.js App Router
  // Page routing is handled by the directory structure in the /app folder
  return (
    <div>
      {/* 
        With Next.js, routing is handled by the file system:
        - /app/page.tsx renders the home page
        - /app/auth/page.tsx renders the Authentication component
        - /app/app/page.tsx renders the ProductivityApp component
      */}
    </div>
  );
}

export default App;
