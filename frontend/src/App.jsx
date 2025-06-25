import { useState } from 'react'
import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Blogs from './pages/Blogs.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import { useAuth } from './contexts/AuthContext.jsx'
import NotAuthenticated from './pages/NotAuthenticated.jsx'
import PostForm from './components/PostForm.jsx'

function App() {
  const [count, setCount] = useState(0)
  const {user} = useAuth(); 

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/blogs' element={<Blogs/>}></Route>
          <Route path='/dashboard' element={(user===null || user.role==='user') ? <NotAuthenticated></NotAuthenticated>: 
          <Dashboard></Dashboard>}></Route>
          <Route path='/notAuthenticated' element ={ <NotAuthenticated></NotAuthenticated>}></Route>
          <Route path='/postForm' element ={ <PostForm></PostForm>}></Route>
          <Route path='/verify-email' element ={<VerifyEmail></VerifyEmail>}></Route>
        </Routes>
      </Router>
    </div>  
  )
}

export default App
