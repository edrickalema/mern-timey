import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import {
  DashButton,
  DashTitle,
  NoData,
  RecentNote,
  FormRow,
} from "../../components";
import AddNoteModal from "./AddNoteModal";
import customFetch from "../../Utils/customFetch";
import {
  Link,
  useLoaderData,
  useNavigation,
  Form,
  useNavigate,
  useSubmit,
  useLocation,
} from "react-router-dom";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiDotsVertical,
} from "react-icons/hi";
import { useDashboardContext } from "../Layouts/DashboardLayout";
import moment from "moment";
import { toast } from "react-toastify";

export const loader = async ({ request }) => {
  const searchParams = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const data = await customFetch.get("/notes", {
      params: searchParams,
    });
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
    await customFetch.post("/notes", data);
    toast.success("Note was successfully created");
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

function Notes() {
  const { data } = useLoaderData();
  const isSubmitting = useNavigation().state === "submitting";
  const { user_notes, totalNotes, currentPage, numOfPages } = data;

  console.log(data);
  const { pathname, search } = useLocation();

  const navigate = useNavigate();
  const [note, setNote] = useState(isSubmitting);
  const [recentNotes, setRecentNotes] = useState([]);

  const handleChange = (number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);

    navigate(`${pathname}?${searchParams.toString()}`);
  };
  const showAddNoteModal = () => setNote(true);
  const closeAddNoteModal = () => setNote(false);

  // Recent notes
  const getRecentNotes = async () => {
    const recent_notes = await customFetch.get("/notes/recent-notes");
    console.log(recent_notes);
    if (recent_notes) setRecentNotes(recent_notes?.data?.recentNotes);
  };

  useEffect(() => {
    getRecentNotes();
  }, []);

  const { user } = useDashboardContext();

  const submit = useSubmit();
  return (
    <main>
      <section>
        <div className='flex justify-between items-center mb-5'>
          <DashTitle main='Recent Notes' subtitle='Manage your document' />
          <DashButton
            action={showAddNoteModal}
            text='Add Note'
            background={true}
            hover={true}
          />
        </div>
        <div>{note && <AddNoteModal action={closeAddNoteModal} />}</div>

        <div className='grid grid-cols-3 max-md:grid-cols-1 gap-0 justify-center  items-center'>
          {recentNotes.length > 0 ? (
            recentNotes
              ?.sort((a, b) => a.updatedAt - b.updatedAt)
              .map((note) => <RecentNote {...note} user={user} />)
          ) : (
            <NoData text={"No document opened recently"} />
          )}
        </div>
      </section>
      <section className='my-8'>
        <div className='flex items-start justify-center'>
          <DashTitle main={"Documents"} />
        </div>

        <Form className='flex justify-center items-center'>
          <input
            type='search'
            name='search'
            onChange={(e) => submit(e.currentTarget.form)}
            id='search'
            className='block w-fit mb-6 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 '
            placeholder='Search Notes...'
          />

          <select
            onChange={(e) => submit(e.currentTarget.form)}
            name='sort'
            id='sort'
            className='block w-fit p-2 mb-6  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 '
          >
            <option value='newest'>newest</option>
            <option value='oldest'>oldest</option>
            <option value='a-z'>a-z</option>
            <option value='z-a'>z-a</option>
          </select>
        </Form>

        <div>
          {/* {user_notes.map((note) => (
            <p>{note.title}</p>
          ))} */}
          <table className='w-full text-left bg-white/55 p-5'>
            <thead>
              <tr className='border-b-[1px] text-gray-400'>
                <th className='border-b-[1px] p-5 '>Title</th>
                <th className='border-b-[1px] p-5 '>Author</th>
                <th className='border-b-[1px] p-5 '>Last Updated </th>
                {/* <th className='border-b-[1px] p-5 '>Manage</th> */}
              </tr>
            </thead>
            <tbody className='text-left text-sm text-gray-400'>
              {user_notes.length > 0 &&
                user_notes
                  .sort((a, b) => a.updatedAt - b.updatedAt)
                  .map((note) => (
                    <tr key={note._id}>
                      <Link
                        to={`../notes/${note._id}`}
                        className='p-4 border-b-[1px] text-[1.05rem] font-[900] flex items-start text-gray-800'
                      >
                        <div className='h-[40px] mr-2 w-[40px] grid justify-center items-center bg-blue-200 rounded-md text-blue-600'>
                          {note.title.split(" ")[0].charAt(0)}
                        </div>{" "}
                        {note.title}
                      </Link>
                      <td className='p-4 border-b-[1px] capitalize '>
                        {user.name.split(" ").length > 1
                          ? user.name.split(" ")[1] +
                            " " +
                            user.name.split(" ")[1].charAt(0).toUpperCase()
                          : user.name.split(" ")[1]}
                      </td>

                      <td className='p-4 border-b-[1px] '>
                        {moment
                          .utc(note.updatedAt)
                          .local()
                          .startOf("seconds")
                          .fromNow()}
                      </td>
                      {/* <td className='p-4 border-b-[1px] '>
                        <div className='h-[30px] w-[30px] grid items-center justify-center cursor-pointer rounded-full bg-blue-300 text-blue-600 text-md'>
                          <HiDotsVertical />
                        </div>
                      </td> */}
                    </tr>
                  ))}
            </tbody>
          </table>

          {user_notes.length > 1 && (
            <div className='flex items-center justify-between mt-5'>
              <h3>
                Showing {user_notes.length} of {totalNotes} Notes
              </h3>
              <div className='flex items-center'>
                <button
                  className='flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 '
                  onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) prevPage = numOfPages - 1;
                    handleChange(prevPage);
                  }}
                >
                  <HiChevronDoubleLeft /> <span>Prev</span>
                </button>
                <button
                  onClick={() => {
                    let nextPage = currentPage + 1;
                    if (nextPage > numOfPages) nextPage = 1;
                    handleChange(nextPage);
                  }}
                  className='flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 '
                >
                  <span>Next</span>
                  <HiChevronDoubleRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Notes;
