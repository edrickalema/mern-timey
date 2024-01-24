import React, { useState } from "react";
import { NavbarTopList, NavbarBottomList } from "../Utils/NavbarList";
import { NavLink } from "react-router-dom";
import AsideLink from "./AsideLink";
import Logo from "./Logo";
import { FaTimes } from "react-icons/fa";
import { useDashboardContext } from "../pages/Layouts/DashboardLayout";

function MobileAside() {
  const { showNavbar, closeNavbar } = useDashboardContext();

  return (
    <div
      style={{
        width: `${showNavbar ? "300px" : "0"}`,
        padding: `${showNavbar && ""}`,
      }}
      className='hidden max-md:block fixed overflow-hidden  top-0 left-0 bg-zinc-950 h-full  z-50'
    >
      <div className='space-y-4 p-5 flex flex-col'>
        <div className='flex items-center justify-between mb-5'>
          <Logo margin={true} color='text-zinc-200' />
          <FaTimes onClick={closeNavbar} />
        </div>
        {NavbarTopList.map((link) => {
          return (
            <AsideLink closeNavbar={closeNavbar} key={link.path} {...link} />
          );
        })}
      </div>

      {/* <h3 className='p-5 text-lg uppercase text-gray-500 font-bold'>
        Schedules
      </h3> */}
      <div className='space-y-4 p-5 flex flex-col'>
        {NavbarBottomList.map((link) => {
          return (
            <AsideLink closeNavbar={closeNavbar} key={link.path} {...link} />
          );
        })}
      </div>
    </div>
  );
}

export default MobileAside;
