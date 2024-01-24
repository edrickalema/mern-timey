import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../../Utils/customFetch";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`todos/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {}
};
function Todo() {
  const { data } = useLoaderData();
  const todo = data.todo;
  return (
    <main>
      <div className='flex items-center max-md:items-start justify-between'>
        <h2 className='text-xl max-md:text-sm max-md:mr-2 font-extrabold uppercase'>
          To-do of {dayjs(todo.deadline).format("DD/MM/YYYY")}
        </h2>
        <div className='max-md:grid flex items-center '>
          <button
            // onClick={openModal}
            className='block text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center  '
            type='button'
          >
            Add Sub Task
          </button>
          <div>
            <Link
              to='/dashboard/todos'
              className='block max-md:ml-0 max-md:mt-2 ml-4 text-white bg-green-600 hover:bg-green-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center  '
              type='button'
            >
              Todo List
            </Link>
          </div>
        </div>
      </div>

      <section className=' p-8 my-8'>
        <div>
          <h2 className='text-xl font-extrabold uppercase bg-white p-8'>
            {todo.title}
          </h2>
        </div>

        <div className='py-8 leading-8'>
          <p className='text-md'>{todo.description}</p>
        </div>
      </section>
    </main>
  );
}

export default Todo;
