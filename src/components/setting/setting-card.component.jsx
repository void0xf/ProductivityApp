import { X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import SettingsCartElement from './settings-cart-element.component'
import { UserContext } from '../../contexts/user.context'

const SettingCard = ({isMobile}) => {
  const {state, dispatch} = useContext(UserContext)
  const [isVibrationActive, setIsVibrationActive] = useState(state.vibrationOnTaskDone)
  const [isNODActive, setIsNODActive] = useState(false)
  const [isDarkModeActive, setIsDatkModeActive] = useState(false);

  const handleToggleVibration = () => {
    dispatch({ type: 'TOGGLE_VIBRATION' });
  };
  

  return (
    <div className='absolute rounded-lg w-full z-40 bg-gray-200 top-1/4 p-4'>
      <div className='flex justify-between border-b-2'>
        <div><p className=' text-2xl'>Settings</p></div>
        <div><button onClick={() => {dispatch({type:'TOGGLE_SETTINGS_CARD'})}}><X /></button></div>
      </div>
      {
        isMobile
        ?
        <SettingsCartElement name={'Vibration On task Done'} 
          valueToSet={state.vibrationOnTaskDone} 
          setterFunction={handleToggleVibration} />
          :
        null
      }

      {/* <div>Notify On DeadLine</div>
      <div>Dark Mode</div>
      <div>Acent Color</div>
      <div>LogOut</div> */}
    </div>
  )
}

export default SettingCard
