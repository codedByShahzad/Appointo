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
    <div className="p-4 bg-[#f7f8fc] min-h-screen">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">All Doctors</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {doctors?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 group"
          >
            {/* Image */}
            <div className="relative w-full h-70 md:h-54 bg-[#eef2ff] group-hover:bg-primary transition-colors duration-300">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>

              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  defaultChecked={item.available}
                  className="w-4 h-4 rounded border-gray-400"
                  onChange={()=>{changeAvailability(item._id)}}
                />
                <span className="text-sm text-gray-600">Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
