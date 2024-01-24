import moment from "moment";
import React from "react";
import { FaDochub, FaPagelines, FaWpforms } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa6";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
function RecentNote({ _id, title, updatedAt, body, user }) {
  return (
    <div
      key={_id}
      className='p-10 flex-shrink-0 max-w-[300px] rounded-md bg-white/55 shadow'
    >
      <div className='p-4 text-[1.05rem] font-[900] flex items-start text-gray-800'>
        <div className='h-[40px] mr-2 w-[40px] flex-shrink-0 grid justify-center items-center bg-blue-200 rounded-md text-blue-600'>
          {title.split(" ")[0].charAt(0)}
        </div>{" "}
        <Link to={`../notes/${_id}`}>{title}</Link>
      </div>
      <p className='text-gray-600 text-sm '>
        {body ? parse(body.split(/\s+/).slice(0, 10).join(" ")) : ""}...
      </p>

      <hr className='border-0 border-b-[1px] my-2' />
      <div className='text-gray-500'>
        <p className='mb-[4px'>
          <FaPagelines className='inline' /> Opened:{" "}
          <span className='text-gray-700 font-bold text-md'>
            {moment.utc(updatedAt).local().startOf("seconds").fromNow()}
          </span>
        </p>
        <p>
          author:{" "}
          <span className='text-gray-700 font-bold text-md capitalize'>
            {user.name.split(" ").length > 1
              ? user.name.split(" ")[0] +
                " " +
                user.name.split(" ")[1].charAt(0).toUpperCase()
              : user.name.split(" ")[0]}
          </span>
        </p>
      </div>
    </div>
  );
}

export default RecentNote;
