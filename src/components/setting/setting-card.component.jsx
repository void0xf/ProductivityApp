import { X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import SettingsCartElement from './settings-cart-element.component'
import { UserContext } from '../../contexts/user.context'
import { logOutUser } from '../../firebase/auth'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const SettingCard = ({isMobile}) => {
  const {state, dispatch} = useContext(UserContext)
  const [isDarkModeActive, setIsDatkModeActive] = useState(false);
  const navigate = useNavigate();

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
  const handleDarkMode = () => {
    const root = document.documentElement; // Access the :root element
    if(state.darkMode){
      dispatch({ type: 'TOGGLE_DARKMODE' });
      root.style.setProperty('--color-bkg', '0deg 9% 98%');
      root.style.setProperty('--color-text', '210deg 10% 13%');
      root.style.setProperty('--border-outline', '216deg 12% 84%');

    }
    else {
      dispatch({ type: 'TOGGLE_DARKMODE' });
      root.style.setProperty('--color-bkg', '210deg 10% 13%');
      root.style.setProperty('--color-text', '0deg 9% 98%');
      root.style.setProperty('--border-outline', '216deg 12% 24%');

    }

  }
  const handleLogOut = () => {
    if(logOutUser()) {
      navigate('/Auth');
    }
  }

  return (
    <div className='absolute h-screen w-screen z-40'>
      <div className='absolute rounded-lg w-full z-50 bg-bkg border-bordercolor top-1/4 p-4'>
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
        <SettingsCartElement name={'Toogle Dark Mode'} valueToSet={state.darkMode} setterFunction={handleDarkMode}/>
        <button onClick={()=>{handleLogOut()}}>Log Out</button>
        {/* 
        <div>LogOut</div> */}
      </div>
    </div>
  )
}

export default SettingCard
