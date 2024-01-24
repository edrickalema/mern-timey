import React, { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useNavigation,
  Link,
  useParams,
} from "react-router-dom";
import customFetch from "../../Utils/customFetch";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";
import { useDashboardContext } from "../Layouts/DashboardLayout";
import { FormRow } from "../../components";
import { FaTimes } from "react-icons/fa";

dayjs.extend(advanceFormat);

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/todos/${params.id}`, data);
    toast.success("Todo has been Edited");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("../todos");
  }
};

function EditTodo({ closeModal, _id, editModal }) {
  const navigate = useNavigation();
  const isEditting = navigate.state === "submitting";

  const [todoData, setTodoData] = useState({});
  const [modal, setModal] = useState(isEditting);

  const todo_id = useParams().id;

  async function getTodoData() {
    const todo = await customFetch.get(`/todos/${_id}`);
    const response = todo.data;
    console.log(response);
    if (response) {
      setTodoData(response.todo);
    }
  }
  useEffect(() => {
    getTodoData();
  }, [todo_id]);

  const todo = Object.keys(todoData).length > 0 && todoData;

  return (
    <div className=' bg-black/50  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full flex h-full'>
      <div className='relative p-4 w-full max-w-2xl max-h-full'>
        {/* <!-- Modal content --> */}
        <div className='rounded-lg bg-white py-10 px-10 max-w-[500px] m-auto'>
          {/* <!-- Modal header --> */}
          <div className='flex items-center justify-between  '>
            <h2 className='text-gray-950 font-extrabold'>Edit Todo</h2>
            <button
              onClick={closeModal}
              type='button'
              className='text-gray-950 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  '
            >
              <FaTimes />
            </button>
          </div>

          <Form method='post' action={`../edit-todo/${_id}`}>
            <FormRow
              default_value={todo.title}
              label='Title'
              name='title'
              type='text'
            />
            <FormRow
              label='Deadline'
              name='deadline'
              type='date'
              default_value={dayjs(todo?.deadline).format("YYYY-MM-DD")}
            />
            <label
              for='decription'
              className='block mb-2 text-md font-medium text-gray-900 '
            >
              Description
            </label>
            <textarea
              defaultValue={todo.description}
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
              selected={todo?.priority}
              name='priority'
              id='priorities'
              className='bg-gray-50 border border-gray-300 text-gray-950 text-md rounded-lg block w-full p-2.5  outline-none'
            >
              <option value='hard'>Hard</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
            </select>

            <button
              className='block text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mt-5  '
              type='submit'
              onSubmit={isEditting ? "" : closeModal}
            >
              {isEditting ? "Editing" : "  Edit Task"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
