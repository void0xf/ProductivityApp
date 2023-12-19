import { User, Briefcase } from 'lucide-react';
import React from 'react';
import { getIconComponentFromListName } from '../../utils/icon.utils';
import { getDifferenceBetweenTwoDates, gettimeDifferenceToDisplay } from '../../utils/date.utils';

const CalendarTaskCard = ({ taskToRender }) => {
  const ListIcon = getIconComponentFromListName(taskToRender.list);
  const timeDifference = getDifferenceBetweenTwoDates(taskToRender.date, new Date())
  const timeDifferenceToDisplay = gettimeDifferenceToDisplay(timeDifference);

  return (
    <div className="flex items-center border rounded-lg p-4 shadow-md bg-white">
      <div className="w-2 h-24 bg-slate-400 rounded-md mr-4"></div>
      <div className="text-left">
        <p className="font-semibold text-lg">{taskToRender.taskName}</p>
        <div className='flex'>
          {
            taskToRender.list === 'None' 
            ?
            null
            :
            <div className='flex items-baseline'>
              <div className=""><ListIcon size={15}/></div>
              <div className='text-sm'>{taskToRender.list}</div>
            </div>
          }
        </div>
        <div className='flex items-baseline'>
          <div className="text-sm text-gray-500">
            {/* {`${taskToRender.date.getHours()}:${taskToRender.date.getMinutes()}`} */}
            {`${taskToRender.date.toLocaleTimeString('PL-pl').split(':')[0]}:${taskToRender.date.toLocaleTimeString('PL-pl').split(':')[1]}`}
          </div>
          <div className=" text-xs font-semibold">({timeDifferenceToDisplay})</div>
        </div>
        <div className="flex items-center mt-2">
        </div>
      </div>
    </div>
  );
};

export default CalendarTaskCard;
