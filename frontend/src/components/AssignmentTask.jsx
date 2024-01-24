import React, { useState, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Badge from "./Badge";
import { Task_Color_Decider } from "../Utils/colorDecider";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../Utils/customFetch";
import { useNavigation } from "react-router-dom";
import { AssignmentTaskModal, ConfirmModal } from "../Modals";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
dayjs.extend(advancedFormat);

function AssignmentTask({
  _id,
  task,
  status,
  due_date,
  description,
  level,
  assignment,
}) {
  const isSubmitting = useNavigation().state === "submitting";
  const [initialStatus, setInitialStatus] = useState(status || false);
  const [editModal, setEditModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };
  const openEditModal = () => {
    setEditModal(true);
  };
  const handleChange = () => {
    setInitialStatus((prev) => !prev);
  };
  const handleSubmit = async () => {
    try {
      await customFetch.patch(`assignment-tasks/${_id}`, {
        status: initialStatus,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [initialStatus]);

  return (
    <main>
      {deleteModal && (
        <ConfirmModal
          callback={closeDeleteModal}
          action={`/dashboard/view-assignments/${assignment}/tasks/${_id}`}
          title='Task'
        />
      )}

      {editModal && (
        <AssignmentTaskModal
          task={task}
          level={level}
          due_date={due_date}
          description={description}
          callback={closeEditModal}
          assignment={assignment}
          _id={_id}
        />
      )}
      <div className='py-5 border-b-2'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start '>
            <input
              className='inline-block flex-shrink-0'
              type='checkbox'
              name='status'
              id='status'
              initialStatus={initialStatus}
              checked={initialStatus}
              onChange={handleChange}
            />
            <h3 className='mx-2 text-zinc-950 text-md font-extrabold'>
              {task ? task : ""}{" "}
              <Badge
                color={Task_Color_Decider(level)}
                background={Task_Color_Decider(level)}
                text={level}
              />{" "}
            </h3>
          </div>
          <div className='flex space-x-2'>
            <EditBtn action={openEditModal} />
            <DeleteBtn action={openDeleteModal} />
          </div>
        </div>
        <p className='text-sm py-[.25rem] text-zinc-500'>{description}</p>
        <div>
          <h2 className='text-sm text-zinc-500'>
            Due Date:{" "}
            <span className='text-red-600 text-md font-extrabold'>
              {dayjs(due_date).format("DD/MM/YY")}
            </span>
          </h2>
        </div>
      </div>
    </main>
  );
}

export default AssignmentTask;
