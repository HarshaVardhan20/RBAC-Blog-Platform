import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError]  = useState('');
    const naviagate = useNavigate();
    const handleSignup = async () => {
    try {
        setError('');
        if(!email || !password){
            setError('email and password are necessary');
            return;
        }
        setLoading(false);
        const response = await axios.post('http://localhost:5001/api/auth/signup', {
            name,
            email,
            password,
        });
        setLoading(true); 
    } catch (err) {
        const errorMsg = err.response?.data?.message || 'Error while signing up';
        setError(errorMsg);
    }
    };


  return (
    <div className='flex flex-col items-center min-h-screen justify-center'>
        <div className='flex flex-col shadow-md p-10  rounded-md gap-3 items-center bg-gray-100'>
            <p className='text-xl font-semibold'>Signup Page</p>
            <div className='flex flex-col gap-2'>
                <p className='text-base font-normal'>Name</p>
                <input className='border border-black rounded-md w-[300px] h-10 px-2' onChange={(e)=>setName(e.target.value)}></input>
            </div>
            <div className='flex flex-col gap-2'>
                <p>Email</p>
                <input className='border border-black rounded-md w-[300px] h-10 px-2' onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-base font-normal'>Password</p>
                <input className='border border-black rounded-md w-[300px] h-10 px-2' onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            {loading ? <p className='text-orange-400'>Verify yourself by clicking <span className='text-red-600'>verify</span> in your email</p>:<button className='mt-4 w-[300px] h-10 bg-green-600 text-white rounded-md' onClick={()=>handleSignup()}>Sign up</button> }
            <p>Already have Account? <span className='text-blue-500 hover:cursor-pointer' onClick={()=>naviagate('/login')}>Login</span></p>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    </div>
  )
}

export default Signup
