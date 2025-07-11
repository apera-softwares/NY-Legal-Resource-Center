"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { navLinks } from "@/data/navLinks";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl lg:max-w-5/6 lg:mx-auto px-4 sm:px-6 lg:px-0 py-5  flex justify-between items-center gap-6">
        <div className="">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-[#3498DB] font-bold lg:text-6xl md:text-3xl text-2xl ">
              NY
            </span>
            <span className="text-sm sm:text-base font-semibold">
              New York Legal
              <br className="hidden sm:block" /> Resource Center
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className=" text-base  text-[#05162A] hover:text-[#3498DB] transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href="#contact"
            className="inline-block bg-[#3498DB] text-white text-nowrap px-7 py-3 rounded-md text-sm font-semibold hover:bg-[#2983c0]"
          >
            Free Consultation
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className=" flex items-center justify-center"
          >
            {mobileOpen ? (
              <IoClose className="text-3xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#05588E29] px-4 sm:px-6 pb-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-[#05162A] font-medium hover:text-[#3498DB] transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-2 inline-block w-full text-center bg-[#3498DB] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#2983c0] transition-colors duration-300"
          >
            Free Consultation
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
