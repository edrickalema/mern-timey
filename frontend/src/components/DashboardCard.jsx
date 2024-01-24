import React from "react";

function DashboardCard({
  title1,
  title2,
  title3,
  progress,
  total,
  completed,
  name,
  stats,
}) {
  return (
    <div className='max-md:mb-5 h-[200px] shadow-md rounded-[10px] p-8 bg-white flex flex-col justify-between'>
      <div className='flex justify-between flex-col'>
        <div className='flex  justify-between'>
          <div className='text-center'>
            <p className='text-gray-500 text-md'>{title1}</p>
            <h2 className=' text-[2em] font-extrabold'>{total}</h2>
          </div>

          <div className='text-center'>
            <p className='text-gray-500 text-md'>{title2 || ""}</p>
            <h2 className=' text-[2em] font-extrabold'>{stats || ""}</h2>
          </div>

          <div className='text-center'>
            <p className='text-gray-500 text-md'>{title3}</p>
            <h2 className=' text-[2em] font-extrabold'>{completed}</h2>
          </div>
        </div>
        <div>
          <p className='text-md text-gray-700 my-3 font-medium'>
            {name} Progress (100%)
          </p>
          <div className='w-full bg-gray-200 rounded-full '>
            <div
              style={{
                width: `${isNaN(progress) ? 0 : progress}%`,
                color: `${isNaN(progress) && "#111111"}%`,
                textAlign: `${isNaN(progress) && "center"}%`,
              }}
              className={` text-xs font-medium py-[0.02px] text-blue-100 text-center ${
                progress > 0 ? " bg-blue-600" : " bg-inherit "
              } rounded-full`}
            >
              {" "}
              {isNaN(progress) ? "" : progress.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
