import React, { useEffect, useRef, useState } from 'react';
import { useTaskContext } from '../../contexts/tasks.context';
import { X } from 'lucide-react';

const TaskInfoBar = () => {
  const { state, dispatch } = useTaskContext();
  const [newDescription, setDescription] = useState('');
  const [newTaskName, setTaskName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newList, setNewList] = useState('');
  const taskNameRef = useRef();
  const descRef = useRef();
  const listRef = useRef();

  const activeTask = state.tasks.find((task) => task.id === state.activeTaskId);
  const today = new Date();

  const { taskName = '', description = '', date = '', listName = '' } = activeTask || {};
  useEffect(() => {
    setNewDate(new Date(date).toISOString().slice(0, 10));
    setNewTime(`${new Date(date).getHours()}:${new Date(date).getMinutes()}`);
    setDescription(description);
    setTaskName(taskName);
    setNewList(listName);
  }, [date, description, taskName]);

  const handleOnDeleteTaskClick = () => {
    if (activeTask) {
      dispatch({ type: 'REMOVE_TASK_ID', payload: activeTask.id });
      dispatch({ type: 'CLOSE_TASK_TAB', payload: '' });
    }
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleListChange = (event) => {
    const selectedValue = event.target.value;
    listRef.current.value = selectedValue;
    setNewList(event.target.value);
  };

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setNewTime(event.target.value);
  };

  const handleCloseTaskInfo = () => {
    dispatch({ type: 'CLOSE_TASK_TAB', payload: '' });
  };

  if (!activeTask) {
    return <div className='mr-10'>No active task selected</div>;
  }

  const handleSaveChangesClick = () => {
    const dateTime = new Date(newDate + 'T' + newTime + ':00');
    dispatch({
      type: 'UPDATE_TASK_ID',
      payload: {
        id: activeTask.id,
        taskName: taskNameRef.current.value,
        description: descRef.current.value,
        date: dateTime,
        list: listRef.current.value,
      },
    });
    dispatch({ type: 'CLOSE_TASK_TAB', payload: '' });
  };

  return (
    <div className='border-2 rounded-xl p-2 flex flex-col justify-between sm:mx-2'>
      <div>
        <div className='flex justify-between items-center'>
          <span className='text-2xl text-gray-700'> Task: </span>
          <button onClick={() => handleCloseTaskInfo()}><X /></button>
        </div>

        <div>
          <input
            type="text"
            value={newTaskName}
            placeholder={'Type your name for this Task'}
            onChange={handleTaskNameChange}
            ref={taskNameRef}
            className='border rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40 py-2 px-1 my-1'
          />
        </div>
        <div>
          <input
            type="text"
            value={newDescription}
            placeholder={description === '' ? 'Type Your Description Here' : description}
            onChange={handleDescriptionChange}
            ref={descRef}
            className='border rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40 pb-32 px-1 my-1'
          />
        </div>

        <div className='flex flex-col mt-5'>
          <div className='flex'>
            <div className='mr-5'>List: </div>
            <div>
              {
                <select name="" id="" onChange={handleListChange} ref={listRef} value={newList} className=' bg-inherit'>
                  <option value='None'>None</option>
                  {state.lists.map((listName) => (
                    <option value={listName.name}>{listName.name}</option>
                  ))}
                </select>
              }
            </div>
          </div>

          <div className='flex'>
            <div className='mr-2'> <p>Date: </p> </div>
            <div>
              <input
                type="date"
                value={newDate}
                onChange={handleDateChange}
                min={today.toISOString().slice(0, 10)}
                className=' bg-inherit'
              />
            </div>
          </div>

          <div className='flex'>
            <div className='mr-2'> <p>Time: </p> </div>
            <div>
              <input
                type="time"
                value={newTime}
                onChange={handleTimeChange}
                className=' bg-inherit'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between mb-2 mt-5'>
        <div>
          <button
            className='py-2 px-2 border-2 rounded-lg border-gray-200 font-semibold'
            onClick={handleOnDeleteTaskClick}>
            Delete Task
          </button>
        </div>
        <div>
          <button
            className='py-2 px-2 rounded-lg  bg-[#778DA9] font-semibold'
            onClick={handleSaveChangesClick}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default TaskInfoBar;
