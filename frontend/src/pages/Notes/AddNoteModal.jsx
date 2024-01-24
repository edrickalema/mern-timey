import React from "react";
import { ButtonLoading, FormRow } from "../../components";
import { Form, useNavigation } from "react-router-dom";

function AddNoteModal({ action }) {
  const isSubmitting = useNavigation().state === "submitting";
  return (
    <div class=' bg-black/[0.55] flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center h-full'>
      <div className='relative p-5 w-full max-w-md h-full flex items-start justify-center '>
        <div className='relative text-left min-w-[600px] p-5 rounded-lg shadow bg-white'>
          <button
            onClick={action}
            typeName='button'
            className='absolute top-3 end-2.5 text-gray-800 hover:bg-zinc-950 hover:text-white bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center '
          >
            <svg
              onClick={action}
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-4 md:p-5 font-extrabold text-xl'>
            <Form method='post' action="/dashboard/notes">
              <FormRow name='title' type='text' label={"Title"} />
              <button
                className='block w-fit text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 '
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? <ButtonLoading text={"Saving .."} /> : "Save"}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNoteModal;
