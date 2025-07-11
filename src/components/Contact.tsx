import React from 'react';
import Link from 'next/link';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
} from 'react-icons/fa';
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";



const Contact = () => {
    return (
      <section id="contact" className="w-full py-16 bg-white">
        <div className="lg:max-w-5/6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10 text-center md:text-left">
            Request a Free Consultation
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-xl md:p-12 p-4">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                  />
                </div>

                <select className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498DB]">
                  <option>How can we help?</option>
                  <option>Auto Accident</option>
                  <option>{`Workers' Compensation`}</option>
                  <option>Labor Law Issue</option>
                </select>

                <textarea
                  placeholder="Additional Details"
                  rows={4}
                  className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                ></textarea>

                <button
                  type="submit"
                  className="bg-[#3498DB] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#2983c0] transition cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-between md:px-12 px-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-8">
                  Our Contact:
                </h2>

                <div className="space-y-6 text-gray-700 text-md">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-[#3498DB] text-white rounded-full">
                      <FiPhoneCall className="text-xl md:text-2xl" />
                    </div>
                    <div>
                      <p className="text-xs text-[#3498DB]">Phone No:</p>
                      <p className="font-medium text-black text-base sm:text-lg lg:text-xl">
                        (215) 269-7830
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-[#3498DB] text-white rounded-full">
                      <FiMail className="text-xl md:text-2xl" />
                    </div>
                    <div>
                      <p className="text-xs text-[#3498DB]">Email:</p>
                      <p className="font-medium text-black text-base sm:text-lg lg:text-xl">
                        info@hamilton.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-[#3498DB] text-white rounded-full text-lg">
                      <GrLocation className="text-xl md:text-2xl" />
                    </div>
                    <div>
                      <p className="text-xs text-[#3498DB]">Address:</p>
                      <p className="font-medium text-black text-base sm:text-lg lg:text-xl">
                        1107 Branagan Dr, Bristol, PA 19007
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-10">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  Follow On:
                </h2>
                <div className="">
                  <ul className="flex items-center space-x-3">
                    <li>
                      <Link
                        href="#"
                        className="flex items-center justify-center text-white transition-all duration-200 bg-[#3498DB] rounded-full w-9 h-9"
                      >
                        <FaFacebookF className="w-4 h-4 text-white" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center justify-center text-white transition-all duration-200 bg-[#3498DB] rounded-full w-9 h-9"
                      >
                        <FaTwitter className="w-4 h-4 text-white" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center justify-center text-white transition-all duration-200 bg-[#3498DB] rounded-full w-9 h-9 "
                      >
                        <FaInstagram className="w-4 h-4 text-white" />
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="#"
                        className="flex items-center justify-center text-white transition-all duration-200 bg-[#3498DB] rounded-full w-9 h-9 "
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
