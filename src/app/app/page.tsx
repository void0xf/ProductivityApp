"use client";

import React from "react";
import ProductivityApp from "../../pages/AppPage/ProductivityApp";
import { TaskProvider } from "../../contexts/tasks.context";
import { FilterProvider } from "../../contexts/filter.context";
import StickWallProvider from "../../contexts/sticky-wall.context";
import { UserProvider } from "../../contexts/user.context";
import SearchProvider from "../../contexts/search.context";

export default function AppPage() {
  return (
    <UserProvider>
      <FilterProvider>
        <StickWallProvider>
          <TaskProvider>
            <SearchProvider>
              <ProductivityApp />
            </SearchProvider>
          </TaskProvider>
        </StickWallProvider>
      </FilterProvider>
    </UserProvider>
  );
}
