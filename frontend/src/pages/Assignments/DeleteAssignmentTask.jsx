import React from "react";
import { redirect } from "react-router-dom";
import customFetch from "../../Utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  console.log(params)
  try {
    const response = await customFetch.delete(
      `/assignment-tasks/${params.task_id}`
    );
    console.log(params)
    toast.success(
      response?.data?.message || "Assignment tasks deleted successfully"
    );
    return redirect(`/dashboard/view-assignments/${params.id}`);
  } catch (error) {
    console.log(error);
  }
};
