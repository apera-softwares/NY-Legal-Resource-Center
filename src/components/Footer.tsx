import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full bg-[#05162A] rounded-t-2xl lg:rounded-t-3xl mt-10">
      <div className="w-full lg:max-w-5/6 mx-auto">
        <div className="w-full px-6 lg:px-0">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12  py-14">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-6">
              <div className="w-full mb-4">
                <a href="/" className="flex items-center gap-3 cursor-pointer">
                  <span className="text-[#3498DB] font-bold lg:text-6xl text-4xl -mt-2">
                    NY
                  </span>
                  <p className="font-bold text-base lg:text-lg text-white">
                    New York Legal <br /> Resource Center
                  </p>
                </a>
              </div>

              <p className="text-sm leading-normal text-white mb-6">
                {`  Comprehensive information on New York State laws for auto
                accidents, workers' compensation, and labor laws.`}
              </p>

              <ul className="flex items-center space-x-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-[#3498DB] rounded-full w-7 h-7"
                  >
                    <FaFacebookF className="w-4 h-4 text-[#05162A]" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-[#3498DB] rounded-full w-7 h-7"
                  >
                    <FaTwitter className="w-4 h-4 text-[#05162A]" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-[#3498DB] rounded-full w-7 h-7 "
                  >
                    <FaInstagram className="w-4 h-4 text-[#05162A]" />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-[#3498DB] rounded-full w-7 h-7 "
                  >
                    <FaYoutube className="w-4 h-4 text-[#05162A] " />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-lg lg:text-xl font-bold text-white mb-6">
                Quick Links
              </p>

              <ul className=" space-y-3">
                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-sm text-white transition-all duration-200 hover:text-[#3498DB]"
                  >
                    Auto Accidents
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-sm text-white transition-all duration-200 hover:text-[#3498DB]"
                  >
                    {`Workers' Compensation`}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-sm text-white transition-all duration-200 hover:text-[#3498DB]"
                  >
                    Labor Laws
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-sm text-white transition-all duration-200 hover:text-[#3498DB]"
                  >
                    Consultation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    title=""
                    className="flex text-sm text-white transition-all duration-200 hover:text-[#3498DB]"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-lg lg:text-xl font-bold text-white mb-6">
                About
              </p>

              <ul className=" space-y-3">
                <li>
                  <a
                    href="#"
                    title=""
                    className="flex items-start gap-2 text-sm text-white transition-all duration-200 hover:text-[#3498DB]"
                  >
                    <FiPhoneCall className="text-lg shrink-0 text-[#3498DB] mt-0.5" />
                    (212) 555-1234
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex items-start gap-2 text-sm text-white transition-all duration-200 hover:text-[#3498DB]"
                  >
                    <FiMail className="text-lg shrink-0 text-[#3498DB] mt-0.5" />
                    info@nylegalresource.org
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    title=""
                    className="flex items-start gap-2 text-sm text-white transition-all duration-200 hover:text-[#3498DB]"
                  >
                    <GrLocation className="text-lg shrink-0 text-[#3498DB] mt-0.5" />
                    123 Legal Avenue, New York, NY 10001
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
              <p className="text-lg lg:text-xl font-bold text-white mb-6">
                Newsletter
              </p>

              <form action="#" method="POST" className="">
                <p className="text-xs text-white mb-3">
                  Subscribe to our newsletter for latest updates.
                </p>
                <div className="relative">
                  <AiOutlineMail className="absolute  top-1/2 left-3 w-5 h-4 mt-0.5 text-[#2F6FC6] -translate-y-1/2 " />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    className=" w-full max-w-72 pl-9 p-3 text-black placeholder-gray-500 transition-all duration-300 bg-white border border-[#C0C0C0] rounded-md focus:outline-none focus:border-[#3498DB]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-3 mt-3 text-xs font-bold  text-white transition-all duration-300  bg-[#2F6FC6] rounded-lg cursor-pointer "
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="py-4 border-t border-gray-200">
            <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row gap-2">
              <span className="text-xs text-white ">
                ©
                <a href="https://pagedone.io/">
                  2025 NY Legal Resource Center.
                </a>{" "}
                All rights reserved.
              </span>
              <ul className="flex items-center gap-2  -mt-0.5">
                <li>
                  <a
                    href="/"
                    className="text-xs text-white hover:text-[#3498DB] transition-colors duration-300"
                  >
                    Terms
                  </a>
                </li>
                <li className="h-3 w-[1px] bg-white -mb-1.5"></li>
                <li>
                  <a
                    href="/"
                    className="text-xs text-white hover:text-[#3498DB] transition-colors duration-300"
                  >
                    Privacy
                  </a>
                </li>
                <li className="h-3 w-[1px] bg-white -mb-1.5"></li>
                <li>
                  <a
                    href="/"
                    className="text-xs text-white hover:text-[#3498DB] transition-colors duration-300"
                  >
                    Arbitration
                  </a>
                </li>
                <li className="h-3 w-[1px] bg-white -mb-1.5"></li>
                <li>
                  <a
                    href="/"
                    className="text-xs text-white hover:text-[#3498DB] transition-colors duration-300"
                  >
                    Cookies Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
