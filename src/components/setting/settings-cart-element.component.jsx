import React, { useState } from 'react'

const SettingsCartElement = ({name, valueToSet, setterFunction}) => {
  return (
    <div className='flex justify-between border-gray-400 border-b-2 p-2 rounded-lg'>
    <div>{name}</div>
    <button onClick={() => {setterFunction()}}>
      <div className='w-12 h-6 rounded-full bg-slate-500'>
       <div className={`relative w-6 h-6 rounded-full bg-blue-500 transition-transform ${valueToSet ? 'translate-x-6' : '' }`} />
      </div>
    </button>
  </div>
  )
}

export default SettingsCartElement
