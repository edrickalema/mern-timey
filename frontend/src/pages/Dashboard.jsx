import { Metric, Title, Subtitle, Bold, Italic, Text } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import { useDashboardContext } from "./Layouts/DashboardLayout";
import { ProgressCircle } from "@tremor/react";
import { DashboardCard, SmallBtn } from "../components";
import customFetch from "../Utils/customFetch";

const random_quote = Math.floor(Math.random() * 16);

// Loading Todos
export const todoLoader = async () => {
  try {
    const todos_data = await customFetch.get("/todos");

    return todos_data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const get_DashboardData = async () => {
    const goals_data = await customFetch.get("/study-goals");
    const assignments_data = await customFetch.get("/study-assignments");
    if (assignments_data) {
      setAssignments(assignments_data?.data?.assignments);
    }
    if (goals_data) {
      setGoals(goals_data?.data?.goals);
    }
  };
  useEffect(() => {
    document.title = "Timey - Dashboard";
    get_DashboardData();
  }, []);
  const [quotes, setQuotes] = useState([]);
  const todos_data = useLoaderData();

  const todos = todos_data?.data?.todos;
  const pending_tasks = todos.reduce(
    (accumulator, todo) => (todo.status === false ? accumulator + 1 : 0),
    0
  );
  const completed_tasks = todos.reduce(
    (accumulator, todo) =>
      todo.status === true ? accumulator + 1 : accumulator,
    0
  );

  const total_tasks = todos?.length;
  const todo_progress = (completed_tasks / total_tasks) * 100;
  const uncompleted_tasks = todos?.filter((todo) => todo.status === false);

  // Goals
  const completed_goal = goals?.reduce(
    (accumulator, goal) =>
      goal.status === true ? accumulator + 1 : accumulator,
    0
  );
  const total_goals = goals?.length;
  const goal_progress = (completed_goal / total_goals) * 100;

  // Assignmnets
  const completed_assignmnets = assignments?.reduce(
    (accumulator, assignment) =>
      assignment.status === "Completed" ? accumulator + 1 : accumulator,
    0
  );
  const total_assignments = assignments?.length;
  const assignment_progress = (completed_assignmnets / total_assignments) * 100;
  // getting quotes from an api;
  const getQuotes = async () => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then((data) => setQuotes(data));
  };
  useEffect(() => {
    getQuotes();
  }, []);

  const quote = quotes[random_quote];

  return (
    <main>
      {/* Dashboard Header */}
      <div className='max-md:flex-col max-md:text-center  flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-extrabold'>Hi, Welcome</h2>
          <p className='text-zinc-500 text-sm'>
            {quote?.text} <span> - {quote?.author.split(",")[0]}</span>
          </p>
        </div>
      </div>
      {/* Stats */}
      <div className='grid  max-md:block grid-cols-3 gap-5 justify-between mt-10'>
        <DashboardCard
          name='Assignments'
          title1='Total'
          title3='Finished'
          progress={assignment_progress}
          completed={completed_assignmnets}
          total={total_assignments}
        />
        <DashboardCard
          name='Todos'
          title1='Total'
          title2='Active'
          title3='Finished'
          progress={todo_progress}
          completed={completed_tasks}
          total={total_tasks}
          stats={pending_tasks}
        />
        <DashboardCard
          name='Goals'
          title1='Total'
          title3='Archieved'
          progress={goal_progress}
          completed={completed_goal}
          total={total_goals}
        />
      </div>
      {/* Uncompleted Task and Goals */}
    </main>
  );
}

export default Dashboard;
