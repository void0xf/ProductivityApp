import React, { useRef } from 'react'
import { useTaskContext } from '../../contexts/tasks.context';

const TaskInfoBar = () => {
  const { state, dispatch } = useTaskContext();
  const taskNameRef = useRef();
  const descRef = useRef();
  const listRef = useRef();
  const dateRef = useRef();

  const activeTask = state.tasks.find((task) => task.id === state.activeTaskId);

  const { taskName = '', description = '' } = activeTask || {};

  const handleOnDeleteTaskClick = () => {
    if (activeTask) {
      dispatch({ type: 'REMOVE_TASK_ID', payload: activeTask.id });
    }
  };

  if (!activeTask) {
    return <div className='task-info-bar'>No active task selected</div>;
  }

  const handleSaveChangesClick = () => {
    dispatch({ 
      type: 'UPDATE_TASK_ID', 
      payload: { 
        id: activeTask.id,
        taskName: taskNameRef.current.value,
        description: descRef.current.value,
        date: dateRef.current.value,
      }
    });
  };

  return (
    <div className='task-info-bar'>
      <h3>Task:</h3>
      <input type="text" placeholder={taskName} ref={taskNameRef}/>
      <br />
      <input type="text" placeholder={description ==='' ? 'Type Your Description Here' : description} ref={descRef}/>
      <p>List: </p> 
      <select name="" id="">
        {state.lists.map((listName) => (
          <option value={listName}>{listName}</option>
        ))}
      </select>
      <p>Date: </p> <input type="date" ref={dateRef}/>
      <div>
        <button onClick={() => {handleSaveChangesClick()}}>Save Changes</button>
        <button onClick={handleOnDeleteTaskClick}>Delete Task</button>
      </div>
    </div>
  )
}

export default TaskInfoBar;
