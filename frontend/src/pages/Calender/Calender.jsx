import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { DashTitle } from "../../components";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const events = [{ title: "Meeting", start: new Date() }];

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
function Calender() {
  const [ scheduleModal, setScheduleModal ] = useState(false);

  const openScheduleModal = () => {
    setScheduleModal(true);
  };
  const closeScheduleModal = () => {
    setScheduleModal(false);
  };
  return (
    <main className=''>
      {/* Schedule Modal */}
      {scheduleModal && (
        <div>
          <div className='bg-gray-900 opacity-[0.95] grid fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-full'>
            <div className='relative p-4 w-full max-w-md max-h-full'>
              <div className='relative bg-white rounded-lg shadow text-gray-950 '>
                <div className='p-4 md:p-5 text-center'>
                  <FaTimes
                    onClick={closeScheduleModal}
                    className=' mx-auto mb-2 text-md cursor-pointer  text-gray-950  text-right'
                  />
                  <h3 className='mb-5 text-lg  text-gray-950 font-normal '>
                    What do you want to schedule?
                  </h3>

                  <Link to='../schedule-my-programs'>
                    <button
                      type='submit'
                      className='text-white bg-blue-600   font-medium rounded-lg text-sm  items-center px-5 py-2.5 text-center '
                    >
                      My Work
                    </button>
                  </Link>

                  <Link to='../schedule-an-event'>
                    <button
                      type='button'
                      className='text-white bg-green-600 hover:bg-gray-900  focus:outline-none  rounded-lg border  text-sm font-medium px-5 py-2.5   '
                    >
                      An Event
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='mb-8'>
        <DashTitle
          main='Schedule an Event or your Goals, Assignments and Tasks'
          subtitle='Do your work on time'
        />
        <button
          onClick={openScheduleModal}
          className='block w-fit text-white bg-blue-600 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5  '
          type='submit'
        >
          Schedule
        </button>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={false}
          events={events}
          eventContent={renderEventContent}
        />
      </div>
    </main>
  );
}

export default Calender;
