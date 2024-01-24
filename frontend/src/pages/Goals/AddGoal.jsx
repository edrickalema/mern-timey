import React, { useState, useEffect } from "react";
import { Button, ButtonLoading, DashTitle } from "../../components";
import { Form, redirect, useNavigation } from "react-router-dom";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../../Utils/customFetch";
import { GiClawString } from "react-icons/gi";

import { toast } from "react-toastify";
dayjs.extend(advancedFormat);

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/study-goals", data);
    toast.success("Congratulations!, Goal has been successfully created.");
    return redirect("/dashboard/goals");
  } catch (error) {
    console.log(error);
    return error;
  }
};
function AddGoal() {
  const [category, setCategory] = useState([]);
  const isSubmitting = useNavigation().state === "submitting";

  // Function to select the category from the server as goal category

  const get_goal_category = async () => {
    const goal_category = await customFetch.get("/goal-category");
    if (goal_category) {
      setCategory(goal_category?.data);
    }
  };
  useEffect(() => {
    get_goal_category();
  }, []);

  return (
    <main className=''>
      <div className='mb-5 text-center'>
        <DashTitle
          main='Create your Study goal'
          subtitle='Simply add your goal and start tracking progress'
        />
      </div>
      <Form className='max-w-[700px] m-auto' method='post'>
        <div className='grid gap-6'>
          <div>
            <label
              htmlFor='first_name'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              What is your study goal?
            </label>
            <input
              type='text'
              id='title'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
              placeholder='Goal title'
              name='title'
              required
            />
          </div>
          <div>
            <label
              htmlFor='last_name'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              What are you studying for?
            </label>
            <input
              type='text'
              id='reason'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
              placeholder='Reason for the goal'
              name='reason'
            />
          </div>

          <div>
            <label
              htmlFor='categories'
              className='block my-2 text-sm font-medium text-gray-900'
            >
              Select related Goal Category
            </label>
            <select
              name='category'
              id='category'
              className='bg-gray-50 border  border-gray-300 text-gray-950 text-md rounded-lg block w-full p-2.5  outline-none'
            >
              {category?.map((cate) => {
                const { name, _id } = cate;
                return (
                  <option className='text-sm' value={name} key={_id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <label
                htmlFor='Start Date'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Start Date
              </label>
              <input
                type='date'
                id='start_date'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
                placeholder='20/01/2024'
                name='start_Date'
                defaultValue={dayjs(new Date()).format("DD-MM-YYYY")}
              />
            </div>
            <div>
              <label
                htmlFor='Finish Date'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Finish Date
              </label>
              <input
                type='date'
                id='finish_date'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
                defaultValue={dayjs(new Date()).format("DD-MM-YYYY")}
                name='finish_Date'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='description'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Describe your Goal
            </label>
            <textarea
              id='decription'
              rows='4'
              name='description'
              className='block p-2.5 w-full text-sm text-gray-900 outline-none bg-white rounded-lg border border-gray-300    '
              placeholder='Write your thoughts here...'
            ></textarea>
          </div>
        </div>

        <div className='mt-4'>
          <button
            disabled={isSubmitting}
            className='block w-fit text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  '
            type='submit'
          >
            {isSubmitting ? <ButtonLoading text='Saving' /> : "Save Goal"}
          </button>
        </div>
      </Form>
    </main>
  );
}

export default AddGoal;
