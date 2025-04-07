import SearchProvider from "@/contexts/search.context";
import { FilterProvider } from "@/contexts/filter.context";
import { UserProvider } from "@/contexts/user.context";
import React from "react";
import { TaskProvider } from "@/contexts/tasks.context";
import ProductivityApp from "@/pages/AppPage/ProductivityApp";
import StickWallProvider from "@/contexts/sticky-wall.context";

const Page = () => {
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
};

export default Page;
