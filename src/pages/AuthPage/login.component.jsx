import React, { useEffect, useState } from 'react'
import InputRegister from './input'
import { loginUser, registerWithEmailAndPassword } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({setLogin}) => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  function handleSignUp() {
    if(loginUser(emailInput, passwordInput)) {
      navigate('/App');
    }
  }

  return (
      <div className='flex flex-col border-2 border-color rounded-lg bg-bkg min-w-[20rem] h-full items-center'>
      <div>
        <p className='font-semibold text-center text-xl my-5'>Login To Your Account</p>
      </div>
      <div className='flex items-center flex-col m-2'>
        <InputRegister label={'E-Mail'} input={emailInput} inputSetter={setEmailInput}/>
      </div>

      <div className='flex items-center flex-col m-2'>
        <InputRegister label={'Password'} input={passwordInput} inputSetter={setPasswordInput}/>
      </div>

      <div className='flex text-center text-[1rem] mt-5 mb-2'>
        <p></p>
        <button 
        className='text-acent mx-2'
        onClick={() => {setLogin(false)}}
        >Dont Have Account ?</button>
      </div>

      <button 
      className='py-2 px-2 rounded-lg bg-acent text-white font-semibold min-w-[10rem]'
      onClick={() => {handleSignUp()}}
      >Sign In</button>
      

      <div className='m-2'>
        <p className='text-center'>Or</p>
      </div>

      <div>
        <div className='flex justify-center'>
          <button>
            <p>Login With Google</p>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Login