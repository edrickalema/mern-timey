import React from "react";
import { NavbarTopList, NavbarBottomList } from "../Utils/NavbarList";
import { NavLink } from "react-router-dom";
import AsideLink from "./AsideLink";
import Logo from "./Logo";

function DeskTopAside() {
  return (
    <div className='max-md:hidden p-5'>
      <Logo margin={true} color='text-zinc-200' />
      <div className='space-y-4 my-[2em] flex flex-col'>
        {NavbarTopList.map((link) => {
          return <AsideLink key={link.path} {...link} />;
        })}
      </div>

      {/* <h3 className='py-3 text-lg uppercase text-gray-500 font-bold'>
        Schedules
      </h3> */}
      <div className='space-y-4 flex flex-col '>
        {NavbarBottomList.map((link) => {
          return <AsideLink key={link.path} {...link} />;
        })}
      </div>
    </div>
  );
}

export default DeskTopAside;
