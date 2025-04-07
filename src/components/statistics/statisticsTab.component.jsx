import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import { TasksContext } from "../../contexts/tasks.context";
import { getTasksForThatHour, getTasksForToday } from "../../utils/task.utils";
import { useSwipeable } from "react-swipeable";
import {
  getDayName,
  getNameOfMonth,
  getTodayDate,
  getTodayDay,
  getTodayMonth,
  getTodayYear,
} from "../../utils/date.utils";
import StatisticsTabToday from "./statisticsTabToday.component";
import StatisticsTabMonth from "./statisticsTabMonth.component";
import StatisticsTabWeek from "./statisticsTabWeek.component";
import ComputerTitleCard from "../category-title-card/computer-title-card";

const StatisticsTab = () => {
  const [isDayButtonActive, setIsDayButtonActive] = useState(true);
  const [isWeekButtonActive, setIsWeekButtonActive] = useState(false);
  const [isMonthButtonActive, setIsMonthButtonActive] = useState(false);
  const [calendarHeader, setCalendarHeader] = useState("");
  const [nextMonth, setNextMonth] = useState(0);
  const [nextDay, setNextDay] = useState(0);
  const [nextWeek, setNextWeek] = useState(0);

  const todayDate = getTodayDate();
  const todayMonth = getTodayMonth();
  const todayDay = getTodayDay();
  const todayYear = getTodayYear();
  const nameOfTodayMonth = getNameOfMonth(todayMonth);

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => handleSwiped(eventData),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwiped = (eventData) => {
    if (eventData.velocity > 0.8) {
      if (eventData.dir === "Left") {
        handleLeftSwipe();
      } else {
        handleRightSwipe();
      }
    }
  };

  const handleLeftSwipe = () => {
    if (isDayButtonActive) {
      setIsDayButtonActive(false);
      setIsWeekButtonActive(true);
    }
    if (isWeekButtonActive) {
      setIsWeekButtonActive(false);
      setIsMonthButtonActive(true);
    }
  };

  const handleRightSwipe = () => {
    if (isMonthButtonActive) {
      setIsWeekButtonActive(true);
      setIsMonthButtonActive(false);
    }
    if (isWeekButtonActive) {
      setIsWeekButtonActive(false);
      setIsDayButtonActive(true);
    }
  };

  useEffect(() => {
    if (isDayButtonActive) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
      };
      setCalendarHeader(`${new Date().toLocaleDateString("EN-en", options)}`);
    }
    if (isWeekButtonActive) {
      const startOfTheWeek = new Date();
      const endOfTheWeek = new Date();
      endOfTheWeek.setDate(startOfTheWeek.getDate() + 7);
      setCalendarHeader(`
        ${getDayName(startOfTheWeek)}
        ${startOfTheWeek.getMonth() + 1}
        ${startOfTheWeek.getFullYear()} 
        - 
        ${getDayName(endOfTheWeek)}
        ${endOfTheWeek.getMonth() + 1}
        ${endOfTheWeek.getFullYear()}
        `);
    }
    if (isMonthButtonActive) {
      const startOfTheWeek = new Date();
      const endOfTheWeek = new Date();
      endOfTheWeek.setDate(startOfTheWeek.getDate() + 30);

      setCalendarHeader(`
        ${startOfTheWeek.toLocaleDateString("En-en", { month: "long" })}
        ${startOfTheWeek.getFullYear()} 
        - 
        ${endOfTheWeek.toLocaleDateString("En-en", { month: "long" })}
        ${endOfTheWeek.getFullYear()}
        `);
    }
  }, [isDayButtonActive, isWeekButtonActive, isMonthButtonActive]);

  return (
    <div className="flex flex-col h-full w-full">
      <ComputerTitleCard name={"Statistics"} numberOfNotifictaions={"-"} />

      <div className="flex-1 w-full">
        <div className="flex flex-col items-center w-full">
          <div className="font-semibold text-2xl p-5">
            <p>{calendarHeader}</p>
          </div>

          <div className="bg-gray-600 rounded-lg p-1 mb-6">
            <button
              className={`px-3 py-1 mx-1 bg-bkg rounded-lg transition-all duration-300 text-textcolor ${
                isDayButtonActive
                  ? "bg-DarkerGrayWhite font-semibold transform scale-105"
                  : ""
              }`}
              onClick={() => {
                setIsDayButtonActive(true);
                setIsWeekButtonActive(false);
                setIsMonthButtonActive(false);
              }}
            >
              Day
            </button>
            <button
              className={`px-3 py-1 mx-1 bg-bkg rounded-lg transition-all duration-300 ${
                isWeekButtonActive
                  ? "bg-DarkerGrayWhite font-semibold transform scale-105"
                  : ""
              }`}
              onClick={() => {
                setIsDayButtonActive(false);
                setIsWeekButtonActive(true);
                setIsMonthButtonActive(false);
              }}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 mx-1 rounded-lg bg-bkg transition-all duration-300 ${
                isMonthButtonActive
                  ? "bg-DarkerGrayWhite font-semibold transform scale-105"
                  : "bg-bkg"
              }`}
              onClick={() => {
                setIsDayButtonActive(false);
                setIsWeekButtonActive(false);
                setIsMonthButtonActive(true);
              }}
            >
              Month
            </button>
          </div>

          <div className="w-full min-h-[400px]" {...swipeHandlers}>
            {isDayButtonActive && <StatisticsTabToday />}
            {isWeekButtonActive && <StatisticsTabWeek />}
            {isMonthButtonActive && <StatisticsTabMonth />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
