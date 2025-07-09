'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react' 

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Auto Accidents', href: '#auto-accidents' },
    { label: "Workers' Compensation", href: '#workers-comp' },
    { label: 'Labor Laws', href: '#labor-laws' },
    { label: 'Resources', href: '#resources' },
  ]

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
       
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-bold text-xl">NY</span>
          <span className="text-sm sm:text-base font-semibold">New York Legal<br className="hidden sm:block" /> Resource Center</span>
        </div>

    
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-gray-700 hover:text-blue-600">
              {link.label}
            </a>
          ))}
        </div>

       
        <div className="hidden md:block">
          <a
            href="#contact"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
          >
            Free Consultation
          </a>
        </div>

      
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-gray-700 font-medium hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
          >
            Free Consultation
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
