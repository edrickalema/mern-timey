import React from "react";
import { useDashboardContext } from "../pages/Layouts/DashboardLayout";

import { FaBarsStaggered } from "react-icons/fa6";
import LogoutContainer from "./LogoutContainer";
import { useLocation } from "react-router-dom";
function DashboardNavbar() {
  const pathname = useLocation().pathname.split("/");
  let path;

  if (pathname.length === 2) {
    path = pathname[1];
  }
  if (pathname.length === 3) {
    path = pathname[2];
  }

  // if(path.includes('-')) {
  //   path = path.split('-').join(' ')
  // }

  const {
    openNavbar,
    showNavbar,
    closeNavbar,
    user,
    openLogoutContainer,
    showLogout,
    logout,
  } = useDashboardContext();
  return (
    <div className='flex p-5 justify-between items-center shadow-md'>
      <div className='flex items-center'>
        <FaBarsStaggered
          className='text-xl font-extrabold text-zinc-950 cursor-pointer'
          onClick={openNavbar}
        />{" "}
        <h2 className='ml-3 text-xl font-extrabold capitalize max-md:hidden'>
          {path}
        </h2>
      </div>
      <div className='flex items-start max-md:items-center relative'>
        <div>
          <h3 className='capitalize font-bold'>{user.name}</h3>
          <p className='text-sm text-gray-500 max-md:hidden'>{user.email}</p>
        </div>
        <div onClick={openLogoutContainer}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt='avatar'
              className='h-[30px] object-cover font-extrabold text-md  rounded-full w-[30px] ml-3  grid items-center justify-center cursor-pointer'
            />
          ) : (
            <div className='h-[50px] font-extrabold text-md  rounded-full w-[50px] ml-3 bg-blue-600 text-white grid items-center justify-center cursor-pointer'>
              {user.name.split(" ").length >= 2
                ? user.name.split(" ")[0].charAt(0).toUpperCase() +
                  user.name.split(" ")[1].charAt(0).toUpperCase()
                : user.name.split(" ")[0].charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {showLogout && <LogoutContainer logout={logout} />}
      </div>
    </div>
  );
}

export default DashboardNavbar;
