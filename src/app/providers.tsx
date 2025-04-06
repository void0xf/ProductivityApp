"use client";

import React from "react";
import { TaskProvider } from "../contexts/tasks.context";
import { FilterProvider } from "../contexts/filter.context";
import StickWallProvider from "../contexts/sticky-wall.context";
import SearchProvider from "../contexts/search.context";
import { UserProvider } from "../contexts/user.context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <FilterProvider>
        <StickWallProvider>
          <TaskProvider>
            <SearchProvider>{children}</SearchProvider>
          </TaskProvider>
        </StickWallProvider>
      </FilterProvider>
    </UserProvider>
  );
}
