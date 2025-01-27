import React from 'react'
import "../app/globals.css"

export default function Loader() {
  return (
    <div className='flex justify-center items-center w-screen h-14 bg-transparent'>
      <div className='flex justify-center items-center absolute border-2 rounded-full border-t-blue-700 w-8 h-8 animate-loader'></div>
    </div>

  )
}
