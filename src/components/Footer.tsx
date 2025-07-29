"use client";
import React from "react";
import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";



const Footer = () => {

  return (
    <section className="w-full bg-[#05162A] rounded-t-2xl lg:rounded-t-3xl">
      <div className="w-full lg:max-w-5/6 mx-auto">
        <div className="w-full px-4 sm:px-6 lg:px-0">
          <div className="w-full grid grid-cols-4  lg:grid-cols-7 gap-y-16 gap-x-12  py-14">
            <div className="w-full col-span-4 lg:col-span-3  lg:pr-6">
              <div className="w-full mb-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-primary font-bold lg:text-6xl text-4xl -mt-2">
                    NY
                  </span>
                  <p className="font-bold text-base lg:text-lg text-white">
                    New York Legal <br /> Resource Center
                  </p>
                </Link>
              </div>

              <p className="text-sm leading-normal text-white mb-6">
                {`  Comprehensive information on New York State laws for auto
                accidents, workers' compensation, and labor laws.`}
              </p>

              <ul className="flex items-center space-x-3">
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7"
                  >
                    <FaFacebookF className="w-4 h-4 text-text-base" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7"
                  >
                    <FaTwitter className="w-4 h-4 text-text-base" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7 "
                  >
                    <FaInstagram className="w-4 h-4 text-text-base" />
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7 "
                  >
                    <FaYoutube className="w-4 h-4 text-text-base " />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full col-span-4 sm:col-span-2  lg:col-span-2">
              <p className="text-lg lg:text-xl font-bold text-white mb-6">
                Quick Links
              </p>

              <ul className=" space-y-3">
                <li>
                  <Link
                    href="#auto-accidents"
                    className="flex text-sm text-white transition-all duration-200 hover:text-primary"
                  >
                    Auto Accidents
                  </Link>
                </li>

                <li>
                  <Link
                    href="#workers-compensation"
                    className="flex text-sm text-white transition-all duration-200 hover:text-primary"
                  >
                    {`Workers' Compensation`}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#labor-laws"
                    className="flex text-sm text-white transition-all duration-200 hover:text-primary"
                  >
                    Labor Laws
                  </Link>
                </li>

                <li>
                  <Link
                    href="#consultation"
                    className="flex text-sm text-white transition-all duration-200 hover:text-primary"
                  >
                    Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#resources"
                    className="flex text-sm text-white transition-all duration-200 hover:text-primary"
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full col-span-4 sm:col-span-2  lg:col-span-2">
              <p className="text-lg lg:text-xl font-bold text-white mb-6">
                About
              </p>

              <ul className=" space-y-3">
                <li>
                  <span className="flex items-start gap-2 text-sm text-white">
                    <FiPhoneCall className="text-lg shrink-0 text-primary mt-0.5" />
                    (212) 555-1234
                  </span>
                </li>

                <li>
                  <span className="flex items-start gap-2 text-sm text-white">
                    <FiMail className="text-lg shrink-0 text-primary mt-0.5" />
                    info@nylegalresource.org
                  </span>
                </li>

                <li>
                  <span className="flex items-start gap-2 text-sm text-white">
                    <GrLocation className="text-lg shrink-0 text-primary mt-0.5" />
                    123 Legal Avenue, New York, NY 10001
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4 border-t border-border-primary">
            <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row gap-2">
              <span className="text-xs text-white ">
                ©
                <Link
                  href="/"
                  className=" transition-all duration-200 hover:text-primary"
                >
                  {" "}
                  2025 NY Legal Resource Center.
                </Link>{" "}
                All rights reserved.
              </span>
              <ul className="flex items-center gap-2  -mt-0.5">
                <li>
                  <Link
                    href="/"
                    className="text-xs text-white hover:text-primary transition-colors duration-300"
                  >
                    Terms
                  </Link>
                </li>
                <li className="h-3 w-[1px] bg-white -mb-1.5"></li>
                <li>
                  <Link
                    href="/"
                    className="text-xs text-white hover:text-primary transition-colors duration-300"
                  >
                    Privacy
                  </Link>
                </li>
                <li className="h-3 w-[1px] bg-white -mb-1.5"></li>
                <li>
                  <Link
                    href="/"
                    className="text-xs text-white hover:text-primary transition-colors duration-300"
                  >
                    Arbitration
                  </Link>
                </li>
                <li className="h-3 w-[1px] bg-white -mb-1.5"></li>
                <li>
                  <Link
                    href="/"
                    className="text-xs text-white hover:text-primary transition-colors duration-300"
                  >
                    Cookies Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
