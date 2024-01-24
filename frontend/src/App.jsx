import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as registerAction } from "./pages/Authentication/Register";
import { action as loginAction } from "./pages/Authentication/Login";
import { userLoader as dashboardLoader } from "./pages/Layouts/DashboardLayout";
import { todoLoader as dashboardTodoLoader } from "./pages/Dashboard";
import { loader as goalLoader } from "./pages/Goals/Goals";

import {
  HomeLayout,
  Register,
  Login,
  LandingPage,
  ErrorPage,
  Dashboard,
  DashboardLayout,
  Todos,
  Goals,
  Assignment,
  Notes,
  Resources,
  Calender,
  Profile,
  Timetable,
  Todo,
  EditGoal,
  Goal,
  AddGoal,
  StudyGoalCategory,
  ViewGoal,
  ScheduleMyProgram,
  ScheduleEvent,
  CreateAssignment,
  EditAssignment,
  DeleteAssignment,
  ViewAssignment,
  AssignmentDetail,
  AssignmentTasks,
  AssignmentResources,
  OpenNote,
} from "./pages";

import { action as todoAction, todoLoader } from "./pages/Todos/Todos";
import { action as editTodoAction } from "./pages/Todos/EditTodo";

import DeleteTodo, {
  actions as deleteTodoAction,
} from "./pages/Todos/DeleteTodo";
import { loader as oneTodoLoader } from "./pages/Todos/Todo";
import { action as addGoalAction } from "./pages/Goals/AddGoal";
import { action as deleteGoalAction } from "./pages/Goals/DeleteGoal";

import { loader as viewGoalLoader } from "./pages/Goals/ViewGoal";

import {
  action as EditAction,
  loader as loadGoal,
} from "./pages/Goals/EditGoal";

// Assignment
import { action as createAssignmentAction } from "./pages/Assignments/CreateAssignment";
import { loader as AssignmentLoader } from "./pages/Assignments/Assignment";

import { action as DeleteAssignmentAction } from "./pages/Assignments/DeleteAssignment";

import {
  action as EditAssignmentAction,
  loader as EditAssignmentLoader,
} from "./pages/Assignments/EditAssignment";
import {
  action as viewAssignmentAction,
  loader as viewAssignmentLoader,
} from "./pages/Assignments/ViewAssignment";
import { loader as assignmentTasksLoader } from "./pages/Assignments/AssignmentTasks";
import { action as DeleteAssignmentTaskAction } from "./pages/Assignments/DeleteAssignmentTask";
import { action as EditAssignmentTaskAction } from "./Modals/AssignmentTaskModal";

// Notes
import {
  action as AddNoteAction,
  loader as NotesLoader,
} from "./pages/Notes/Notes";
import {
  action as NoteAction,
  loader as NoteLoader,
} from "./pages/Notes/OpenNote";
import { action as profileAction } from "./pages/Profile/Profile";

// import { userLoader as landingPageLoader } from "./pages/LandingPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <HomeLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "register", element: <Register />, action: registerAction },
        { path: "login", element: <Login />, action: loginAction },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      loader: dashboardLoader,
      children: [
        { index: true, element: <Dashboard />, loader: dashboardTodoLoader },
        {
          path: "todos",
          element: <Todos />,
          action: todoAction,
          loader: todoLoader,
        },
        { path: "goals", element: <Goals />, loader: goalLoader },
        {
          path: "assignments",
          element: <Assignment />,
          loader: AssignmentLoader,
        },
        {
          path: "notes",
          element: <Notes />,
          loader: NotesLoader,
          action: AddNoteAction,
        },
        {
          path: "notes/:id",
          element: <OpenNote />,
          loader: NoteLoader,
          action: NoteAction,
        },
        { path: "resources", element: <Resources /> },
        { path: "study-calender", element: <Calender /> },
        { path: "profile", element: <Profile />, action: profileAction },
        { path: "study-time-table", element: <Timetable /> },
        {
          path: "delete-todo/:id",
          action: deleteTodoAction,
          element: <DeleteTodo />,
        },
        {
          path: "edit-todo/:id",
          // element: <EditTodo />,
          action: editTodoAction,
        },
        { path: "todo/:id", element: <Todo />, loader: oneTodoLoader },
        { path: "add-goal", element: <AddGoal />, action: addGoalAction },
        {
          path: "edit-goal/:id",
          element: <EditGoal />,
          loader: loadGoal,
          action: EditAction,
        },
        { path: "study-goal/:id", element: <Goal /> },
        { path: "study-goal-categories", element: <StudyGoalCategory /> },
        { path: "delete-goal/:id", action: deleteGoalAction },
        {
          path: "view-study-goal/:id",
          element: <ViewGoal />,
          loader: viewGoalLoader,
        },
        { path: "schedule-my-programs", element: <ScheduleMyProgram /> },
        { path: "schedule-an-event", element: <ScheduleEvent /> },
        {
          path: "create-assignment",
          element: <CreateAssignment />,
          action: createAssignmentAction,
        },
        {
          path: "delete-assignments/:id",
          element: <DeleteAssignment />,
          action: DeleteAssignmentAction,
        },
        {
          path: "view-assignments/:id",
          element: <ViewAssignment />,
          loader: viewAssignmentLoader,
          action: viewAssignmentAction,
          children: [
            {
              index: true,
              element: <AssignmentDetail />,
            },
            {
              path: "tasks",
              element: <AssignmentTasks />,
              loader: assignmentTasksLoader,
            },
            { path: "tasks/:taskId", action: EditAssignmentTaskAction },
            {
              path: "resources",
              element: <AssignmentResources />,
            },
            { path: "tasks/:task_id", action: DeleteAssignmentTaskAction },
          ],
        },
        {
          path: "edit-assignments/:id",
          element: <EditAssignment />,
          action: EditAssignmentAction,
          loader: EditAssignmentLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
