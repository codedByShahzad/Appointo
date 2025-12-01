"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { AppContext, Doctor } from "@/context/AppContext";
import { specialityData } from "../assets/assets_frontend/assets"; // keep as you had

// helper: make slugs like your route param
const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "");

const Doctors = () => {
  const router = useRouter();
  const params = useParams();
  const speciality = (params?.speciality as string | undefined) ?? undefined;

  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { doctors } = appContext;

  const [filterDoc, setFilterDocs] = useState<Doctor[]>([]);

  useEffect(() => {
    if (!doctors) return;

    if (speciality) {
      setFilterDocs(
        doctors.filter(
          (doc) => slugify(doc.speciality) === speciality
        )
      );
    } else {
      setFilterDocs(doctors);
    }
  }, [speciality, doctors]); // 👈 important: depend on BOTH

  return (
    <div>
      <p className="text-gray-600">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-3">
        {/* LEFT – Speciality Filter */}
        <div className="flex flex-col gap-3 text-sm text-gray-600 mt-5">
          {specialityData.map((item, index) => {
            const itemSlug = slugify(item.speciality);
            const isActive = speciality === itemSlug;

            return (
              <p
                key={index}
                className={[
                  "w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 md:py-3 border rounded transition-all cursor-pointer",
                  isActive
                    ? "border-primary bg-indigo-100 text-primary"
                    : "border-gray-300 hover:border-gray-400",
                ].join(" ")}
                onClick={() => {
                  isActive
                    ? router.push("/doctors")
                    : router.push(`/doctors/${itemSlug}`);
                }}
              >
                {item.speciality}
              </p>
            );
          })}
        </div>

        {/* RIGHT – Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {!filterDoc.length ? (
            <p className="text-gray-500 text-sm">No doctors found.</p>
          ) : (
            filterDoc.map((item) => (
              <Link
                href={`/appointment/${item._id}`}
                key={item._id}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500"
              >
                <Image
                  src={item.image}
                  alt="Doctor"
                  className="bg-blue-50 w-full h-[220px] object-cover"
                  width={280}
                  height={280}
                />
                <div className="p-4">
                  <div
  className={`flex items-center gap-2 text-sm ${
    item.available ? "text-green-500" : "text-red-500"
  }`}
>
  <span
    className={`w-2 h-2 rounded-full ${
      item.available ? "bg-green-500" : "bg-red-500"
    }`}
  />
  <span>{item.available ? "Available" : "Not Available"}</span>
</div>

                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {item.speciality}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
