"use client";

import React, { useContext, useState, createContext } from "react";
import { TasksContext } from "../../contexts/tasks.context";
import { TaskFilter } from "../../contexts/filter.context";
import {
  CalendarDays,
  ChevronsRight,
  CircleDot,
  ListChecks,
  User,
  Briefcase,
  Menu,
  Search,
  StickyNote,
  LineChart,
  X,
  Edit,
  CalendarClock,
} from "lucide-react";
import {
  getLateTasks,
  getTasksForThisWeek,
  getTasksForToday,
} from "../../utils/task.utils";
import AddNewList from "./input/addNewList.component";
import SearchTask from "./searchTask.component";
import Sidebar from "./sidebar.component";
import { SidebarItem } from "./sidebar-item.component";
import { StickyWallContext } from "../../contexts/sticky-wall.context";
import { SearchContext } from "../../contexts/search.context";
import SidebarContext from "../../contexts/sidebar.context";

const componentMap = {
  Personal: User,
  Work: Briefcase,
};

const MobileSidebar = ({ IconSize }) => {
  const SIZE_OF_SIDEBAR_ICONS = IconSize;
  const { state, dispatch } = useContext(TasksContext);
  const { state: filterState } = useContext(TaskFilter);
  const { state: StickyWallState } = useContext(StickyWallContext);
  const { state: searchState } = useContext(SearchContext);
  const todayTasksCount = getTasksForToday(
    state.tasks,
    filterState.filterList
  ).length;
  const { isSideBarActive, setIsSideBarActive } = useContext(SidebarContext);
  const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(false);
  const handleListDelete = (name) => {
    dispatch({ type: "REMOVE_LIST", payload: name });
  };

  return (
    <div>
      <div className="">
        <div
          className={` max-w-min absolute z-30 z transform transition-transform duration-700 h-screen ${
            !isSideBarActive ? "-translate-x-full absolute z-30" : ""
          }`}
        >
          <Sidebar>
            <SearchTask />
            <div>
              <p className="text-sm font-semibold ml-3">Tasks</p>
            </div>
            <SidebarItem
              icon={
                <ChevronsRight size={SIZE_OF_SIDEBAR_ICONS} strokeWidth={3} />
              }
              text="Upcoming"
              alert
              numberOfAlerts={
                getTasksForThisWeek(
                  state.tasks,
                  filterState.listFilter,
                  searchState.search
                ).length
              }
              clickType={"Upcoming"}
              payload={"Upcoming"}
            />
            <SidebarItem
              icon={<ListChecks size={SIZE_OF_SIDEBAR_ICONS} alert />}
              text="Today"
              alert
              clickType={"Today"}
              payload={"Today"}
              numberOfAlerts={todayTasksCount}
            />
            <SidebarItem
              icon={<CalendarClock size={SIZE_OF_SIDEBAR_ICONS} alert />}
              text="Late"
              alert
              clickType={"Late"}
              payload={"Late"}
              numberOfAlerts={
                getLateTasks(
                  state.tasks,
                  filterState.listFilter,
                  searchState.search
                ).length
              }
            />
            <SidebarItem
              icon={<LineChart size={SIZE_OF_SIDEBAR_ICONS} alert />}
              text="Statistics"
              alert
              clickType={"Statistics"}
              payload={"Statistics"}
            />
            <SidebarItem
              icon={<CalendarDays size={SIZE_OF_SIDEBAR_ICONS} />}
              text="Calendar"
              alert
              clickType={"Calendar"}
              payload={"Calendar"}
            />
            <SidebarItem
              icon={<StickyNote size={SIZE_OF_SIDEBAR_ICONS} />}
              text="Notes"
              clickType={"Notes"}
              payload={"Notes"}
            />
            <div className="border-t-2 border-b-2 border-bordercolor my-4 py-2 max-h-64 overflow-y-scroll">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold ml-3">Lists</p>
                <button
                  onClick={() => {
                    setIsDeleteButtonActive(!isDeleteButtonActive);
                  }}
                >
                  <p className="mr-2">
                    <Edit size={20} />
                  </p>
                </button>
              </div>
              {state.lists.map((listItem) => {
                const IconComponent = componentMap[listItem.name];
                return (
                  <div className="flex justify-between items-baseline">
                    <SidebarItem
                      icon={
                        IconComponent ? (
                          <IconComponent size={SIZE_OF_SIDEBAR_ICONS} />
                        ) : (
                          <CircleDot size={SIZE_OF_SIDEBAR_ICONS} />
                        )
                      }
                      text={listItem.name}
                      clickType={"list"}
                      payload={listItem.name}
                      active={filterState.listFilter == listItem.name ? 1 : 0}
                    />
                    <div
                      className={`relative mr-2 transition-opacity duration-600 ${
                        isDeleteButtonActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {isDeleteButtonActive &&
                      listItem.name != "Personal" &&
                      listItem.name != "Work" ? (
                        <button
                          onClick={() => {
                            handleListDelete(listItem.name);
                          }}
                        >
                          <p>
                            <X size={SIZE_OF_SIDEBAR_ICONS} />
                          </p>
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              <AddNewList />
            </div>
          </Sidebar>
        </div>
      </div>

      <div
        className={`sm:hidden
      ${
        !isSideBarActive
          ? "sticky z-30 transform transition-transform duration-700 translate-y-0 top-0"
          : "-translate-y-full transform transition-transform duration-700"
      } pl-2 pt-2 flex justify-between border-b-2 pb-3 bg-bkg border-bordercolor absolute w-full`}
      >
        <button
          onClick={() => {
            setIsSideBarActive(true);
          }}
        >
          <Menu />
        </button>
        <div className="sm:hidden">
          {filterState.filter !== "" ? (
            <>
              <span className="text-xl pr-5 font-semibold">
                {filterState.filter}
              </span>
              <span className="p-1 px-2 text-base border-2 rounded-lg bg-bkg border-bordercolor">
                {filterState.filter == "Upcoming"
                  ? getTasksForThisWeek(
                      state.tasks,
                      filterState.listFilter,
                      searchState.search
                    ).length
                  : filterState.filter == "Today"
                  ? todayTasksCount
                  : filterState.filter == "Notes"
                  ? StickyWallState.StickyNote.length
                  : filterState.filter == "Late"
                  ? getLateTasks(
                      state.tasks,
                      filterState.listFilter,
                      searchState.search
                    ).length
                  : ""}
              </span>
            </>
          ) : null}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MobileSidebar;
