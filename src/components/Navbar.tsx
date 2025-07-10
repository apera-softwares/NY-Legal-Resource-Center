'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react' ;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: "Auto Accidents", href: "#auto-accidents" },
    { label: "Workers' Compensation", href: "#workers-compensation" },
    { label: "Labor Laws", href: "#labor-laws" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl lg:max-w-5/6 lg:mx-auto px-4 sm:px-6 lg:px-0 py-3 flex justify-between items-center">
       
        <div className="flex items-center space-x-2">
          <span className="text-[#3498DB] font-bold lg:text-6xl md:text-3xl sm:text-2xl ">NY</span>
          <span className="text-sm sm:text-base font-semibold">New York Legal<br className="hidden sm:block" /> Resource Center</span>
        </div>

    
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-md font-medium text-gray-800 hover:text-[#3498DB]">
              {link.label}
            </Link>
          ))}
        </div>

       
        <div className="hidden lg:block">
          <Link
            href="#contact"
            className="bg-[#3498DB] text-white px-7 py-3 rounded-md text-sm font-semibold hover:bg-[#2983c0] transition"
          >
            Free Consultation
          </Link>
        </div>

      
        <div className="lg:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-gray-700 font-medium hover:text-[#3498DB]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-2 inline-block w-full text-center bg-[#3498DB] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#2983c0] transition"
          >
            Free Consultation
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
