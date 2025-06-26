import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {login}  = useAuth();
  const [error,setError]  = useState('');
  const navigate = useNavigate();
  const [eyeClose,setEyeClose] = useState(true);
  console.log(eyeClose);
  const handleLogin = async ()=>{
    try{
      setError('');
      if(!email || !password){
        setError('email and password are necessary');
        return;
      }
      const response = await axios.post('http://localhost:5001/api/auth/login',{ email, password },{ withCredentials: true });
      console.log(response.data);
      const user = response.data.user;
      const token = response.data.token;
      login(user,token);
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 2000,
      });
      setTimeout(() => {
        user.role==='admin' ? navigate('/dashboard'): navigate('/');
      }, 2000);
    }
    catch(err){
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMsg);
    }
  }
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
        <div className='flex flex-col shadow-md items-center justify-center p-10 gap-2'>
            <p className='text-xl font-semibold'>Login Page</p>
            <div className='flex flex-col gap-2'>
                <p>Email</p>
                <input className='border border-black rounded-md w-[350px] h-10 px-2' onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div className='flex flex-col gap-2'>
                <p>Password</p>
                <div className='relative w-[350px]'>
                <input type={eyeClose ? 'password' : 'text'} className='border border-black w-[350px] rounded-md h-10 px-2'
                onChange={(e) => setPassword(e.target.value)} value={password}/>
                <span className='absolute right-3 top-1/2 -translate-y-1/2' onClick={()=>setEyeClose(!eyeClose)}>
                {eyeClose ?  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                }
              </span>
                </div>
            </div>
            <button className='bg-green-500 w-[350px] h-10 rounded-md mt-6 text-white' onClick={()=>handleLogin()}>Login</button>
            <p>Don't have Accout? <span className='text-blue-500 hover:cursor-pointer' onClick={()=>navigate('/signup')}>Create One</span></p>
            {error && <p className='text-red-500'>{error}</p>}
            <ToastContainer />
        </div>
    </div>
  )
}

export default Login