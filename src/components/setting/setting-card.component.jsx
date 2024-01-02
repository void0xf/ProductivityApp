import { X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import SettingsCartElement from './settings-cart-element.component'
import { UserContext } from '../../contexts/user.context'

const SettingCard = ({isMobile}) => {
  const {state, dispatch} = useContext(UserContext)
  const [isDarkModeActive, setIsDatkModeActive] = useState(false);

  const handleToggleVibration = () => {
    dispatch({ type: 'TOGGLE_VIBRATION' });
  };
  Notification.onchange = (() => {
    if(Notification.permission !== 'granted') {
      dispatch({type: 'TOGGLE_NOD_OFF'})
    }
  })
  const handleNOD = () => {
    if(!('Notification' in window)){
      console.error('Web Notifications API is not supported in this browser.');
    }
    if(Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
    if(Notification.permission == 'granted') {
      dispatch({ type: 'TOGGLE_NOD' });
    }

  }
  

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
      <SettingsCartElement name={'Notify On DeadLine'} valueToSet={state.NOD} setterFunction={handleNOD}/>

      {/* <div>Notify On DeadLine</div>
      <div>Dark Mode</div>
      <div>Acent Color</div>
      <div>LogOut</div> */}
    </div>
  )
}

export default SettingCard
