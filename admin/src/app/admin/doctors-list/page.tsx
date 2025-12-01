"use client";

import { AdminContext } from "@/context/AdminContext";
import Image from "next/image";
import React, { useContext, useEffect } from "react";

const Page = () => {
  const admin = useContext(AdminContext);

  if (!admin) return <div>Context not found!</div>;

  const { doctors, getAllDoctors, atoken, changeAvailability } = admin;

  useEffect(() => {
    if (atoken) getAllDoctors();
  }, [atoken]);

  return (
    <div className="p-6 bg-[#f7f8fc] min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">All Doctors</h1>

      {/* FLEX WRAP CONTAINER */}
      <div className="flex flex-wrap gap-6">
        {doctors?.map((item) => (
          <div
            key={item._id}
            className="
              bg-white 
              border border-blue-200
              rounded-xl 
              overflow-hidden 
              shadow-sm 
              w-[280px]
            "
          >
            {/* IMAGE */}
            <div className="bg-[#eef2ff] flex justify-center items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={280}
                height={190}
                className="object-contain bg-blue-50"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              {/* Custom Radio-Like Toggle */}
              <div
                className="mb-3 flex items-center gap-2 cursor-pointer select-none"
                onClick={() => changeAvailability(item._id)}
              >
                {/* Outer circle (border) */}
                <div
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center
                    border-2
                    transition-colors duration-200
                    ${item.available ? "border-green-500" : "border-red-500"}
                  `}
                >
                  {/* Inner dot with scale + fade animation */}
                  <div
                    className={`
                      w-2.5 h-2.5 rounded-full
                      transition-all duration-200 ease-out
                      ${item.available
                        ? "bg-green-500 scale-100 opacity-100"
                        : "bg-red-500 scale-90 opacity-80"
                      }
                    `}
                  />
                </div>

                {/* Text */}
                <span
                  className={`
                    text-sm font-medium
                    transition-colors duration-200
                    ${item.available ? "text-green-600" : "text-red-600"}
                  `}
                >
                  {item.available ? "Available" : "Not Available"}
                </span>
              </div>

              {/* NAME */}
              <p className="text-gray-900 text-lg font-semibold leading-tight">
                {item.name}
              </p>

              {/* SPECIALITY */}
              <p className="text-gray-600 text-sm mt-1">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
