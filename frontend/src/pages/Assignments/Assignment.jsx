import React, { useEffect } from "react";
import { DashTitle, NoData } from "../../components";
import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../../Utils/customFetch";
import { Assignment } from "../../components";

import { getDocumentTitle } from "../../Utils/DocumentTitle";
export const loader = async () => {
  try {
    const data = await customFetch.get("/study-assignments");
    if (data) return data;
  } catch (error) {
    console.log(error);
  }
};
function Assignments() {
  const { data } = useLoaderData();

  const assignments = data?.assignments;
  useEffect(() => {
    getDocumentTitle("Assignments"), [];
  });
  return (
    <main>
      <div className='flex items-center justify-between'>
        <DashTitle
          main='Study Assignmnets'
          subtitle='Manage your study Assignments'
        />

        <Link to='../create-assignment'>
          <button
            className='block w-fit text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  '
            type='submit'
          >
            Create Assignment
          </button>
        </Link>
      </div>
      <section
        className={`${
          assignments.length > 0 ? "grid" : "block"
        }  gap-5 grid-cols-3 my-8 max-md:block max-w-[1200px]:grid-cols-2`}
      >
        {assignments.length > 0 ? (
          assignments?.map((assignment) => {
            const { _id } = assignment;
            return <Assignment key={_id} {...assignment} />;
          })
        ) : (
          <NoData text='No Assignment created yet!, feel free to create one' />
        )}
      </section>
    </main>
  );
}

export default Assignments;
