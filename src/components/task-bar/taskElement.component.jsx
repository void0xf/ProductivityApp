import React, { useState, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Check, ChevronRight, Trash } from 'lucide-react';
import { TasksContext } from '../../contexts/tasks.context';
import { useSpring, animated } from 'react-spring';

const TaskElement = ({ id, taskName }) => {
  const { dispatch } = useContext(TasksContext);
  const [isChecked, setIsChecked] = useState(false);
  const ANIMATION_DURATION = 300;
  const [offsetX, setOffsetX] = useState(0);
  const MAX_OFFSET_X = 30;
  const TRASH_THRESHOLD = 50;

  const offsetXSpring = useSpring({
    from: { translateX: -150 },
    to: { translateX: offsetX },
    config: { tension: 300, friction: 15 },
  });

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => handleSwiping(eventData),
    onSwiped: (eventData) => handleSwiped(eventData),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    config: {delta: 200},
  });

  const handleDeleteTask = () => {
    setIsChecked(true);
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TASK_ID', payload: id });
    }, ANIMATION_DURATION);
  };

  const handleTaskDone = () => {
    setIsChecked(true);
    setTimeout(() => {
      dispatch({ type: 'MARK_TASK_AS_DONE', payload: id });
    }, ANIMATION_DURATION);
  }

  const handleSwiping = (eventData) => {
    setOffsetX(eventData.deltaX);
  };

  const handleSwiped = () => {
    if(offsetX < -TRASH_THRESHOLD) {
      handleDeleteTask();
    }

    if (offsetX > MAX_OFFSET_X) {
      handleTaskDone() //ToDo make TaskDone;
    }
    if(offsetX < -MAX_OFFSET_X) {
      setOffsetX(-MAX_OFFSET_X - 300);
    }
  };

  const handleOpenTaskTab = (taskId) => {
    dispatch({ type: 'OPEN_TASK_TAB', payload: taskId });
  };

  return (
    <animated.div
      {...swipeHandlers}
      className=
      {`relative flex justify-between border-b-2 py-2 rounded-md transition-opacity duration-${ANIMATION_DURATION} 
      ${
        isChecked ? 'opacity-0' : 'opacity-100'
      }
      ${offsetX < -TRASH_THRESHOLD ? 'bg-red-400' : 'bg-white-400'}
      `}

      style={{
        transform: offsetXSpring.translateX.to((x) => `translateX(${x}px)`),
        cursor: 'grab',
        transition: 'opacity 1.3s ease',
      }}
    >
      <div className='flex items-center z-50'>
        <div className='px-2'>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={() => {
                handleDeleteTask();
              }}
              className="hidden"
            />
            <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center bg-white">
              {isChecked && <Check />}
            </div>
          </label>
        </div>
        <div className='flex flex-col'>
          <div>
            <p>{taskName}</p>
          </div>
        </div>
      </div>
      <div>
      </div>
      {offsetX < -TRASH_THRESHOLD 
      ? 
      (
        <div className='bg-red-400 rounded-lg'>
          <Trash />
        </div>
      )
      :
      (
        <button className='p-2 transition' onClick={() => handleOpenTaskTab(id)}>
        <ChevronRight />
        </button>
      )
      }
    </animated.div>
  );
};

export default TaskElement;
