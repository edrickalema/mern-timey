import React, { useRef } from "react";
import { useViewAssignmentContext } from "./ViewAssignment";
import { MdDryCleaning } from "react-icons/md";
import parse from "html-react-parser";
function AssignmentDetail() {
  const descriptionRef = useRef(null);
  const { assignment } = useViewAssignmentContext();

  const { summary, description, related_goal } = assignment;


  if (descriptionRef.current != null) {
    descriptionRef.current.innerText = description;
  }
  return (
    <section className='shadow rounded p-5'>
      <div className='p-5 bg-blue-100 w-fit'>
        <p className='text-sm'>
          Related Goal:{" "}
          <span className='text-lg font-extrabold text-zinc-950'>
            {related_goal}
          </span>
        </p>
      </div>
      <div className='my-8'>
        <h3 className='text-md font-bold mb-2'>Summary</h3>
        <p className='text-sm bg-zinc-200 p-5'>{summary}</p>
      </div>
      <div>
        <h3 className='text-md font-bold mb-2 leading-4'>Description</h3>
        <div className='text-sm text-zinc-500' ref={descriptionRef}>
          {parse(description)}
        </div>
      </div>
    </section>
  );
}

export default AssignmentDetail;
