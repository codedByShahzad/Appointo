"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, CalendarDays, UserPlus, Users } from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Appointments", path: "/admin/all-appointments", icon: CalendarDays },
  { name: "Add Doctor", path: "/admin/add-doctors", icon: UserPlus },
  { name: "Doctors List", path: "/admin/doctors-list", icon: Users },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="
        bg-white 
        border-b md:border-0 md:border-r
        border-[#BEBEBE] 
        w-full md:w-64 
        shrink-0
        md:pt-6 pt-2
      "
    >
      <ul
        className="
          flex md:flex-col 
          gap-2 md:gap-4 
          px-2 md:px-0 
          pb-2 md:pb-0 
          overflow-x-auto md:overflow-visible
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.path ||
            (pathname === "/" && item.name === "Dashboard");

          return (
            <li
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`
                relative 
                cursor-pointer 
                flex items-center 
                gap-2 md:gap-3 
                px-4 md:px-6 
                py-2 md:py-3 
                text-xs md:text-sm 
                font-medium 
                whitespace-nowrap
                transition-all
                ${
                  active
                    ? "bg-[#F3F5FF] text-black"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {/* Desktop active right bar */}
              {active && (
                <div className="hidden md:block absolute right-0 top-0 h-full w-1 bg-[#596CFF] rounded-l-full" />
              )}

              {/* Mobile active bottom bar */}
              {active && (
                <div className="md:hidden absolute left-0 bottom-0 w-full h-[3px] bg-[#596CFF] rounded-t-full" />
              )}

              <Icon className="w-4 h-4 md:w-5 md:h-5 text-black" />
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
