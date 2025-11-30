"use client";

import { AdminContext } from "@/context/AdminContext";
import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const adminContext = useContext(AdminContext);
  if (!adminContext) {
    throw new Error("Navbar must be used inside AdminContextProvider");
  }

  const { atoken, setAtoken } = adminContext;
  const router = useRouter();

  const handleLogout = () => {
    setAtoken("");
    localStorage.removeItem("atoken");
    router.push("/");
  };

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between py-3 px-4 sm:px-6 gap-3 sm:gap-0">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          <Image
            src={assets.admin_logo}
            alt="Admin Logo"
            width={144}
            height={40}
            className="w-28 sm:w-36 md:w-40 cursor-pointer"
          />

          <span className="text-xs sm:text-sm border border-gray-500 rounded-full px-4 sm:px-5 py-0.5 text-gray-700">
            {atoken ? "Admin" : "Doctor"}
          </span>
        </div>

        {/* RIGHT SECTION */}
        <button
          onClick={handleLogout}
          className="bg-primary text-white rounded-full py-2 px-8 sm:px-12 text-sm sm:text-base font-medium 
          transition-all duration-200 shadow-sm active:scale-95 w-full sm:w-auto"
        >
          {atoken ? "Logout" : "Login"}
        </button>

      </div>
    </div>
  );
};

export default Navbar;
