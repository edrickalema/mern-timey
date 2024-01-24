import React from "react";
import customFetch from "../../Utils/customFetch";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/study-assignments/${params.id}`);
    toast.success(`Successfully deleted assignment`);
  } catch (error) {}
  return redirect("/dashboard/assignments");
};
function DeleteAssignment() {
  return <div>DeleteAssignment</div>;
}

export default DeleteAssignment;
