import React, { useContext } from 'react'
import { TasksContext, useTaskContext } from '../contexts/tasks.context'
import { compareDate } from './date.utils';

export const getTasksForToday = (tasks, filter='None') => {
  const tasksForToday = []
  const todayDate = new Date();

  tasks.map((task) => {
    if(compareDate(task.date, todayDate) && 
       task.list == filter) {
      tasksForToday.push(task)
    }
  })
  return tasksForToday;
}

export const getTasksForTommorow = (tasks, filter='None') => {
  const tasksForTommorow = []
    const nextDateOfTheWeek = new Date();
    nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + 1);
    tasks.map((task) => {
      if(compareDate(task.date, nextDateOfTheWeek)
          && task.list == filter) {
        tasksForTommorow.push(task);
      }
    })
    

  return tasksForTommorow
}

export const getTasksForThisWeek = (tasks, filter='None') => {
  const tasksForThisWeek = []
  for(let i = 0; i <= 7; i++) {
    const nextDateOfTheWeek = new Date();
    nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + i);

    tasks.map((task) => {
      if(compareDate(task.date, nextDateOfTheWeek)
         && task.list == filter) {
        tasksForThisWeek.push(task);
      }
    })
    
  }

  return tasksForThisWeek
}

export const getTaskForDate = (tasks, date) => {
  if(date == undefined) {
    return []
  }
  const tasksForThatDate = []
  console.log(date)
  tasks.map((task) => {
    if(compareDate(task.date, date)) {
      tasksForThatDate.push(task)
    }
  })

  return tasksForThatDate;
}
