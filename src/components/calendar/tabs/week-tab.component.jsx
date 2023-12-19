import React, { useContext, useEffect, useState } from 'react';
import { getDates, getDayName } from '../../../utils/date.utils';
import { getTaskForDate } from '../../../utils/task.utils';
import { TasksContext } from '../../../contexts/tasks.context';
import { SearchContext } from '../../../contexts/search.context';
import { TaskFilter } from '../../../contexts/filter.context';
import CalendarTaskCard from '../calendar-task-card-component';

const nameOfWeekToNumber = {
  'Monday': 0,
  'Tuesday': 1,
  'Wednesday': 2,
  'Thursday': 3,
  'Friday': 4,
  'Saturday': 5,
  'Sunday': 6
}

const WeekTab = ({ nextWeekNumber }) => {
  const { state } = useContext(TasksContext);
  const { state: filterState } = useContext(TaskFilter);
  const { state: searchState } = useContext(SearchContext);
  const [taskForDate, setTaskForDate] = useState([]);
  const [reRender, setReRender ] = useState(false);
  const today = new Date();
  const endDateOfTheWeek = new Date();
  endDateOfTheWeek.setDate(endDateOfTheWeek.getDate() + 6);
  const datesBetween = getDates(today, endDateOfTheWeek);

  useEffect(()=>{setReRender(!reRender)},[filterState, searchState])

  return (
    <div className='mt-5'>
      {reRender}
      {datesBetween.map((date) => {
        const tasks = getTaskForDate(state.tasks, date, filterState.listFilter, searchState.search);
        return (
          <div>
            <div className='text-start mx-2'>
              <div className='font-semibold'>{getDayName(date)}</div>
              <div className='rounded-md py-2 px-1 max-h-56 overflow-y-auto border-t-2 border-b-2'>
                {tasks.map((task) => (
                  <div className='my-2'>
                    <CalendarTaskCard taskToRender={task} />
                  </div>
                ))}
            </div>
          </div>
          </div>
        )
      })}
    </div>
  );
}

export default WeekTab;
