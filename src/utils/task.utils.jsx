import React, { useContext } from 'react'
import { TasksContext, useTaskContext } from '../contexts/tasks.context'
import { compareDate } from './date.utils';

export const searchForTasks = (tasks, search) => {
  const results = []
  tasks.filter((task) => {
    if(task.taskName.toLowerCase().includes(search.toLowerCase())) {
      results.push(task);
    }
  })
  return results
}

export const getTasksForToday = (tasks, filter='None', searchContent='') => {
  const tasksForToday = []
  const todayDate = new Date();
  tasks.map((task) => {
    if(compareDate(task.date, todayDate) && 
       task.list == filter) {
      tasksForToday.push(task)
    }
  })
  
  if(searchContent !== '') {
    return searchForTasks(tasksForToday, searchContent);
  }

  return tasksForToday;
}

export const getTasksForTommorow = (tasks, filter='None', searchContent='') => {
  const tasksForTommorow = []
    const nextDateOfTheWeek = new Date();
    nextDateOfTheWeek.setDate(nextDateOfTheWeek.getDate() + 1);
    tasks.map((task) => {
      if(compareDate(task.date, nextDateOfTheWeek)
          && task.list == filter) {
        tasksForTommorow.push(task);
      }
    })
    
    if(searchContent !== '') {
      return searchForTasks(tasksForTommorow, searchContent);
    }

  return tasksForTommorow
}

export const getTasksForThisWeek = (tasks, filter='None', searchContent='') => {
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
  if(searchContent !== '') {
    return searchForTasks(tasksForThisWeek, searchContent);
  }

  return tasksForThisWeek
}

export const getTaskForDate = (tasks, date, filter='None', searchContent='') => {
  if(date === undefined) {
    return []
  }

  const tasksForThatDate = []
  tasks.map((task) => {
    if(compareDate(task.date, date) && task.list == filter) {
      tasksForThatDate.push(task)
    }
  })

  if(searchContent !== '') {
    return searchForTasks(tasksForThatDate, searchContent);
  }

  return tasksForThatDate;
}
