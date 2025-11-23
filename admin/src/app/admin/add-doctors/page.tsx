"use client";

import React, { useContext, useState } from "react";
import { User } from "lucide-react";
import { AdminContext } from "@/context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  // ---------------------- STATE ----------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    fees: "",
    speciality: "",
    education: "",
    address: {
      line1: "",
      line2: "",
    },
    about: "",
    image: null as File | null,
  });

  const adminContext = useContext(AdminContext);

  if (!adminContext) {
    return null;
  }

  const { backend_url, atoken } = adminContext;

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | any
  ) => {
    const { name, value, files } = e.target as HTMLInputElement & {
      files: FileList | null;
    };

    // Handle file input (image upload)
    if (files) {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file, // 👈 always update "image" key
        }));

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
      return;
    }

    // Handle nested address fields
    if (name === "line1" || name === "line2") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
      return;
    }

    // Handle normal text/select inputs
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------------- SUBMIT FUNCTION ----------------------
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email) {
    toast.error("Please fill all required fields.");
    return;
  }

  const payload = new FormData();
  payload.append("name", formData.name);
  payload.append("email", formData.email);
  payload.append("password", formData.password);
  payload.append("speciality", formData.speciality);
  payload.append("experience", formData.experience);
  payload.append("degree", formData.education);
  payload.append("fee", formData.fees);
  payload.append("about", formData.about);
  payload.append("available", "true");
  payload.append("date", Date.now().toString());
  payload.append("address", JSON.stringify(formData.address));
  if (formData.image) payload.append("image", formData.image);

  try {
    const { data } = await axios.post(
      `${backend_url}/api/admin/add-doctor`,
      payload,
      {
        headers: {
          atoken,          // ✅ let axios handle Content-Type
        },
      }
    );

    if (data.success) {
      toast.success(data.message || "Doctor Added");
    } else {
      toast.error(data.message || "Something went wrong");
    }
  } catch (error: any) {
    console.error("ADD DOCTOR ERROR:", error?.response?.data || error);
    toast.error(error?.response?.data?.message || "Bad Request from server");
  }
};


  return (
    <div className="min-h-screen bg-[#F6F7FB] px-6 py-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Add Doctor</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-8">
          {/* Upload Image Section */}
          <label className="flex flex-col md:flex-row items-start gap-3 min-w-40 cursor-pointer mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Doctor preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>

            <p className="text-sm text-gray-600 leading-snug">
              Upload doctor
              <br />
              picture
            </p>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Form fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                {/* Doctor name */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Doctor name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#596CFF]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Doctor Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#596CFF]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Doctor Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#596CFF]"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#596CFF]"
                  >
                    <option value="">Experience</option>
                    <option>0–1 years</option>
                    <option>1–3 years</option>
                    <option>3–5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                {/* Fees */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Fees
                  </label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    placeholder="Your fees"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#596CFF]"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4">
                {/* Speciality */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Speciality
                  </label>
                  <select
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#596CFF]"
                  >
                    <option value="">Select speciality</option>
                    <option>General physician</option>
                    <option>Cardiologist</option>
                    <option>Dermatologist</option>
                    <option>Neurologist</option>
                    <option>Pediatrician</option>
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Education"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="line1"
                    value={formData.address.line1}
                    onChange={handleChange}
                    placeholder="Address 1"
                    className="mb-3 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    name="line2"
                    value={formData.address.line2}
                    onChange={handleChange}
                    placeholder="Address 2"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="mt-6">
            <label className="block text-sm text-gray-700 mb-1">About me</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={5}
              placeholder="Write about yourself"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-[#596CFF] text-white px-8 py-2 rounded-full text-sm font-medium shadow-sm hover:opacity-90 transition"
            >
              Add doctor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
