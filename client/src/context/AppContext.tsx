"use client";

import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

// 🧑‍⚕️ Doctor type – match your backend fields
export interface Doctor {
  _id: string;
  name: string;
  image: string; // Cloudinary URL
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  available: boolean;
  fee: number; // 👈 use `fee` (not `fees`) to match backend
  address: {
    line1: string;
    line2: string;
  };
}

interface AppContextType {
  doctors: Doctor[];
  backend_url: string | undefined;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}


export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [token, setToken] = useState<string | null>(null); // ⬅ SSR-safe initial value

  // Load token AFTER mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getDoctorsData = async () => {
    try {
      if (!backend_url) {
        console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
        return;
      }

      const { data } = await axios.get(
        `${backend_url}/api/doctor/list`
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error("Failed to fetch doctors");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot get doctors");
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, [backend_url]);

  return (
    <AppContext.Provider value={{ doctors, backend_url, token, setToken}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
