import { Briefcase, CalendarClock, ChevronRight, User } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { TasksContext } from '../contexts/tasks.context';
import { isDateOlder } from '../utils/date.utils';

function getIcon(type) {
  const icons = {
    'Personal': User,
    'Work': Briefcase
  };
  const IconComponent = icons[type];
  return IconComponent ? <IconComponent size={15}/> : null;
}

const TaskElement = ({ id, taskName, listName, date }) => {
  const { dispatch } = useContext(TasksContext);
  const [IconComponent, setIconComponent] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const ANIMATION_DURATION = 300

  const handleCheckedTask = () => {
    setIsChecked(true);
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TASK_ID', payload: id });
    }, ANIMATION_DURATION);
  }

  useEffect(() => {
    if (listName !== 'None') {
      const icon = getIcon(listName);
      setIconComponent(icon);
    } else {
      setIconComponent(null);
    }
  }, [listName]);

  const handleOpenTaskTab = (taskId) => {
    dispatch({ type: 'OPEN_TASK_TAB', payload: taskId });
  };

  return (
    <div
      className={`flex justify-between border-b-2 py-2 rounded-md transition-opacity duration-${ANIMATION_DURATION} ${
        isChecked ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className='flex items-center'>
        <div className='px-2'>
          <input
            type="checkbox"
            onChange={() => {
              handleCheckedTask();
            }}
          />
        </div>
        <div className='flex flex-col'>
          <div>
            <p>{taskName}</p>
          </div>
          {IconComponent !== null ? (
            <div className='flex items-baseline rounded-md border-2 px-2'>
              <div className='inline pr-2'>{IconComponent}</div>
              <div className='inline pr-2'>{listName}</div>
            </div>
          ) : (
            <div></div>
          )}
          {
            isDateOlder(date) ? 
            (
              <div className='flex items-baseline rounded-md border-2 px-2'>
              <div className='inline pr-2'><CalendarClock size={17}/></div>
              <div className='inline pr-2 text-sm'>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</div>
            </div>
            )
            : <div></div>
          }
        </div>
      </div>
      <button className='p-2' onClick={() => { handleOpenTaskTab(id) }}>
        <ChevronRight />
      </button>
    </div>
  );
}

export default TaskElement;
