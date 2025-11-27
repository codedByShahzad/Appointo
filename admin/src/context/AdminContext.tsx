'use client'

import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface AdminContextType {
  atoken: string;
  setAtoken: (value: string) => void;
  backend_url: string | undefined;
  doctors: any[];
  getAllDoctors: () => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [atoken, setAtoken] = useState<string>('');
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("atoken");
    if (storedToken) {
      setAtoken(storedToken);
    }
  }, []);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/admin/all-doctors`,
        {},
        { headers: { atoken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
        console.log(data.message)
      }
    } catch (error: any) {
      toast.error(error.message);
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
