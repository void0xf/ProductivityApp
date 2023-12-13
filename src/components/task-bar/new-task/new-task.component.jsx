import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTaskContext } from '../../../contexts/tasks.context';
import { User, Briefcase } from 'lucide-react';

function getIcon(type) {
  const icons = {
    'Personal': User,
    'Work': Briefcase

  };
  const IconComponent = icons[type];
  return IconComponent ? <IconComponent size={15}/> : null;
}

const NewTask = ({ taskId, task }) => {
  const { state, dispatch } = useTaskContext();
  const taskTitle = task.taskName;
  const [IconComponent, setIconComponent] = useState(null);

  const handleOpenTaskTab = (taskId) => {
    dispatch({ type: 'OPEN_TASK_TAB', payload: taskId });
  };

  useEffect(() => {
    if (task.list !== 'None') {
      const icon = getIcon(task.list);
      setIconComponent(icon);
    } else {
      setIconComponent(null);
    }
  }, [task.list]);

  return (
    <li>
      <div className='container flex flex-row border-b-2 justify-between min-w-40'>
        <div className='flex flex-row'>
          <div className='p-2'>
          </div>
          <div className='p-2 flex flex-col m-24'>
            <span className='text-gray-700 font-semibold'>{taskTitle}</span>
            {IconComponent !== null ? (
              <div className='flex items-baseline rounded-md border-2 mx-1 px-2'>
                <div className='inline pr-2'>
                  {IconComponent}
                </div>
                <div className='inline pr-2'>
                  {task.list}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className='p-2'>
          <button onClick={() => { handleOpenTaskTab(taskId) }}><ChevronRight color='grey' /></button>
        </div>
      </div>
    </li>
  );
}

export default NewTask;
