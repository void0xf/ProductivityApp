import React, { useContext } from 'react'
import { TasksContext, useTaskContext } from '../contexts/tasks.context'
import { compareDate } from './date.utils';

export const getTasksForToday = (tasks) => {
  const tasksForToday = []
  const todayDate = new Date();

  tasks.map((task) => {
    if(compareDate(task.date, todayDate)) {
      tasksForToday.push(task)
    }
  })
  return tasksForToday;
}

export const getTasksForTommorow = (tasks) => {
  const tasksForTommorow = []
    const nextDateOfTheWeek = new Date();
    nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + 1);
    tasks.map((task) => {
      if(compareDate(task.date, nextDateOfTheWeek)) {
        tasksForTommorow.push(task);
      }
    })
    

  return tasksForTommorow
}

export const getTasksForThisWeek = (tasks) => {
  const tasksForThisWeek = []
  for(let i = 0; i <= 7; i++) {
    const nextDateOfTheWeek = new Date();
    nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + i);

    tasks.map((task) => {
      if(compareDate(task.date, nextDateOfTheWeek)) {
        tasksForThisWeek.push(task);
      }
    })
    
  }

  return tasksForThisWeek
}

export const getTaskForDate = (tasks, date) => {
  const tasksForThatDate = []
  tasks.map((task) => {
    if(compareDate(task.date, date)) {
      tasksForThatDate.push(task)
    }
  })

  return tasksForThatDate;
}
