"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useContext } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);

  if (!appContext) return null;

  const { doctors } = appContext;

  const handleClick = () => {
    router.push("/doctors");
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item) => {
          const isAvailable = item.available; // 👈 from DB

          return (
            <Link
              href={`/appointment/${item._id}`}
              key={item._id}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-500"
            >
              <Image
                src={item.image}
                alt="Doctor Image"
                width={280}
                height={190}
                className="bg-blue-50"
              />
              <div className="p-4">
                {/* ✅ Availability status with colors */}
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      isAvailable ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></p>
                  <p>{isAvailable ? "Available" : "Not Available"}</p>
                </div>

                <p className="text-gray-900 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <Button
        text="More"
        classStyle="text-black px-20 bg-[#EAEFFF] py-4 hover:bg-primary hover:text-white mt-4"
        onClick={handleClick}
      />
    </div>
  );
};

export default TopDoctors;
