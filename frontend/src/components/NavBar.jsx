import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const NavBar = () => {
    const {isAuthenticated,logout,user} = useAuth();
    const navigate = useNavigate();
    const logoutUser = ()=>{
        logout();
        navigate('/login');
    }
  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => user.role==='admin' ? navigate('/dashboard'):navigate('/')}>
          📝 ReadBlogs
        </div>
        
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search posts..."
            className="border rounded-md px-3 py-1 w-[500px]"
          />
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button onClick={logoutUser} className="p-1 bg-red-400 text-white hover:bg-red-500 rounded-md">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} >Login</button>
              <button onClick={() => navigate('/signup')} className="hover:underline">Signup</button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
