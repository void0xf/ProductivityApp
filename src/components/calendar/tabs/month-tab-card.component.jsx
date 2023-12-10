import React from 'react'

const MonthTabCard = ( {dayOfMonth, tasks} ) => {
  return (
    <div className='flex flex-col w-40'>
      <div className='font-bold '>{dayOfMonth}</div>
      <div className='flex flex-col max-w-lg'>
        {tasks.map((task) => (
          <div className='bg-blue-300 rounded-lg p-1 m-1 overflow-hidden opacity-80'>{task}</div>
        ))}
      </div>
    </div>
  )
}

export default MonthTabCard
