import React from 'react'

const WelcomeAdmin = ({name}) => {
  return (
    <div>
        <h2 className='text-4xl font-semibold p-2'>Welcome, <span className='text-red-400'>{name}</span> </h2>
    </div>
  )
}

export default WelcomeAdmin
