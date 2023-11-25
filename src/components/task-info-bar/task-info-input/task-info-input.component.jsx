import React from 'react'

const TaskInfoInput = ({ taskName }) => {
  

  return (
    <div>
      <input
          type="text"
          value={taskName}
          placeholder={taskName}
          className='pl-10 pr-4 py-2 border rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40'
        />
    </div>
  )
}

export default TaskInfoInput
