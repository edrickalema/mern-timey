import React from 'react'
import { FaPen } from 'react-icons/fa6';

function EditBtn({action}) {
  return (
    <div
      onClick={action}
      className='bg-blue-100 rounded-md h-[30px] w-[30px] flex items-center justify-center'
    >
      <FaPen className='text-xs font-light cursor-pointer  text-blue-600' />
    </div>
  );
}

export default EditBtn