import { Plus } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { TasksContext } from '../../../contexts/tasks.context';

const AddNewList = () => {
  const { dispatch } = useContext(TasksContext)
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyPress = (key) => {
    if(key === 'Enter' && inputValue.trim() !== '') {
      addNewList();
    }
  }
  
  const addNewList = () => {
    dispatch({type:'ADD_LIST', payload: inputValue})
  }
  

  return (
    <div className=''>
      <div className="relative w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {handleInputChange(e)}}
          onKeyDown={(e) => {handleKeyPress(e.key)}}
          placeholder='Add New Task'
          className='pl-11 pr-4 py-2 rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40'
        />
      <div class="absolute inset-y-0 left-0 pl-4  
                    flex items-center  
                    pointer-events-none"> 
            <Plus color='grey'/>
        </div> 
      </div>
    </div>
  )
}

export default AddNewList
