import React from "react";
import customFetch from "../../Utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { Badge, DashTitle } from "../../components";
import dayjs from "dayjs";

export const loader = async ({ params }) => {
  try {
    const goal = await customFetch.get(`/study-goals/${params.id}`);
    console.log(goal);
    if (goal) {
      console.log(goal);
      return goal.data;
    }
  } catch (error) {
    return error;
  }
};
function ViewGoal() {
  const data = useLoaderData();
  const goal = data?.goal;
  console.log(goal);
  return (
    <main>
      <div className='flex items-start justify-between'>
        <DashTitle
          main='View your Study Goal'
          subtitle='Analyze your study goal and plan'
        />
        <div></div>
      </div>

      <div className='mt-6'>
        <h2 className='text-md text-gray-950 font-[800]'>{goal?.title}</h2>
        <div className='p-4 my-4 bg-gradient-to-b from-blue-500 text-white to-blue-600'>
          <p className=''>{goal?.reason}</p>
        </div>

        <div>
          <div className='flex'>
            <div className='flex justify-center item-center'>
              <p>Created:</p>
              <Badge
                color='text-black'
                text={dayjs(goal?.createdAt).format("DD/MM/YYYY")}
                background='bg-green-100'
              />
            </div>
            <div className='flex justify-center item-center'>
              <p>Finished by:</p>
              <Badge
                color='text-black'
                text={dayjs(goal?.finish_Date).format("DD/MM/YYYY")}
                background='bg-red-100'
              />
            </div>
          </div>
        </div>
        <p className='mt-4'>{goal?.description}</p>
      </div>
    </main>
  );
}

export default ViewGoal;
