"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface AdminContextType {
  atoken: string;
  setAtoken: (value: string) => void;
  backend_url: string | undefined;
  doctors: any[];
  getAllDoctors: () => void;
  changeAvailability: (docId: string) => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [atoken, setAtoken] = useState<string>("");
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [doctors, setDoctors] = useState<any[]>([]);

  // Load token on first render
  useEffect(() => {
    const storedToken = localStorage.getItem("atoken");
    if (storedToken) setAtoken(storedToken);
  }, []);

  // Fetch all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/admin/all-doctors`,
        {},
        { headers: { atoken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Change availability
  const changeAvailability = async (docId: string) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/admin/change-availabilty`,
        { docId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors(); // refresh list
      } else {
        toast.error(data.message || "Failed to update availability");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        atoken,
        setAtoken,
        backend_url,
        doctors,
        getAllDoctors,
        changeAvailability,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
