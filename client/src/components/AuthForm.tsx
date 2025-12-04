"use client";
import Link from "next/link";
import React, { useState, FormEvent } from "react";

interface AuthFormProps {
  mode: "Login" | "Sign Up";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [loading, setLoading] = useState<boolean>(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (mode === "Sign Up" && !name.trim()) {
      newErrors.name = "Name is required.";
    }

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

    if (mode === "Sign Up") {
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

    // setTimeout(() => {
    //   console.log(`${mode} successful ✅`, {
    //     name,
    //     email,
    //     password,
    //     confirmPassword,
    //   });
    //   setLoading(false);
    //   setName("");
    //   setEmail("");
    //   setPassword("");
    //   setConfirmPassword("");
    //   setErrors({});
    // }, 1000);

    if(mode == 'Sign Up'){
      
    }

  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          {mode}
        </h1>
        <p className="text-gray-500 text-center mt-1">
          Please {mode.toLowerCase()} to book appointment
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {mode === "Sign Up" && (
            <div>
              <label className="block text-gray-700 text-sm mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="Enter your name"
                className={`w-full px-3 py-2 border ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } rounded-md focus:outline-none text-sm`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

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
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
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
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              } rounded-md focus:outline-none text-sm`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          {mode === "Sign Up" && (
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: undefined });
                }}
                placeholder="Confirm your password"
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } rounded-md focus:outline-none text-sm`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {mode === "Sign Up" ? 
          (
            <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-indigo-600 font-medium hover:underline"
        >
          Login here
        </Link>
      </p>
          )
          :
            (
                <p className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign up here
        </Link>
      </p>
            )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2  ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            } text-white py-2 rounded-md transition-colors`}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin my-1"></span>
            ) : (
              mode
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
