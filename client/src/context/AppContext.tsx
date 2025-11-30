"use client"

import React, { createContext, ReactNode, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

interface AppContextType {
  doctors: any[];
  backend_url: string | undefined;
}

export const AppContext = createContext<AppContextType | null>(null)

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const getDoctorsData = async()=>{
        try{
            const {data} = await axios.get(`${backend_url}/api/doctor/list`)
            if(data.success){
                setDoctors(data.doctors)
            }
        } catch(error) {
            console.log(error)
            
        toast.error("Cannot Get Doctors")
        }
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

  return (
    <AppContext.Provider value={{ doctors, backend_url }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
