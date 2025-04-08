"use client";
import ComputerSidebar from "@/components/sidebar/computer-sidebar.component";
import MobileSidebar from "@/components/sidebar/mobile-sidebar.component";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { width } = useWindowSize();
  return (
    <div className="flex min-h-screen">
      <aside className="h-screen lg:max-w-64">
        {width > 768 ? <ComputerSidebar /> : <MobileSidebar IconSize={24} />}
      </aside>
      <main className="h-screen lg:w-2/4 mx-auto">{children}</main>
    </div>
  );
}
