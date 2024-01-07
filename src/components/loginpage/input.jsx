import React, { useState } from 'react'

const InputRegister = ({label, input, inputSetter}) => {
  const [isFocused, setIsFocused] = useState(false);

  function handleChange(event) {
    inputSetter(event.target.value);
  }

  return (
    <div className={`relative ${isFocused ? 'shadow-xl' : ''}`}>
      <input type="text"
      value={input} 
      onFocus={() => {setIsFocused(true)}}
      onBlur={() =>  {setIsFocused(false)}}
      onChange={(event) => {handleChange(event)}}
      className={`border-2 rounded-lg p-2 transition ${ isFocused ? 'focus:outline-acent' : 'focus:outline-none'} duration-200 w-max`}
      />
      <div>
        <div 
        className={`absolute bg-bkg pointer-events-none
        ${isFocused || input !== '' 
        ? 'translate-x-2 -translate-y-14 transition duration-400 bg-bkg inline ' 
        : 'translate-x-2 -translate-y-9 bg-bkg inline transition duration-400'  
        }
        ${isFocused 
        ?
        'text-acent'
        :
        '' }
        `}
        ><p className=''>{label}</p>
        </div>  
      </div>
    </div>

  )
}

export default InputRegister
