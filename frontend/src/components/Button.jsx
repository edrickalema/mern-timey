import React from "react";

function Button({ type, text, hover, color, background, width }) {
  return (
    <button
      type={type}
      className={`px-5 py-2.5 text-sm w-${width || "fit"} font-medium text-${
        color || "white"
      } bg-${background || "blue-600"} hover:bg-blue-${
        hover || "800"
      } focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center  hover:${
        hover || "bg-blue-700"
      } `}
    >
      {text}
    </button>
  );
}

export default Button;
