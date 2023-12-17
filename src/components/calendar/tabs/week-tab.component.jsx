import React, { useContext, useEffect, useState } from 'react';
import { getDates, getDayName } from '../../../utils/date.utils';
import { getTaskForDate } from '../../../utils/task.utils';
import { TasksContext } from '../../../contexts/tasks.context';
import { SearchContext } from '../../../contexts/search.context';
import { TaskFilter } from '../../../contexts/filter.context';

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
        const tasks = getTaskForDate(state.tasks, date, filterState.filterState, searchState.search);
        return (
          <div>
            <div className='text-start mx-2'>
              <div className='font-semibold'>{getDayName(date)}</div>
              <div className=' rounded-md my-2 py-2 px-1 max-h-56 overflow-y-auto'>
                {tasks.map((task) => (
                  <div className='bg-[#D8D9DA] rounded-lg my-2 px-2 pb-5 flex flex-col'>
                    <p className='font-semibold'>{task.taskName}</p>
                    <p className='font-nomral'>{task.description}</p>
                    <p className='pt-2'>{task.date.getHours()}:{task.date.getMinutes()}</p>
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
