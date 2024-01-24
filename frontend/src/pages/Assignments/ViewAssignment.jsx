import React, { createContext, useContext, useEffect, useState } from "react";
import customFetch from "../../Utils/customFetch";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import {
  Badge,
  Button,
  ButtonLoading,
  DashTitle,
  FormRow,
} from "../../components";
import { color_Decider } from "../../Utils/colorDecider";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { getDocumentTitle } from "../../Utils/DocumentTitle";
dayjs.extend(advancedFormat);

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/assignment-tasks", {
      assignment: params.id,
      ...data,
    });
    if (response) toast.success("Assignment Task Added Successfully");
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/study-assignments/${params.id}`);
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
};

// Context for sharing assignmnets
const viewAssignmentContext = createContext();

function ViewAssignment() {
  const isSubmitting = useNavigation().state === "submitting";
  const [taskModal, setTaskModal] = useState(isSubmitting);
  const [assignmentTask, setAssignmentTask] = useState([]);

  const getAssignmentTasks = async () => {
    try {
      const assignmentData = await customFetch.get("/assignment-tasks");
      if (assignmentData) setAssignmentTask(assignmentData);
    } catch (error) {
      console.log(error);
    }
  };
  // Toggle open Add task modal
  const openAddTaskModal = () => {
    setTaskModal(true);
  };

  // Toggle close add task modal
  const closeAddTaskModal = () => {
    setTaskModal(false);
  };

  useEffect(() => {
    getDocumentTitle("Assignment");
    getAssignmentTasks();
    closeAddTaskModal(isSubmitting);
  }, [isSubmitting]);

  const { data } = useLoaderData();
  const assignment = data?.assignment;

  const { title, status, startDate, finishDate, _id } = assignment;

  const tasks = assignmentTask?.data?.tasks.filter(
    (task) => task.assignment === assignment._id
  );

  const total_Tasks = tasks?.length;
  const completed_Tasks = tasks?.reduce(
    (acc, task) => (task.status === true ? acc + 1 : acc),
    0
  );

  const assignment_task_progress = (completed_Tasks / total_Tasks) * 100;

  const progress_indicator_width = isNaN(assignment_task_progress)
    ? 0
    : assignment_task_progress.toFixed(0);
  return (
    <viewAssignmentContext.Provider value={{ assignment }}>
      <main id='assignment'>
        {/* Add ASSIGNMENT task modal */}
        {taskModal && (
          <div className=' bg-black/50  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full flex h-full'>
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
              {/* <!-- Modal content --> */}
              <div className='rounded-lg bg-white p-10 max-md:p-5 text-zinc-950 max-w-[500px] m-auto'>
                {/* <!-- Modal header --> */}
                <div className='flex items-center justify-between  '>
                  <DashTitle
                    main='Assignment Tasks'
                    subtitle='Manage tasks related to your assignment'
                  />
                  <button
                    onClick={closeAddTaskModal}
                    type='button'
                    className=' text-zinc-950 bg-gray-200 hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  '
                  >
                    <FaTimes />
                  </button>
                </div>

                <Form method='post'>
                  <FormRow label='Task title' name='task' type='text' />
                  <FormRow
                    label='Due Date'
                    name='due_date'
                    type='date'
                    default_value={dayjs(new Date()).format("DD/MM/YYYY")}
                  />
                  <label
                    for='description'
                    className='block mb-2 text-md font-medium text-gray-900 '
                  >
                    Description
                  </label>
                  <textarea
                    id='description'
                    rows='4'
                    name='description'
                    className='block p-2.5 w-full text-sm text-gray-900 outline-none bg-white rounded-lg border border-gray-300    '
                    placeholder='Write your thoughts here...'
                  ></textarea>
                  <label
                    htmlFor='Level'
                    className='block my-2 text-md font-medium text-gray-900'
                  >
                    Select an option
                  </label>
                  <select
                    name='level'
                    id='priorities'
                    className='bg-gray-50 border border-gray-300 text-gray-950 text-md rounded-lg block w-full p-2.5  outline-none'
                  >
                    <option defaultValue>
                      What is the level of your todo?
                    </option>
                    <option value='High'>High</option>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                  </select>

                  <button
                    disabled={isSubmitting}
                    className='block w-fit text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  '
                    type='submit'
                  >
                    {isSubmitting ? (
                      <ButtonLoading text='Adding ...' />
                    ) : (
                      "Add Task"
                    )}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        )}
        {/* End of add assignmnet task modal */}
        <section className=' bg-white/55 p-5 shadow-sm rounded view'>
          <div className=' mb-5'>
            <div className='items-center max-md:block justify-between flex'>
              <div className='flex max-md:block items-start max-md:my-5'>
                <div className='h-[50px] w-[50px]  flex items-center justify-center rounded bg-gradient-to-b text-white from-blue-500 to-blue-600'>
                  <span>{title?.charAt(0)}</span>
                </div>
                <h2 className='ml-2 max-md:ml-0 max-md:mt-5 text-zinc-950 font-extrabold text-lg'>
                  {title ? title : ""}
                </h2>
              </div>

              <div className='flex'>
                <div className='mr-2' onClick={openAddTaskModal}>
                  <Button
                    text='Add Task'
                    onClick={openAddTaskModal}
                    background='black'
                  />
                </div>
                <Link to={`../edit-assignments/${_id}`} className=''>
                  <Button text='Edit' />
                </Link>
              </div>
            </div>

            <div className='flex items-start max-md:block my-8 justify-between'>
              <div className='flex items-start justify-between space-x-4'>
                <div className='flex flex-shrink-0 flex-col items-start justify-start'>
                  <h3 className='text-zinc-400 text-sm mb-2'>Status</h3>
                  <Badge
                    color={color_Decider(status)}
                    background={color_Decider(status)}
                    text={status}
                  />
                </div>
                <div className='flex  flex-shrink-0 flex-col my-2 items-start justify-start'>
                  <h3 className='text-zinc-400 text-sm mb-2'>Start Date</h3>
                  <p className='font-bold text-md text-zinc-950'>
                    {dayjs(startDate).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className='flex  flex-shrink-0 flex-col my-2 items-start justify-start'>
                  <h3 className='text-zinc-400 text-sm mb-2'>Finish Date</h3>
                  <p className='font-bold text-md text-zinc-950'>
                    {dayjs(finishDate).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>

              <div className=''>
                <h3 className='text-zinc-400 text-sm mb-2'>
                  Task progress {`(${progress_indicator_width}/100)%`}
                </h3>
                <div className='w-[300px] bg-gray-200 rounded-full h-2.5 '>
                  <div
                    className='bg-black h-2.5 rounded-full'
                    style={{ width: `${progress_indicator_width}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div></div>

          <ul className='flex flex-wrap text-sm font-medium text-center  '>
            <li class='me-2'>
              <NavLink
                to={`../view-assignments/${_id}`}
                className={`${({}) => {
                  isPending ? "" : isActive ? "" : "";
                }} `}
                end={true}
              >
                <span className=' p-4 text-zinc-950  rounded-lg'>Details</span>
              </NavLink>
            </li>
            <li className='me-2'>
              <NavLink
                to={`../view-assignments/${_id}/tasks`}
                className={`${({}) => {
                  isPending ? "" : isActive ? "active" : "";
                }}`}
                end
              >
                <span className='p-4  text-zinc-950 rounded-lg'>Tasks</span>
              </NavLink>
            </li>
    
          </ul>
        </section>
        <section className='mt-8 bg-white/4'>
          <Outlet context={{ assignment }} />
        </section>
      </main>
    </viewAssignmentContext.Provider>
  );
}

export const useViewAssignmentContext = (context) =>
  useContext(viewAssignmentContext);

export default ViewAssignment;
