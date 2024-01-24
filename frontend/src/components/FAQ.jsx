import React from 'react'

function Faq({question, answer}) {
  return (
    <div className='py-3'>
      <h3 className='py-2 font-bold text-gray-950'>{question}</h3>
      <p className='text-md leading-7 text-gray-600'>{answer}</p>
    </div>
  );
}

export default Faq