import { Briefcase, CalendarClock, Check, ChevronRight, User } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { TasksContext } from '../../contexts/tasks.context';
import { isDateOlder } from '../../utils/date.utils';

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
  const ANIMATION_DURATION = 700

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
      className={`flex justify-between border-b-2 py-2 rounded-md transition-opacity duration-
      ${ANIMATION_DURATION} 
      ${isChecked ? 'opacity-0' : 'opacity-100'}`}>
      <div className='flex items-center  z-50'>
        <div className='px-2'>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={() => {handleCheckedTask()}}
              className="hidden"
            />
            <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center bg-white">
              {isChecked && (<Check />)}
            </div>
          </label>
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
            null
          )}
          {
            isDateOlder(date) ? 
            (
              <div className='flex items-baseline rounded-md border-2 px-2'>
              <div className='inline pr-2'><CalendarClock size={17}/></div>
              <div className='inline pr-2 text-sm'>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</div>
            </div>
            )
            : null
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
