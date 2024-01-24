import React, { useEffect } from "react";
import { Button, DashTitle, NoData } from "../../components";
import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../../Utils/customFetch";
import Goal from "./Goal";
import { getDocumentTitle } from "../../Utils/DocumentTitle";

export const loader = async () => {
  try {
    const data = await customFetch.get("/study-goals/");

    return data;
  } catch (error) {
    return error;
  }
};
function Goals() {
  useEffect(() => {
    getDocumentTitle("Study Goals");
  }, []);

  const { data } = useLoaderData();
  const goals = data?.goals;

  return (
    <main>
      <section className='flex items-center justify-between'>
        <DashTitle
          main='Study Goals'
          subtitle='Set & manage your academic goals'
        />
        <div>
          <Link to='../add-goal' className=' mr-2 max-md:mr-0'>
            {" "}
            <Button text='Set Goal' />
          </Link>
          <Link to='../study-goal-categories'>
            <Button
              text='Categories'
              background='green-600'
              hover='bg-green-400'
            />
          </Link>
        </div>
      </section>
      <section className='mt-8'>
        {goals.length > 0 ? (
          goals
            ?.sort((a, b) => a.status - b.status)
            .map((goal) => {
              return <Goal key={goal._id} {...goal} />;
            })
        ) : (
          <NoData text='You have not created study goals yet! 😢' />
        )}
      </section>
    </main>
  );
}

export default Goals;
