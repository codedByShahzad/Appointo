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
    localStorage.removeItem("atoken"); // 👈 use the key name
    router.push("/");
  };

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between py-2 px-6">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          <Image
            src={assets.admin_logo}
            alt="Admin Logo"
            width={144}
            height={40}
            className="w-36 sm:w-40 cursor-pointer"
          />

          <span className="ml-4 text-sm border border-gray-500 rounded-full px-5 py-0.5 text-gray-700">
            {atoken ? "Admin" : "Doctor"}
          </span>
        </div>

        {/* RIGHT SECTION */}
        <button
          onClick={handleLogout}
          className="bg-primary text-white flex items-center justify-center gap-2 rounded-full py-2 px-12 font-medium text-sm md:text-base 
         transition-all duration-200 shadow-sm active:scale-[0.97]"
        >
          {atoken ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
