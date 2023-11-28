import React, { useEffect, useRef, useState } from 'react'
import { useTaskContext } from '../../contexts/tasks.context';

const TaskInfoBar = () => {
  const { state, dispatch } = useTaskContext();
  const [ newDescription, setDescription] = useState('');
  const [ newTaskName, setTaskName] = useState('');
  const [ newDate, setNewDate] = useState('');
  const taskNameRef = useRef();
  const descRef = useRef();
  const listRef = useRef();
  const dateRef = useRef();

  const activeTask = state.tasks.find((task) => task.id === state.activeTaskId);

  const { taskName = '', description = '', date='' } = activeTask || {};

  useEffect(()=>{
    setNewDate(date);
  }, [date])

  const handleOnDeleteTaskClick = () => {
    if (activeTask) {
      dispatch({ type: 'REMOVE_TASK_ID', payload: activeTask.id });
    }
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleListChange = (event) => {
    const selectedValue = event.target.value
    listRef.current.value = selectedValue;
    console.log(listRef.current.value)
  }

  const handleDateChange = (event) => {
    setNewDate(event.target.value)
  }

  if (!activeTask) {
    return <div className='mr-10'>No active task selected</div>;
  }

  const handleSaveChangesClick = () => {
    dispatch({ 
      type: 'UPDATE_TASK_ID', 
      payload: { 
        id: activeTask.id,
        taskName: taskNameRef.current.value,
        description: descRef.current.value,
        date: dateRef.current.value,
        list: listRef.current.value 
      }
    });
  };

  return (
    <div className='task-info-bar border-l-2 p-2 w-1/5 ml-5 flex flex-col justify-between'>
      <div>
        <span className='text-2xl text-gray-700'> Task: </span>
        <div>
          <input type="text"
            value={newTaskName}
            placeholder={taskName}
            onChange={handleTaskNameChange}
            ref={taskNameRef}
            className='border rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40 py-2 px-1 my-1'
          />
        </div>
        <div>
          <input 
            type="text"
            value={newDescription}
            placeholder={description ==='' ? 'Type Your Description Here' : description}
            onChange={handleDescriptionChange} 
            ref={descRef}
            className='border rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40 pb-32 px-1 my-1'
          />
        </div>

        <div className='grid grid-cols-2'>
          <div>List: </div> 
          <div>
            {
              <select name="" id="" onChange={handleListChange} ref={listRef}>
                 <option value='None'>None</option>
                  {state.lists.map((listName) => (
                    <option value={listName.name}>{listName.name}</option>
                  ))}
              </select>
            }
              
          </div>

          <div> <p>Date: </p> </div>
          <div> <input type="date" value={newDate} ref={dateRef} onChange={handleDateChange}/> </div>
        </div>
      </div>
      

      <div className='flex justify-between mb-2'>
        <div>
          <button
            className='py-2 px-5 border-2 rounded-lg border-gray-200 font-semibold' 
            onClick={handleOnDeleteTaskClick}>
            Delete Task
          </button>
        </div>
        <div>
          <button 
          className='py-2 px-5  rounded-lg  bg-yellow-300 font-semibold' 
          onClick={handleSaveChangesClick}>Save Changes</button>
        </div>
      </div>
     
    </div>
  )
}

export default TaskInfoBar;
