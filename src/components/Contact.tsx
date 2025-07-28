"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import Loader from "./common/Loader";
import { BACKEND_API_BASE_URL } from "@/config/api";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requestedHelp: string;
  additionalDetails: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requestedHelp: "",
    additionalDetails: "",
  });
  const [errors, setErrors] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requestedHelp: "",
    additionalDetails: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData()) return;
    setLoading(true);

    try {
      await axios.post(`${BACKEND_API_BASE_URL}`, formData);
      toast.success("Form submitted successfully!");
      clearData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Failed to submit, Please try again";
        toast.error(message);
      } else {
        toast.error("Failed to submit, Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateFormData = () => {
    let isValidData = true;
    const tempErrors = { ...errors };

    const nameRegex = /^[A-Za-z]+(-[A-Za-z]+)*$/;
    // Validate firstName
    if (formData.firstName.trim() === "") {
      tempErrors.firstName = "First name is required";
      isValidData = false;
    } else if (!nameRegex?.test(formData.firstName)) {
      tempErrors.firstName = "Please enter valid first name";
      isValidData = false;
    } else {
      tempErrors.firstName = "";
    }

    // Validate lastName
    if (formData?.lastName.trim() === "") {
      tempErrors.lastName = "Last name is required";
      isValidData = false;
    } else if (!nameRegex?.test(formData.lastName)) {
      tempErrors.lastName = "Please enter valid last name";
      isValidData = false;
    } else {
      tempErrors.lastName = "";
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email.trim() === "") {
      tempErrors.email = "Email is required";
      isValidData = false;
    } else if (!emailRegex?.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
      isValidData = false;
    } else {
      tempErrors.email = "";
    }

    const usPhoneRegex =
      /^(?:\+1\s?|1\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (formData.phone.trim() === "") {
      tempErrors.phone = "Phone is required";
      isValidData = false;
    } else if (!usPhoneRegex?.test(formData.phone)) {
      tempErrors.phone = "Please enter a valid phone";
      isValidData = false;
    } else {
      tempErrors.phone = "";
    }

    // Validate requested help
    if (formData.requestedHelp.trim() === "") {
      tempErrors.requestedHelp = "How can we help is required";
      isValidData = false;
    } else {
      tempErrors.requestedHelp = "";
    }
    // Validate additional resources
    if (formData.additionalDetails.trim() === "") {
      tempErrors.additionalDetails = "Additional details is required";
      isValidData = false;
    } else {
      tempErrors.additionalDetails = "";
    }

    setErrors(tempErrors);
    return isValidData;
  };

  const clearData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      requestedHelp: "",
      additionalDetails: "",
    });

    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      requestedHelp: "",
      additionalDetails: "",
    });
  };

  return (
    <section id="contact" className="w-full pb-24 bg-white">
      <Toaster />
      <div className="lg:max-w-5/6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-3xl lg:text-4xl font-bold text-text-base mb-10 text-center md:text-left">
          Request a Free Consultation
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-[#FAFAFA] rounded-xl md:p-12 p-4">
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-border-primary bg-white rounded-xl px-4 py-3 text-text-base placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-red-500">
                    {errors.firstName || ""}
                  </span>
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-border-primary bg-white rounded-xl px-4 py-3 text-text-base placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-red-500">
                    {errors.lastName || ""}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-border-primary bg-white rounded-xl px-4 py-3 text-text-base placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-red-500">
                    {errors.email || ""}
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-border-primary bg-white rounded-xl px-4 py-3 text-text-base placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-red-500">
                    {errors.phone || ""}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="">
                  <select
                    name="requestedHelp"
                    value={formData.requestedHelp}
                    onChange={handleChange}
                    className="w-full border border-border-primary bg-white rounded-xl px-4 py-3 text-text-muted placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>How can we help?</option>
                    <option value="Auto Accident">Auto Accident</option>
                    <option value="Workers' Compensation">{`Workers' Compensation`}</option>
                    <option value="Labor Law Issue">Labor Law Issue</option>
                  </select>
                  <span className="text-sm text-red-500">
                    {errors.requestedHelp || ""}
                  </span>
                </div>
                <div className="">
                  <textarea
                    placeholder="Additional Details"
                    name="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-border-primary bg-white rounded-xl px-4 py-3 text-text-base placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                  <span className="text-sm text-red-500">
                    {errors.additionalDetails || ""}
                  </span>
                </div>
              </div>
              <div className="">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-40 flex items-center justify-center bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-[#2983c0] transition cursor-pointer disabled:cursor-not-allowed "
                >
                  {loading ? (
                    <Loader className="text-2xl text-white" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-between md:px-12 px-3">
            <div>
              <h2 className="text-xl sm:text-2xl text-text-base font-bold mb-8">
                Our Contact:
              </h2>

              <div className="space-y-6 text-text-base text-md">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-primary text-white rounded-full">
                    <FiPhoneCall className="text-xl md:text-2xl" />
                  </div>
                  <div>
                    <p className="text-xs text-primary">Phone No:</p>
                    <p className="font-medium text-black text-base sm:text-lg lg:text-xl">
                      (215) 269-7830
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-3 bg-primary text-white rounded-full">
                    <FiMail className="text-xl md:text-2xl" />
                  </div>
                  <div>
                    <p className="text-xs text-primary">Email:</p>
                    <p className="font-medium text-text-base text-base sm:text-lg lg:text-xl">
                      info@hamilton.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-3 bg-primary text-white rounded-full text-lg">
                    <GrLocation className="text-xl md:text-2xl" />
                  </div>
                  <div>
                    <p className="text-xs text-primary">Address:</p>
                    <p className="font-medium text-text-base text-base sm:text-lg lg:text-xl">
                      1107 Branagan Dr, Bristol, PA 19007
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-10">
              <h2 className="text-xl sm:text-2xl text-text-base font-bold mb-4">
                Follow On:
              </h2>
              <div className="">
                <ul className="flex items-center space-x-3">
                  <li>
                    <Link
                      href="#"
                      className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-9 h-9"
                    >
                      <FaFacebookF className="w-4 h-4 text-white" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-9 h-9"
                    >
                      <FaTwitter className="w-4 h-4 text-white" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-9 h-9 "
                    >
                      <FaInstagram className="w-4 h-4 text-white" />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-9 h-9 "
                    >
                      <FaYoutube className="w-4 h-4 text-white " />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
