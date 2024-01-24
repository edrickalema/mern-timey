import React from "react";
import { Link } from "react-router-dom";

function Logo({ margin, color }) {
  return (
    <Link to='/'>
      <div className={`flex items-end ${!margin && "mb-10"}`}>
        <img src='../../../public/logo.png' alt='icon' />
        <span className={`text-lg font-[900] uppercase ${color? color : 'text-zinc-950'}`}>
          imey
        </span>
      </div>
    </Link>
  );
}

export default Logo;
