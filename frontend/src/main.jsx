import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import {PostProvider} from './contexts/PostContext.jsx'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.withCredentials = true; 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </StrictMode>,
)
