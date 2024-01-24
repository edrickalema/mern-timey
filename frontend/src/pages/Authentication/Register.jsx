import React, { useEffect } from "react";
import { Card } from "@tremor/react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../Utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("register successfully");
    return redirect("/login");
  } catch (error) {
    const message = error?.response?.data.message.toString();
    toast.error(message);
    return error;
  }
};
// import { Button } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { FormRow, Logo, Button, ButtonLoading, SubmittingButton } from "../../components";

function Register() {
  useEffect(() => {
    document.title = "Timey - Sign up";
  }, []);
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <main className='h-screen max-md:px-4 grid grid-cols-2 max-md:grid-cols-1'>
      <section className='h-[100%] py-5 px-4 flex  items-center flex-col justify-center max-w-full'>
        <article className='w-full max-w-md '>
          <Logo />
          <div className='mb-5'>
            <h4 className='text-lg font-bold'>Get Started for free</h4>
            <p className='text-zinc-500 text-sm pt-4'>
              Already have an Account?
              <Link to='/login'>
                <span className='text-blue-600'> Sign in</span>{" "}
              </Link>
              to access
            </p>
          </div>
          <Form method='post'>
            <FormRow label='Name' name='name' type='text' />
            <FormRow label='Email' name='email' type='email' />
            <FormRow label='Password' name='password' type='password' />
            <FormRow label='Confirm' name='confirmPassword' type='password' />

            {isSubmitting ? (
              <SubmittingButton disabled={isSubmitting} text='Signing up'/>
            ) : (
              <Button width='full' type='submit' text='Sign up' />
            )}
          </Form>
        </article>
      </section>
      <section className='bg-blue-600 max-md:hidden flex items-center justify-center text-white'>
        <div>
          <h1 className='font-extrabold text-5xl'>Hi, Welcome to</h1>
          <h1 className='font-extrabold text-5xl py-4'> Timey</h1>
          <p className=''>The ultimate Learning companion</p>
        </div>
      </section>
    </main>
  );
}

export default Register;
