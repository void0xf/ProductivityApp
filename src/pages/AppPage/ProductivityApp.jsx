"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { TasksContext } from "../../contexts/tasks.context";
import { TaskFilter } from "../../contexts/filter.context";
import { UserContext } from "../../contexts/user.context";
import { StickyWallContext } from "../../contexts/sticky-wall.context";
import { firebaseConfig } from "../../firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { addDataToFirebase } from "../../firebase/firestore";
import {
  synchonizeCompletedTasks,
  synchonizeNotes,
  synchonizeTasks,
  synchronizeLists,
} from "../../utils/task.utils";
import { handleResizeWindow } from "../../utils/other.utils";
import { handleCheckNOD } from "../../utils/user.utils";
import Upcoming from "../../components/upcomingTasks/upcoming.component";
import SettingCard from "../../components/setting/setting-card.component";
import MobileSidebar from "../../components/sidebar/mobile-sidebar.component";
import ComputerSidebar from "../../components/sidebar/computer-sidebar.component";
import SidebarContext from "../../contexts/sidebar.context";
import TodayTasks from "../../components/todayTasks/today-Tasks.component";
import TaskInfoBar from "../../components/task-info-bar/task-info-bar.component";
import LateTasks from "../../components/lateTasks/LateTasks.component";
import Calendar from "../../components/calendar/calendar.component";
import StatisticsTab from "../../components/statistics/statisticsTab.component";
import SidebarArrow from "../../components/sidebar/sidebarArrow.component";
import { useAuthState } from "react-firebase-hooks/auth";
import StickWall from "../../components/sticky-wall/stick-wall.component";
import { CircularProgress } from "@mui/material";
import LoadingScreen from "../../components/Loading/LoadingScreen";

const ProductivityApp = () => {
  // Use optional chaining to prevent errors when contexts aren't available
  const tasksContext = useContext(TasksContext);
  const filterContext = useContext(TaskFilter);
  const stickyWallContext = useContext(StickyWallContext);
  const userContext = useContext(UserContext);

  // Safely extract state and dispatch
  const state = tasksContext?.state || {
    tasks: [],
    completedTask: [],
    lists: [],
    isTaskTabOpen: false,
  };
  const dispatch = tasksContext?.dispatch || (() => {});
  const filterState = filterContext?.state || { filter: "Today" };
  const stickyWallState = stickyWallContext?.state || { StickyNote: [] };
  const dispatchNotes = stickyWallContext?.dispatch || (() => {});
  const userState = userContext?.state || {
    isSettingsCardOpen: false,
    NOD: false,
  };

  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedFirstTime, setIsLoggedFirstTime] = useState(true);
  const [loading, setLoading] = useState(true);

  // Firebase setup (only in browser)
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [firestore, setFirestore] = useState(null);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize Firebase only on the client side
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const authInstance = getAuth(app);

    setFirebaseApp(app);
    setFirestore(db);
    setAuth(authInstance);

    // We'll handle auth state manually
    return authInstance.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (user && !isLoggedFirstTime && firestore) {
      const uid = user.uid;
      addDataToFirebase(
        firestore,
        uid,
        state.tasks,
        state.completedTask,
        stickyWallState.StickyNote,
        state.lists
      );
    }
  }, [
    state.tasks,
    state.completedTask,
    stickyWallState,
    state.lists,
    user,
    isLoggedFirstTime,
    firestore,
  ]);

  useEffect(() => {
    if (user && isLoggedFirstTime && firestore) {
      const uid = user.uid;
      const synchronize = async () => {
        try {
          const resSynchonizeTasks = await synchonizeTasks(
            firestore,
            uid,
            dispatch
          );
          const resSynchronizeCompletedTasks = await synchonizeCompletedTasks(
            firestore,
            uid,
            dispatch
          );
          const resSynchronzieNotes = await synchonizeNotes(
            firestore,
            uid,
            dispatchNotes
          );
          const resSynchronizeLists = await synchronizeLists(
            firestore,
            uid,
            dispatch
          );
          if (
            resSynchonizeTasks === "Success" &&
            resSynchronizeCompletedTasks === "Success" &&
            resSynchronzieNotes === "Success" &&
            resSynchronizeLists === "Success"
          ) {
            setIsLoggedFirstTime(false);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error synchronizing data:", error);
          setLoading(false);
        }
      };
      synchronize();
    }
  }, [user, isLoggedFirstTime, firestore, dispatch, dispatchNotes]);

  const handleWindowResize = (width) => {
    if (width > 640) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        handleWindowResize(window.innerWidth);
      });
      handleWindowResize(window.innerWidth);

      return () => {
        window.removeEventListener("resize", () => {
          handleWindowResize(window.innerWidth);
        });
      };
    }
  }, []);

  useEffect(() => {
    if (userState.NOD && typeof window !== "undefined") {
      handleCheckNOD(state.tasks);
    }
  }, [userState.NOD, state.tasks]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`app-container bg-bkg text-textcolor font-sans ${
        isSideBarActive ? "overflow-auto" : ""
      } ${!isMobile ? "flex" : ""}`}
    >
      {userState.isSettingsCardOpen ? (
        <SettingCard isMobile={isMobile} />
      ) : null}

      <SidebarContext.Provider
        value={{ isSideBarActive, setIsSideBarActive, isMobile }}
      >
        <div className={`${userState.isSettingsCardOpen ? "blur-[6px]" : ""}`}>
          {isMobile ? <MobileSidebar /> : <ComputerSidebar />}
        </div>
      </SidebarContext.Provider>

      {!isMobile ? (
        <SidebarArrow
          isSideBarActive={isSideBarActive}
          setIsSideBarActive={setIsSideBarActive}
        />
      ) : null}

      <div className="relative h-screen w-full p-2 z-10 mx-auto max-w-3xl">
        <div
          className={`${
            state.isTaskTabOpen ||
            (isSideBarActive && isMobile) ||
            userState.isSettingsCardOpen
              ? "absolute blur-[22px]"
              : ""
          }
          ${isSideBarActive ? "" : ""}`}
        >
          {filterState.filter === "Upcoming" && <Upcoming />}
          {filterState.filter === "Today" && <TodayTasks />}
          {filterState.filter === "Calendar" && <Calendar />}
          {filterState.filter === "Notes" && <StickWall />}
          {filterState.filter === "Statistics" && <StatisticsTab />}
          {filterState.filter === "Late" && <LateTasks />}
        </div>

        <div
          className={`transition-transform duration-700 z-50 
            ${
              state.isTaskTabOpen
                ? "transform opacity-100 h-screen"
                : "absolute -translate-y-full transform opacity-0"
            }
            `}
        >
          {state.isTaskTabOpen && <TaskInfoBar />}
        </div>
      </div>
    </div>
  );
};

export default ProductivityApp;
