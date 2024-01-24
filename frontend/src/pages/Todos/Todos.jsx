import React, { useState, useEffect } from "react";
import {
  Form,
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../Utils/customFetch";
import { useDashboardContext } from "../Layouts/DashboardLayout";
import {
  Badge,
  Button,
  DashTitle,
  FormRow,
  NoData,
  Todo,
} from "../../components";
import { FaAngleRight, FaTimes, FaTrash } from "react-icons/fa";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const response = await customFetch.post("/todos", data);
    console.log(response);
    toast.success("Todo has been created");
    return redirect("../todos");
  } catch (error) {
    const message = error?.response?.data?.message.toString();
    toast.error(message);
    return redirect("../todos");
  }
};

export const todoLoader = async () => {
  try {
    const data = await customFetch.get("/todos");

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

function Todos() {
  const { data } = useLoaderData();
  const todos = data?.todos;
  const isSubmitting = useNavigation().state === "submitting";
  const [modal, showModal] = useState(isSubmitting);

  const openModal = () => {
    showModal(true);
  };
  const closeModal = () => {
    showModal(false);
  };

  useEffect(() => {
    document.title = "Timey - Todos";
    closeModal();
  }, [isSubmitting]);
  return (
    <main className='py-5'>
      {/* <!-- Modal toggle --> */}
      <div className='flex items-center justify-between'>
        <DashTitle main='To-do List' subtitle='Manage your To-do list' />
        <button
          onClick={openModal}
          className='block text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center  '
          type='button'
        >
          Add Task
        </button>
      </div>

      {/* <!-- Main modal --> */}
      {modal && (
        // <!-- Main modal -->
        <div className=' bg-black/50  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full flex h-full'>
          <div className='relative p-4 w-full max-w-2xl max-h-full'>
            {/* <!-- Modal content --> */}
            <div className='rounded-lg text-zinc-950 p-10 max-md:p-5 bg-white max-w-[500px] m-auto'>
              {/* <!-- Modal header --> */}
              <div className='flex items-center justify-between  '>
                <DashTitle
                  main='Assignment Tasks'
                  subtitle='Manage tasks related to your assignment'
                />
                <button
                  onClick={closeModal}
                  type='button'
                  className=' text-zinc-950 bg-gray-100 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  '
                >
                  <FaTimes className='text-zinc-800' />
                </button>
              </div>

              <Form method='post'>
                <FormRow label='Title' name='title' type='text' />
                <FormRow
                  label='Deadline'
                  name='deadline'
                  type='date'
                  default_value={new Date()}
                />
                <label
                  for='decription'
                  className='block mb-2 text-md font-medium text-gray-900 '
                >
                  Description
                </label>
                <textarea
                  id='decription'
                  rows='4'
                  name='description'
                  className='block p-2.5 w-full text-sm text-gray-900 outline-none bg-white rounded-lg border border-gray-300    '
                  placeholder='Write your thoughts here...'
                ></textarea>
                <label
                  htmlFor='priorties'
                  className='block my-2 text-md font-medium text-gray-900'
                >
                  Select an option
                </label>
                <select
                  name='priority'
                  id='priorities'
                  className='bg-gray-50 border border-gray-300 text-gray-950 text-md rounded-lg block w-full p-2.5  outline-none'
                >
                  <option defaultValue>What is the level of your todo?</option>
                  <option value='hard'>Hard</option>
                  <option value='easy'>Easy</option>
                  <option value='medium'>Medium</option>
                </select>

                <button
                  className='block text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mt-5  '
                  type='submit'
                >
                  {isSubmitting ? "Creating..." : "  Add Task"}
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}

      <section className='mt-8'>
        <div>
          {todos?.length > 0 ? (
            todos
              ?.sort((a, b) => a.status - b.status)
              .map((todo) => {
                return <Todo key={todo._id} {...todo} />;
              })
          ) : (
            <NoData text='No todo list created yet!' />
          )}
        </div>
      </section>
    </main>
  );
}

export default Todos;
