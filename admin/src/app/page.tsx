"use client";

import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";
import LoginPage from "./login/page";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Admin from "../app/admin/page"
import Doctor from "../app/doctors/page"

export default function AdminHome() {
  const adminContext = useContext(AdminContext);

  if (!adminContext) return null;

  const { atoken } = adminContext;

  return (
    <>
      {atoken ? (
          <div>
            <Admin/>
            <Doctor />
          </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
