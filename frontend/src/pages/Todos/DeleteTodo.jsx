import React from "react";
import { redirect } from "react-router-dom";
import customFetch from "../../Utils/customFetch";
import { toast } from "react-toastify";

export async function actions ({ params })  {
  console.log(params)
  try {
    await customFetch.delete(`/todos/${params.id}`);
    toast.success("Todo deleted successfully");
    return redirect("/dashboard/todos");
  } catch (error) {
    console.log(error);
    return redirect("/dashboard/todos");
  }
};


function DeleteTodo() {
  return (
    <div>DeleteTodo</div>
  )
}

export default DeleteTodo


