import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { DashTitle, FormRow } from "../../components";
import { useDashboardContext } from "../Layouts/DashboardLayout";
import { toast } from "react-toastify";
import customFetch from "../../Utils/customFetch";
export const action = async ({ request }) => {
  const data = await request.formData();
  const file = data.avatar;

  if (file && file.size > 100000) {
    toast.error("File is too large");

    return null;
  }

  try {
    await customFetch.patch("/users/update-user", data);
    toast.success("Profile has been updated successfully");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return error;
  }
};
function Profile() {
  const { email, name, location, avatar } = useDashboardContext().user;

  const isSubmitting = useNavigation().state === "submitting";
  return (
    <main>
      <div className='max-w-md'>
        <img
          src={avatar}
          alt='avatar'
          className='h-[80px] object-cover font-extrabold text-md  rounded-full w-[80px] ml-3  grid items-center justify-center cursor-pointer'
        />
        <Form method='post' className='form' encType='multipart/form-data'>
          <DashTitle main='Profile' />
          <div className='max-w-md m-auto'>
            <div className='form-row'>
              <label htmlFor='avatar' className='py-4'>
                select an image file (max 1 MB)
              </label>
              <input type='file' name='avatar' id='avatar' accept='image/*' />
            </div>
            <FormRow
              label='Name'
              type='text'
              default_value={name}
              name='name'
            />
            <FormRow
              label='Email Address'
              type='email'
              default_value={email}
              name='email'
            />

            <FormRow
              label='location'
              type='text'
              default_value={location}
              name='location'
            />

            <button
              className='text-white bg-gradient-to-r w-full p-2 rounded-md from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br '
              disabled={isSubmitting}
            >
              {isSubmitting ? "Editting" : "Edit"}
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}

export default Profile;
