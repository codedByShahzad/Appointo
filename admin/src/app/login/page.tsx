"use client";

import { AdminContext } from "@/context/AdminContext";
import React, { useState, FormEvent, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const AdminLogin: React.FC = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter()

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [loading, setLoading] = useState<boolean>(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // AdminContext
  const adminContext = useContext(AdminContext);
  if (!adminContext) {
    throw new Error("AdminLogin must be used inside AdminContextProvider");
  }
  const { setAtoken, backend_url } = adminContext;

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post(`${backend_url}/api/admin/login`, {
        email,
        password,
        role: state.toLowerCase(),
      });

      const data = res.data;

      if (data.success) {
        toast.success("Admin logged in successfully");
        console.log("Admin logged in successfully")
        localStorage.setItem("atoken", data.token);
        console.log(data.token)
        setAtoken(data.token);
        router.push("/")
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          {state} Login
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder={`Enter ${state.toLowerCase()} email`}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none text-sm`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              placeholder={`Enter ${state.toLowerCase()} password`}
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none text-sm`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white py-2 rounded-md transition`}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin my-1"></span>
            ) : (
              "Login"
            )}
          </button>

          {/* Toggle Login Type */}
          <p className="text-center text-sm text-gray-600 mt-2">
            {state === "Admin" ? (
              <>
                Doctor Login?{" "}
                <button
                  type="button"
                  onClick={() => setState("Doctor")}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Click here
                </button>
              </>
            ) : (
              <>
                Admin Login?{" "}
                <button
                  type="button"
                  onClick={() => setState("Admin")}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Click here
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
