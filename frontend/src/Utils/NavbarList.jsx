import { TbTargetArrow } from "react-icons/tb";
import {
  FaCalendarAlt,
  FaHome,
  FaSdCard,
  FaTachometerAlt,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
export const NavbarTopList = [
  {
    path: ".",
    icon: <MdDashboard />,
    name: "Dashboard",
  },
  {
    path: "todos",
    icon: <FaTasks />,
    name: "Todos",
  },
  {
    path: "goals",
    icon: <TbTargetArrow />,
    name: "Goals",
  },

  {
    path: "assignments",
    icon: <FaCheck />,
    name: "Assignments",
  },
  {
    path: "notes",
    icon: <FaRegEdit />,
    name: "Notes",
  },
];

export const NavbarBottomList = [
  // {
  //     path:'study-time-table',
  //     icon:<FaTableList />,
  //     name: 'Timetable'
  // },
  // {
  //     path:'study-calender',
  //     icon:<FaCalendarAlt />,
  //     name: 'Calender'
  // },
];
