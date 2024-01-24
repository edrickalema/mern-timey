import React from "react";
import { FcList } from "react-icons/fc";
function TaskCard({ icon, title, description }) {
  return (
    <div className=' rounded-md m-auto  h-fit  flex flex-col text-center  items-center'>
      <div className='h-[60px] w-[60px] rounded-full bg-slate-200 text-center flex items-center justify-center'>
        {icon || <FcList />}
      </div>
      <h3 className='py-5 text-[1.3em]'>{title || "Tasks"}</h3>
      <p className='text-gray-500  max-w-[250px]  text-sm leading-loose'>
        {description ||
          " Stay organized with comprehensive task managemnet system. Work on your to-dos efficently, prioritize, and celebrate your achievemtn as you complete"}
      </p>
    </div>
  );
}

export default TaskCard;
