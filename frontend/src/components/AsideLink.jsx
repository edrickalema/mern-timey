import React from "react";
import { Link, NavLink } from "react-router-dom";

function AsideLink({ closeNavbar, name, path, icon }) {
  return (
    <NavLink
      to={path}
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : ""
      }
      end
    >
      <div
        onClick={closeNavbar}
        className='flex items-center p-2 rounded-lg text-white/95  hover:bg-slate-600'
      >
        {icon} <p className='ml-4  font-[600]'>{name}</p>
      </div>
    </NavLink>
  );
}

export default AsideLink;
