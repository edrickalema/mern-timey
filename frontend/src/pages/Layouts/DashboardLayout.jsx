import React, { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../../Utils/customFetch";

import { toast } from "react-toastify";
import {
  DashboardNavbar,
  DesktopAside,
  Logo,
  MobileAside,
} from "../../components";

export const userLoader = async () => {
  try {
    const data = await customFetch.get("/users/user");
    return data;
  } catch (error) {
    toast.info('You must be authenticated to access this page')
    return redirect("/login");
  }
};

// export const combinedLoader = async () => {
//   return Promise.all(userLoader(),[todoLoader()]);
// };

const DashboardContext = createContext();

function DashboardLayout() {
  const navigate = useNavigate();
  const { data } = useLoaderData();

  const user = data;

  const [showNavbar, setShowNavbar] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const openLogoutContainer = () => {
    setShowLogout((prev) => !prev);
  };
  const openNavbar = () => {
    setShowNavbar(true);
  };
  const closeNavbar = () => {
    setShowNavbar(false);
  };
  const logout = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("logged out succesfully");
  };

  return (
    <DashboardContext.Provider
      value={{
        openNavbar,
        showNavbar,
        closeNavbar,
        showLogout,
        openLogoutContainer,
        user,
        logout,
      }}
    >
      <main className='grid-container max-md:block text-zinc-950  grid grid-cols-5'>
        <div className='bg-slate-950 text-zinc-500'>
        
          <div className=''>
            <MobileAside />
            <DesktopAside />
          </div>
        </div>

        <div className='col-span-4 '>
          <div>
            <DashboardNavbar />
          </div>
          <div className='max-md:p-2 p-5 bg-gray-100 min-h-[100vh]'>
            <Outlet context={{ user }} />
          </div>
        </div>
      </main>
    </DashboardContext.Provider>
  );
}

export default DashboardLayout;
export const useDashboardContext = (context) => useContext(DashboardContext);
