import React from 'react'
import NewTaskButton from '../task-bar/new-task-button/new-task-button.component'
import TaskElement from '../task-bar/taskElement.component'
import { useSwipeable } from 'react-swipeable';



const ListOfTasksCard = ({tasks, name, addForTommorow}) => {

  return (
    <div className='border-2 rounded-xl p-2 px-4 my-4 overflow-y-scroll max-h-96 overflow-x-hidden'>
      <div className='pb-2 font-semibold text-xl'><p>{name}</p></div>
      
      <div className='flex flex-col'>
        <NewTaskButton addForTommorow={addForTommorow}/>
        <div className='my-2'>
          {tasks.map((task) => (
            task 
            ?
            <TaskElement key={task.id} taskName={task.taskName} id={task.id} listName={task.list} date={task.date}/> 
            :
            null
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default ListOfTasksCard
