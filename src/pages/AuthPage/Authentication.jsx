import React, { useState } from 'react'
import Login from './login.component'
import Register from './register.component'

const Authentication = () => {
  const [ clickedLogin, setClickedLogin] = useState(false)
  return (
    <div className='h-screen w-full bg-slate-600'>
      {clickedLogin 
      ?
      <Login setLogin={setClickedLogin}/>
      :  
      <Register setLogin={setClickedLogin}/>
      }
    </div>
  )
}

export default Authentication
