// app/AppShell.tsx
"use client";

import React, { useContext } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AdminContext } from "@/context/AdminContext";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminContext = useContext(AdminContext);

  if (!adminContext) return null;

  const { atoken } = adminContext;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar only when logged in (atoken available) */}
        {atoken && <Sidebar />}

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
