import React, { useCallback, useContext, useEffect, useState } from 'react';
import NewTaskButton from './new-task-button/new-task-button.component';
import { TasksContext, useTaskContext } from '../../contexts/tasks.context';
import TaskInfoBar from '../task-info-bar/task-info-bar.component';
import NewTask from './new-task/new-task.component';
import { TaskFilter, filtrTasks, useFilterContext } from '../../contexts/filter.context';

const TaskBar = () => {
  const { state: taskState } = useTaskContext();
  const { state: filtrState } = useFilterContext();
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(taskState.tasks);
    let newTasks = taskState.tasks

    if(filtrState.listFilter !== '' && filtrState.listFilter !== 'None') {
      newTasks = newTasks.map((task) => {
        if(task.list == filtrState.listFilter) {
          return task
        }
        return {}
      })
      setFilteredTasks(newTasks);
    }

    if(filtrState.filter == 'Today') {
      const date = new Date();
  
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      const currentDate = `${year}-${month}-${day}`;


      newTasks = newTasks.map((task) => {
        if(task.date == currentDate) {
          return task
        }
        return {}
      })
      setFilteredTasks(newTasks);
    }


  }, [filtrState.filter, filtrState.listFilter, filtrState.tagsFilter, taskState.tasks, filteredTasks.length]);

  return (
    <div className='task-bar w-1/3'>
      <div className='heading flex flex-row py-2'>
        <span className='text-3xl pr-5 font-semibold'>Today</span>
        <h2 className='p-1 px-3 text-2xl border-2 rounded-lg bg-gray-100'>{taskState.tasks.length}</h2>
      </div>

      <NewTaskButton />

      {filteredTasks.map((task) => (
        Object.keys(task).length === 0 ? (<></>) :(
        <ul className='my-1'>
          <NewTask taskTitle={task.taskName} taskId={task.id} task={task} />
        </ul>)
      ))}
    </div>
  );
};

export default TaskBar;
