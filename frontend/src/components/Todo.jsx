import React, { useState, useEffect } from "react";
import Badge from "./Badge";
import { FaAngleRight, FaTimes, FaTrash } from "react-icons/fa";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { FaPen } from "react-icons/fa6";
import { LuAlertCircle } from "react-icons/lu";
import { Form, Link, redirect } from "react-router-dom";
import customFetch from "../Utils/customFetch";
import { toast } from "react-toastify";
import { EditTodo } from "../pages";
import dayjs from "dayjs";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
function Todo({ status, _id, title, priority, deadline }) {
  const [deleteModal, setDelete] = useState(false);
  const [initialState, setInitialState] = useState(status);
  const [editModal, setEditModal] = useState(false);
  const handleChange = () => {
    setInitialState(!status);
  };
  const updateState = async () => {
    try {
      await customFetch.patch(`/todos/${_id}`, {
        status: initialState,
      });
      //   const { width, height } = useWindowSize();
    } catch (error) {}
  };

  useEffect(() => {
    updateState();
  }, [initialState]);

  const showDeleteModal = () => {
    setDelete(true);
  };
  const closeDeleteModal = () => {
    setDelete(false);
  };
  const showEditModal = () => {
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };
  let color, background;
  if (priority === "hard") {
    color = "text-red-800";
    background = "bg-red-100";
  } else if (priority === "easy") {
    color = "text-green-800";
    background = "bg-green-100";
  } else if (priority === "medium") {
    color = "text-yellow-800";
    background = "bg-yellow-100";
  }
  return (
    <div className=' text-zinc-950' key={_id}>
      <div className='flex items-center border-b-[1px] p-5 mb-2 shadow-sm rounded-md justify-between'>
        <div>
          {" "}
          <div>
            <div className='flex items-center'>
              <input
                checked={initialState}
                onChange={handleChange}
                id='default-checkbox'
                type='checkbox'
                value=''
                class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  '
              />
              <div className='flex items-start'>
                <Link to={`../todo/${_id}`}>
                  <h3 className='text-zinc-950 mx-4 font-semibold text-md hover:text-blue-600'>
                    {title}
                  </h3>
                </Link>
                <Badge color={color} text={priority} background={background} />
              </div>
            </div>

            <p className='text-sm text-gray-600 pt-5'>
              Finish by: {dayjs(deadline).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
        <div className='relative '>
          <div className='flex max-md:flex-col max-md:space-y-2'>
            <EditBtn action={showEditModal} />
            <DeleteBtn action={showDeleteModal} />

            {deleteModal && (
              <div>
                <div className='bg-black/50 opacity-[0.95] grid fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-full'>
                  <div className='relative p-4 w-full max-w-md max-h-full'>
                    <div className='relative bg-white/95 rounded-lg shadow text-gray-950 '>
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
                          Are you sure you want to delete this Task?
                        </h3>

                        <Form
                          className='inline-flex mr-4'
                          method='post'
                          action={`../delete-todo/${_id}`}
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
            {editModal && (
              <EditTodo
                editModal={editModal}
                closeModal={closeEditModal}
                _id={_id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
