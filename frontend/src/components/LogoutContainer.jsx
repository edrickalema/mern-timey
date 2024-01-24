import React from "react";
import { Link } from "react-router-dom";
import smallBtn from "./smallBtn";
import Button from "./Button";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

function LogoutContainer({ logout }) {
  return (
    <div className='absolute top-full right-0 p-4 rounded-md bg-white shadow-sm'>
      <Link to='/dashboard/profile'>
        <div className='flex items-start'>
          <FaUser className='text-gray-950' />
          <p className='ml-4 text-md font-semibold'>Profile</p>
        </div>
      </Link>

      <div className='flex items-start mt-5 cursor-pointer' onClick={logout}>
        <FaSignOutAlt className='text-gray-950' />
        <p className='ml-4 text-md font-semibold'>Sign out</p>
      </div>
    </div>
  );
}

export default LogoutContainer;
