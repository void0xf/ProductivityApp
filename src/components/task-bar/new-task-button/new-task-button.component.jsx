import React, { useContext, useEffect, useState } from 'react'
import { useTaskContext } from '../../../contexts/tasks.context';
import Button from '@mui/joy/Button';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { TaskFilter } from '../../../contexts/filter.context';



const NewTaskButton = ({addForTommorow}) => {
  const uniqueId = uuidv4();

  const { state, dispatch } = useTaskContext();
  const {state:filterState} = useContext(TaskFilter)
  const [ counter, setCounter ] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      addNewTask();
      setInputValue('');
    }
  }

  const addNewTask = () => {
    const dateToSet =  new Date();
    if (addForTommorow) {
      dateToSet.setDate(dateToSet.getDate() + 1); 
    }
  
    const newTask = {
      id: uniqueId,
      taskName: inputValue,
      description: '',
      date: dateToSet,
      list: filterState.listFilter,
      createDate: new Date(),
      doneDate: null,
      tags: [],
    };
  
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className=''>
      <div className="relative w-full">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyPress(e)}
          placeholder='Add New Task'
          className='pl-10 pr-4 py-2 border rounded-lg border-bordercolor focus:outline-acent w-full placeholder-grey-200 border-opacity-40 bg-bkg'
          maxLength={20}
        />
        </form>
       <div class="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"> 
             <Plus color='grey'/>
        </div> 
      </div>
      

    </div>
  );
}

export default NewTaskButton;