import React, { useEffect } from "react";
import { Link, useNavigation, Form, redirect } from "react-router-dom";
import customFetch from "../../Utils/customFetch";
import { toast } from "react-toastify";
import { Button, FormRow, Logo, SubmittingButton } from "../../components";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("successfully logged in");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/");
  }
};
function Login() {
  useEffect(() => {
    document.title = "Timey - Login";
  }, []);

  const navigate = useNavigation();

  const isSubmitting = navigate.state === "submitting";
  return (
    <main className='h-screen grid grid-cols-2 max-md:grid-cols-1'>
      <section className='h-[100%] px-4 flex items-center flex-col justify-center max-w-full'>
        <article className='w-full max-w-md'>
          <Logo />
          <div className='mb-5'>
            <h4 className='text-lg font-bold'>Sign in to your account</h4>
            <p className='text-zinc-500 text-sm pt-4'>
              Don't have an Account?
              <Link to='/register'>
                <span className='text-blue-600'> Sign up</span>{" "}
              </Link>
              for free access
            </p>
          </div>
          <Form method='post'>
            <FormRow label='Email' name='email' type='email' />
            <FormRow label='Password' name='password' type='password' />
            {isSubmitting ? (
              <SubmittingButton text='Signing' disabled={isSubmitting} />
            ) : (
              <Button width='full' type='submit' text='Sign in' />
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

export default Login;
