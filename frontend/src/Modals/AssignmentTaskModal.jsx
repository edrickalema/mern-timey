import React from "react";
import { DashTitle, FormRow } from "../components";
import { Form, Link, useNavigation, redirect } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../Utils/customFetch";
import { toast } from "react-toastify";
dayjs.extend(advancedFormat);

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/assignment-tasks/${params.taskId}`, data);
    toast.success("Assignment task updated successfully");
    return redirect(`/dashboard/view-assignments/${params.id}`);
  } catch (error) {
    console.log(error);
  }
};
function AssignmentTaskModal({
  assignment,
  _id,
  description,
  task,
  level,
  due_date,
  callback,
}) {
  const isSubmitting = useNavigation().state === "submitting";

  return (
    <div>
      <div className=' bg-black/50  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full flex h-full'>
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
          {/* <!-- Modal content --> */}
          <div className='rounded-lg bg-white p-10 max-md:p-5 text-zinc-950 max-w-[500px] m-auto'>
            {/* <!-- Modal header --> */}
            <div className='flex items-center justify-between  '>
              <DashTitle
                main='Edit your Assignment Task'
                subtitle='Manage tasks related to your assignment'
              />
              <button
                onClick={callback}
                type='button'
                className=' text-zinc-950 bg-gray-200 hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  '
              >
                <FaTimes />
              </button>
            </div>

            <Form
              method='post'
              action={`/dashboard/view-assignments/${assignment}/tasks/${_id}`}
            >
              <FormRow
                label='Task title'
                default_value={task}
                name='task'
                type='text'
              />
              <FormRow
                label='Due Date'
                name='due_date'
                type='date'
                default_value={dayjs(due_date).format("YYYY-MM-DD")}
              />
              <label
                for='description'
                className='block mb-2 text-md font-medium text-gray-900 '
              >
                Description
              </label>
              <textarea
                defaultValue={description}
                id='description'
                rows='4'
                name='description'
                className='block p-2.5 w-full text-sm text-gray-900 outline-none bg-white rounded-lg border border-gray-300    '
                placeholder='Write your thoughts here...'
              ></textarea>
              <label
                htmlFor='Level'
                className='block my-2 text-md font-medium text-gray-900'
              >
                Select an option
              </label>
              <select
                defaultValue={level}
                name='level'
                id='priorities'
                className='bg-gray-50 border border-gray-300 text-gray-950 text-md rounded-lg block w-full p-2.5  outline-none'
              >
                <option defaultValue>What is the level of your todo?</option>
                <option value='High'>High</option>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
              </select>

              <button
                disabled={isSubmitting}
                className='block w-fit text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  '
                type='submit'
              >
                {isSubmitting ? (
                  <>
                    <svg
                      aria-hidden='true'
                      role='status'
                      class='inline w-4 h-4 me-3 text-white animate-spin'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='#E5E7EB'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentColor'
                      />
                    </svg>
                    <span>Saving</span>
                  </>
                ) : (
                  "Save Task"
                )}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentTaskModal;
