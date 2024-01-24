import React from "react";
import customFetch from "../../Utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    const id = params.id;
    await customFetch.delete(`/study-goals/${id}`);
    toast.success("Goal has been successfully deleted");
  } catch (error) {
    return error;
  }

  return redirect("/dashboard/goals");
};
