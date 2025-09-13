import React from 'react'
import loader from '/loader.gif';

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center bg-black '>
      <img className='h-[50%] object-cover my-50' src={loader} alt="" />
    </div>
  )
}

export default Loading;
