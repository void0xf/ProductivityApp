import React, { useEffect, useState } from 'react'
import { getNameOfMonth, getTodayDate, getTodayDay, getTodayMonth, getTodayYear } from '../../utils/date.utils'
import TodayTab from './tabs/today-tab.component'
import WeekTab from './tabs/week-tab.component'
import MonthTab from './tabs/month-tab.component'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function incrementDate(date, day=false, month=false, year=false) {

}

const Calendar = () => {
  const [isDayButtonActive, setIsDayButtonActive] = useState(true)
  const [isWeekButtonActive, setIsWeekButtonActive] = useState(false)
  const [isMonthButtonActive, setIsMonthButtonActive] = useState(false)
  const [calendarHeader, setCalendarHeader] = useState('')
  const [nextMonth, setNextMonth] = useState(0)
  const [nextDay, setNextDay] = useState(0)
  const [nextWeek, setNextWeek] = useState(0)
  
  const todayDate = getTodayDate();
  const todayMonth = getTodayMonth();
  const todayDay = getTodayDay();
  const todayYear = getTodayYear();
  const nameOfTodayMonth = getNameOfMonth(todayMonth);

  const handleLeftArrowClick = () => {
    if(isDayButtonActive) {
      setNextDay((prev) => prev-1)
    }
    if(isWeekButtonActive) {
      setNextWeek((prev) => prev-1)
    }
    if(isMonthButtonActive) {
      setNextMonth((prev) => prev-1)
    }
  }
  
  const handleRightArrowClick = () => {
    if(isDayButtonActive) {
      setNextDay((prev) => prev+1)
    }
    if(isWeekButtonActive) {
      setNextWeek((prev) => prev+1)
    }
    if(isMonthButtonActive) {
      setNextMonth((prev) => prev+1)
    }
  }

  useEffect(() => {
      if(isDayButtonActive) {

        setCalendarHeader(`${todayDay + nextDay} ${nameOfTodayMonth} ${todayYear}`)
      }
      if(isWeekButtonActive) {
        setCalendarHeader(``)
      }
      if(isMonthButtonActive) {

      }
  }, [isDayButtonActive, isWeekButtonActive, isMonthButtonActive, nextDay, nextMonth, nextWeek])

  return (
    <div className='items-center align-baseline text-center'>
      <div className='font-semibold text-2xl p-5'><p>{calendarHeader}</p></div>
      <div className='flex flex-col items-center'>
       
        <div className='bg-GrayWhite rounded-lg p-1'>
          <button 
            className={`px-3 py-1 mx-1 bg-white rounded-lg ${isDayButtonActive ? 'bg-DarkerGrayWhite font-semibold' : ''}`}
            onClick={() => {
              setIsDayButtonActive(true); setIsWeekButtonActive(false); setIsMonthButtonActive(false);
            }}>
              Day
          </button>
          <button 
            className={`px-3 py-1 mx-1 bg-white rounded-lg ${isWeekButtonActive ? 'bg-DarkerGrayWhite font-semibold' : ''}`}
            onClick={() => {
              setIsDayButtonActive(false); setIsWeekButtonActive(true); setIsMonthButtonActive(false);
            }}>
            Week
          </button>
          <button 
            className={`px-3 py-1 mx-1 rounded-lg ${isMonthButtonActive ? 'bg-DarkerGrayWhite font-semibold ' : 'bg-white'}`}
            onClick={() => {
              setIsDayButtonActive(false); setIsWeekButtonActive(false); setIsMonthButtonActive(true);
          }}>
            Month
          </button>
        </div>
        <div className='hidden'>
          <button 
            onClick={() => {handleLeftArrowClick()}}
          >
            <ChevronLeft />
            </button>
          <button
            onClick={() => {handleRightArrowClick()}}
          >
            <ChevronRight />
            </button>
        </div>
      </div>

      {
        isDayButtonActive ? <TodayTab nextDayNumber={nextDay} /> : null
      }
      {
        isWeekButtonActive ? <WeekTab nextMonthNumber={nextWeek}/> : null
      }
      {
        isMonthButtonActive ? <MonthTab nextMonthNumber={ nextMonth }/> : null
      }


    </div>
  )
}





export default Calendar

