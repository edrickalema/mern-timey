import React from "react";
import { ButtonLoading, DashTitle } from "../../components";
import { Editor } from "@tinymce/tinymce-react";
import {
  useLoaderData,
  Form,
  redirect,
  Link,
  useNavigation,
} from "react-router-dom";
import { FormRow } from "../../components";
import customFetch from "../../Utils/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/notes/${params.id}`);
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/notes/${params.id}`, data);
    toast.success("Note updated successfully");
    return redirect("/dashboard/notes");
  } catch (error) {
    console.log(error);
    return error;
  }
};
function OpenNote() {
  const isSubmitting = useNavigation().state == "submitting";
  const { data } = useLoaderData();

  const note = data;

  console.log(note);
  return (
    <main>
      <Form method='post'>
        <FormRow
          type='text'
          default_value={note?.title}
          name='title'
          label={"Title"}
        />
        <Editor
          name='description'
          selector='textarea'
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
          initialValue={note?.body || ""}
          textareaName='body'
        />
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

export default OpenNote;
