import React from 'react'

const NotAuthenticated = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex justify-center items-center h-30 bg-slate-300 mt-10'>
        <p className='p-10'>You are unauthorized for this content</p>
      </div>
    </div>
  )
}

export default NotAuthenticated;
