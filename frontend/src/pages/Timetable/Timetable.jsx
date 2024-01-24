import React from "react";
import styled from "styled-components";
import { DashTitle } from "../../components";
function Timetable() {
  const timetableData = [
    {
      id: "1223",
      dayOfWeek: "Sun",
      startTime: "12:00",
      endTime: "8:00",
      subject: "Chemistry",
      location: "Computer Science",
    },
    {
      id: "123",
      dayOfWeek: "Sun",
      startTime: "12:00",
      endTime: "8:00",
      subject: "Chemistry",
      location: "Computer Science",
    },
    {
      id: "23",
      dayOfWeek: "Sun",
      startTime: "12:00",
      endTime: "8:00",
      subject: "Chemistry",
      location: "Computer Science",
    },
  ];

  return (
    <div className='w-full'>
      <div className='mb-10'>
        <DashTitle
          main='Study Timetable'
          subtitle='Easily manage your study scheduels'
        />
      </div>
      <table className='w-full text-left'>
        <thead>
          <tr>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Subject</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {timetableData.map((entry) => (
            <tr key={entry.id}>
              <td className='py-10'>{entry.dayOfWeek}</td>
              <td className='py-10'>{entry.startTime}</td>
              <td className='py-10'>{entry.endTime}</td>
              <td className='py-10'>{entry.subject}</td>
              <td className='py-10'>{entry.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
