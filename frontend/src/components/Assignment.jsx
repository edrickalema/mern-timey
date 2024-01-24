import dayjs from "dayjs";
import React, { useState, useRef } from "react";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { HiDotsVertical } from "react-icons/hi";
import Badge from "./Badge";
import { Form, Link } from "react-router-dom";
import { ConfirmModal } from "../Modals";
dayjs.extend(advancedFormat);

function Assignment({ title, summary, status, finishDate, _id }) {
  let color;
  let background;
  if (status === "Pending") {
    background = "bg-yellow-100";
    color = "text-yellow-800";
  } else if (status === "Completed") {
    background = "bg-green-100";
    color = "text-green-800";
  } else {
    background = "bg-blue-100";
    color = "text-blue-800";
  }
  const icon = title.charAt(0).toUpperCase();

  const [action, showAction] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const showDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  function toggleAction(e) {
    if (e.target.parentNode) {
      showAction((prev) => !prev);
    }
  }

  return (
    <main>
      <div className='w-fit p-5 border-2 rounded max-md:mt-5 relative'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start justify-between'>
            <div className='rounded flex-shrink-0 h-[50px] w-[50px] grid items-center justify-center text-white bg-gradient-to-t from-blue-400 to-blue-600'>
              <span className=' font-extralight text-md'>{icon}</span>
            </div>
            <h2 className='ml-2 font-extrabold text-lg'>{title}</h2>
          </div>

          <div className='relative'>
            <HiDotsVertical
              className='cursor-pointer font-extrabold flex-shrink-0'
              onClick={toggleAction}
            />
            {action && (
              <div className='absolute rounded top-full bg-white min-w-[200px] shadow-sm m-auto text-zinc-500 right-0'>
                <div className='p-5'>
                  <Link to={`../view-assignments/${_id}`}>
                    <p className='capitalize leading-5'>Open</p>
                  </Link>
                  <Link to={`../edit-assignments/${_id}`}>
                    <p className='capitalize leading-5 py-4'>Edit</p>
                  </Link>
                  <hr className='mb-4 border-0 border-b-2' />

                  <button type='button' onClick={showDeleteModal}>
                    <p className='capitalize text-red-600 leading-5'>Delete</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className='text-sm py-2 text-gray-500'>{summary}</p>

        <div className='flex items-start justify-between'>
          <Badge color={color} background={background} text={status} />

          <Badge
            color='text-red-800'
            background='bg-red-100'
            text={dayjs(finishDate).format("DD/MM/YYYY")}
          />
        </div>
      </div>

      {deleteModal && (
        <ConfirmModal
          callback={closeDeleteModal}
          action={`../delete-assignments/${_id}`}
          title='Assignment'
        />
      )}
    </main>
  );
}

export default Assignment;
