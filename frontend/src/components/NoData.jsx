import React from "react";
import  empty  from "../assets/empty.svg";

function NoData({ text, link }) {
  return (
    <div className="flex flex-col items-center mt-8 justify-center">
      <div>
        <img className="w-20 h-30"  src={empty} alt='Nothing to show' />
      </div>
      <p className="pt-8 text-md text-gray-600">{text}</p>
    </div>
  );
}

export default NoData;
