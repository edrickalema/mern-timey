import React from "react";
import { FaTrash } from "react-icons/fa6";

function DeleteBtn({ action }) {
  return (
    <div className='max-md:ml-0 ml-3 bg-red-100 rounded-md h-[30px] w-[30px] flex items-center justify-center'>
      <FaTrash
        onClick={action}
        className=' text-xs font-light cursor-pointer text-red-600 '
      />
    </div>
  );
}

export default DeleteBtn;
