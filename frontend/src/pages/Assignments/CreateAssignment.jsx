import React, { useEffect, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";

import customFetch from "../../Utils/customFetch";

import { Assignment_Status } from "../../../../constants/assignStatus";
import { ButtonLoading, DashTitle } from "../../components";
import { Form, redirect, Link, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { getDocumentTitle } from "../../Utils/DocumentTitle";
dayjs.extend(advancedFormat);
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/study-assignments", data);
    toast.success("Assignments successfully created");
    return redirect("/dashboard/assignments");
  } catch (error) {
    toast.error(error);
    return error;
  }
};

function CreateAssignment() {
  const isSubmitting = useNavigation().state === "submitting";
  const [goal, setGoals] = useState([]);

  const get_Goals = async () => {
    const goals = await customFetch.get("/study-goals");
    if (goals) {
      setGoals(goals?.data?.goals);
    }
  };

  useEffect(() => {
    getDocumentTitle("Create Assignment");
    get_Goals();
  }, []);
  return (
    <main className=''>
      <div className='mb-5 text-center'>
        <DashTitle
          main='Create An Assignment'
          subtitle='Simply add your assingnment and start tracking progress'
        />
      </div>
      <Form className='max-w-[700px] m-auto' method='post'>
        <div className='grid gap-6'>
          <div>
            <label
              htmlFor='title'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              What is your assignment?
            </label>
            <input
              type='text'
              id='title'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
              placeholder='Goal title'
              name='title'
              required
            />
          </div>

          <div className='flex max-md:block items-center justify-between'>
            <div>
              <label
                htmlFor='categories'
                className='block my-2 text-sm font-medium text-gray-900'
              >
                Select Related Goal
              </label>
              <select
                name='related_goal'
                id='relateed_goal'
                className='bg-gray-50 border  border-gray-300 text-gray-950 text-md rounded-lg block w-full p-2.5  outline-none'
              >
                {goal?.map((goal) => {
                  const { title, _id } = goal;
                  return (
                    <option className='text-sm' value={title} key={_id}>
                      {title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label
                htmlFor='categories'
                className='block my-2 text-sm font-medium text-gray-900'
              >
                Assignment Status
              </label>
              <select
                name='status'
                id='status'
                className='bg-gray-50 border  border-gray-300 text-gray-950 text-md rounded-lg block w-full p-2.5  outline-none'
              >
                <option className='text-sm' value={Assignment_Status.PENDING}>
                  {Assignment_Status.PENDING}
                </option>
                <option className='text-sm' value={Assignment_Status.COMPLETED}>
                  {Assignment_Status.COMPLETED}
                </option>
                <option className='text-sm' value={Assignment_Status.STARTED}>
                  {Assignment_Status.STARTED}
                </option>
              </select>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <label
                htmlFor='Start Date'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Start Date
              </label>
              <input
                type='date'
                id='startDate'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
                placeholder='20/01/2024'
                name='startDate'
                defaultValue={dayjs(new Date(Date.now())).format("DD-MM-YYYY")}
              />
            </div>
            <div>
              <label
                htmlFor='Finish Date'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Finish Date
              </label>
              <input
                type='date'
                id='finishDate'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
                defaultValue={dayjs(new Date(Date.now())).format("DD-MM-YYYY")}
                name='finishDate'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='summary'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Sumarize your assignment
            </label>
            <textarea
              id='summary'
              rows='4'
              name='summary'
              className='block p-2.5 w-full text-sm text-gray-900 outline-none bg-white rounded-lg border border-gray-300    '
              placeholder='Write your thoughts here...'
            ></textarea>
          </div>

          <div>
            <label
              htmlFor='title'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Describe your assignment?
            </label>

            <Editor
              name='description'
              apiKey=' d1m6awpusrsav9fet31cwq95y1mp62lsmrtmcn1dph22quf3'
              init={{
                plugins:
                  "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request, respondWith) =>
                  respondWith.string(() =>
                    Promise.reject("See docs to implement AI Assistant")
                  ),
              }}
              initialValue='Describe your assignment'
              textareaName='description'
            />
          </div>
        </div>

        <div className='mt-4'>
          <button
            disabled={isSubmitting}
            className='block w-fit text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  '
            type='submit'
          >
            {isSubmitting ? <ButtonLoading text='Saving' /> : "Save"}
          </button>
        </div>
      </Form>
    </main>
  );
}

export default CreateAssignment;
