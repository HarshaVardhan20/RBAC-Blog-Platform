import React, { useEffect,useState } from 'react'
import { useNavigate, useSearchParams, } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const VerifyEmail = () => {
    const [status,setStatus] = useState('verifying...');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const {login} = useAuth();
    console.log(status);
    useEffect(()=>{
        console.log('hlooo');
        const verify = async ()=>{
            try{
                const response = await axios.post(`http://localhost:5001/api/auth/verify-email?token=${token}`);
                setStatus(response.data.message);
                const user = response.data.user;
                console.log(response);
                if(response.status === 200){
                    login(user,token);
                    user.role==='admin' ? navigate('/dashboard'): navigate('/');
                }
            }
            catch(err){
                setStatus(err.response?.data?.message);
            }
        }
        if(token) verify();
    },[token])
  return (
    <div className='min-h-screen flex justify-center items-center'>
        {console.log('Rendering status:', status)}
        <h2>{status}</h2>
    </div>
  )
}

export default VerifyEmail
