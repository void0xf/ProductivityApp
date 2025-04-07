"use client";

import { createContext, ReactNode } from "react";

interface SidebarContextType {
  // Add sidebar context properties here when needed
  [key: string]: any;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default SidebarContext;
