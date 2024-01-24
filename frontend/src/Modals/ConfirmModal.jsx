import React from "react";
import { Form, Link } from "react-router-dom";

function ConfirmModal({ title, action, link, callback }) {
  return (
    <>
      <div class=' bg-black/[0.55] flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center h-full'>
        <div className='relative p-4 w-full max-w-md h-full flex items-center justify-center'>
          <div className='relative  rounded-lg shadow bg-white'>
            <button
              typeName='button'
              className='absolute top-3 end-2.5 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center '
            >
              <svg
                onClick={callback}
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
            <div className='p-4 md:p-5 text-center'>
              <svg
                className='mx-auto mb-4 text-gray-400 w-8 h-8'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <h3 className='mb-5 text-lg font-normal text-gray-800 '>
                Are you sure you want to delete this {title || "Task"}?
              </h3>
              <Form
                action={action}
                method='post'
                className='text-white bg-red-600 hover:bg-red-800   font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2'
              >
                <button type='submit'>Yes, I'm sure</button>
              </Form>
              <button
                onClick={callback}
                type='button'
                className='text-white bg-black/90 hover:bg-black/80   rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white/80'
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;
