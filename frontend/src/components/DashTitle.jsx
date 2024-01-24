import React from 'react'

function DashTitle({main, subtitle}) {
  return (
    <div>
      <h2 className='text-3xl text-gray-950 font-extrabold'>{main}</h2>
      <p className='text-gray-700 text-sm pt-1 font-light'>{subtitle}</p>
    </div>
  );
}

export default DashTitle