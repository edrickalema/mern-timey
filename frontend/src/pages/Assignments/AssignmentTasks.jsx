import React, { useState } from "react";
import { useViewAssignmentContext } from "./ViewAssignment";
import customFetch from "../../Utils/customFetch";
import { useLoaderData } from "react-router-dom";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { AssignmentTask, Badge, NoData } from "../../components";
import { Task_Color_Decider } from "../../Utils/colorDecider";
dayjs.extend(advancedFormat);

export const loader = async () => {
  try {
    const data = await customFetch.get("/assignment-tasks");
    if (data) return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
function AssignmentTasks() {
  const { assignment } = useViewAssignmentContext();
  const { data } = useLoaderData();

  const Tasks = data?.tasks;
  const assignmentTasks = Tasks?.filter(
    (task) => task.assignment === assignment._id
  );

  return (
    <main>
      {assignmentTasks?.length > 0 ? (
        assignmentTasks?.map((task) => {
          const { _id } = task;
          return <AssignmentTask key={_id} {...task} />;
        })
      ) : (
        <NoData text='You have no tasks related to your assignment' />
      )}
    </main>
  );
}

export default AssignmentTasks;
