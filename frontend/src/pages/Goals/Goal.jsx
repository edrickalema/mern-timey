import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import advancedFormat from "dayjs/plugin/advancedFormat";
import { LuAlertCircle } from "react-icons/lu";
import { Form, Link } from "react-router-dom";
import customFetch from "../../Utils/customFetch";
import { Badge, DeleteBtn, EditBtn } from "../../components";
import { getDocumentTitle } from "../../Utils/DocumentTitle";
dayjs.extend(advancedFormat);
function Goal({
  title,
  reason,
  start_Date,
  finish_Date,
  _id,
  category,
  status,
}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [checkStatus, setCheckStatus] = useState(status);

  const handleChange = () => {
    setCheckStatus((prev) => !prev);
  };
  const showDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleSubmit = async () => {
    await customFetch.patch(`/study-goals/${_id}`, {
      status: checkStatus,
    });
  };
  useEffect(() => {
    handleSubmit();
    getDocumentTitle("View Study Goal");
  }, [checkStatus]);
  return (
    <div className='py-5 px-3 mb-2 border-b-2'>
      <div className='flex items-start justify-between pb-2'>
        <div className='flex items-start'>
          <input
            type='checkbox'
            className='w-4 h-4 rounded-full cursor-pointer bg-green-600'
            name='status'
            id='status'
            checked={checkStatus}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
          <div className='flex items-start'>
            <Link to={`../view-study-goal/${_id}`}>
              <h3 className='text-gray-700 font-[800] text-md ml-2 mr-2'>
                {title}
              </h3>
            </Link>
            <Badge
              color='text-white'
              text={category}
              background='bg-gradient-to-b from-blue-500 to-blue-600'
            />
          </div>
        </div>
        <div className='flex text-gray-600'>
          <Link to={`../edit-goal/${_id}`}>
            <EditBtn />
          </Link>
          <DeleteBtn action={showDeleteModal} />
        </div>
      </div>

      <div className='text-gray-600 text-sm'>
        <div className='flex '>
          <p>{reason}</p>
        </div>

        <div className='flex pt-2 text'>
          <p>
            Start by:{" "}
            <Badge
              background='bg-green-100'
              text={dayjs(start_Date).format("DD/MM/YYYY")}
              color='text-gray-900'
            />
          </p>
          <p className='max-md:ml-0 ml-2'>
            Finish by:{" "}
            <Badge
              background='bg-red-100'
              text={dayjs(finish_Date).format("DD/MM/YYYY")}
              color='text-gray-900'
            />
          </p>
        </div>
      </div>

      {deleteModal && (
        <div>
          <div className='bg-gray-900 opacity-[0.95] grid fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-full'>
            <div className='relative p-4 w-full max-w-md max-h-full'>
              <div className='relative bg-white rounded-lg shadow text-gray-950 '>
                <div className='p-4 md:p-5 text-center'>
                  <LuAlertCircle
                    className=' mx-auto
                                    mb-4
                                    text-gray-950
                                    w-12
                                    h-12
                                   '
                  />

                  <h3 className='mb-5 text-lg  text-gray-950 font-normal '>
                    Are you sure you want to delete this Goal?
                  </h3>

                  <Form
                    className='inline-flex mr-4'
                    method='post'
                    action={`../delete-goal/${_id}`}
                  >
                    <button
                      type='submit'
                      className='text-white bg-red-600   font-medium rounded-lg text-sm  items-center px-5 py-2.5 text-center '
                    >
                      Yes, I'm sure
                    </button>
                  </Form>

                  <button
                    onClick={closeDeleteModal}
                    type='button'
                    className='text-white bg-gray-950 hover:bg-gray-900  focus:outline-none  rounded-lg border  text-sm font-medium px-5 py-2.5   '
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goal;
