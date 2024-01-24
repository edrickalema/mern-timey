import React from "react";
import { Link } from "react-router-dom";

function DashButton({ link, background, hover, text, action }) {
  return (
    <div>
      {link ? (
        <Link to={link}>
          <button
            className={`block w-fit text-white ${
              background ? "bg-zinc-950" : "bg-blue-600"
            } bg-blue-600 hover:${
              hover ? "bg-zinc-800" : "bg-blue-500"
            }   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  `}
            type='submit'
          >
            {text || "Create"}
          </button>
        </Link>
      ) : (
        <button
          onClick={action}
          className={`block w-fit text-white ${
            background ? "bg-zinc-950" : "bg-blue-600"
          } bg-blue-600 hover:${
            hover ? "bg-zinc-800" : "bg-blue-500"
          }   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  `}
          type='submit'
        >
          {text || "Create"}
        </button>
      )}
    </div>
  );
}

export default DashButton;
