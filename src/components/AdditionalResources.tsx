import React from 'react';
import Image from 'next/image';
import { Link } from 'lucide-react';

const resources = [
  {
    imageSrc: '/icons/male-doctor.png',
    title: 'Auto Accident Resources',
    description:
      "Helpful links to navigate New York’s auto accident rules and recovery process.",
    links: [
      { text: 'NY DMV: Auto Accidents Information', href: '#' },
      { text: 'NY No-Fault Insurance FAQs', href: '#' },
      { text: 'NY Courts: Motor Vehicle Accidents', href: '#' },
      { text: 'NY Department of Health: Traffic Safety', href: '#' },
    ],
  },
  {
    imageSrc: '/icons/male-doctor.png',
    title: "Workers' Compensation Resources",
    description:
      "Find official guidance & support if you’ve been injured on the job in New York.",
    links: [
      { text: 'NY Workers’ Compensation Board', href: '#' },
      { text: 'Information for Injured Workers', href: '#' },
      { text: 'Workers’ Compensation Forms', href: '#' },
      { text: 'What to Do When Injured on the Job', href: '#' },
    ],
  },
  {
    imageSrc: '/icons/male-doctor.png',
    title: 'Labor Law Resources',
    description:
      'Understand your workplace rights, safety regulations, & fair wage protections.',
    links: [
      { text: 'NY Department of Labor', href: '#' },
      { text: 'Workplace Safety and Health', href: '#' },
      { text: 'Wage and Hour Laws', href: '#' },
      { text: 'NY Division of Human Rights', href: '#' },
    ],
  },
  {
    imageSrc: '/icons/male-doctor.png',
    title: 'Medical Resources',
    description:
      'Access healthcare support, Medicaid details, & resources for injured workers.',
    links: [
      { text: 'NY Office of Professional Medical Conduct', href: '#' },
      { text: 'NY Health Care Information', href: '#' },
      { text: 'NY Medicaid Program', href: '#' },
      { text: 'Find a Workers’ Comp Doctor', href: '#' },
    ],
  },
  {
    imageSrc: '/icons/male-doctor.png',
    title: 'Legal Aid Resources',
    description:
      'Access legal assistance and referrals for injured workers and low-income individuals.',
    links: [
      { text: 'Law Help NY', href: '#' },
      { text: 'Legal Aid Society of NYC', href: '#' },
      { text: 'NYC Bar Legal Referral Service', href: '#' },
      { text: 'NY State Bar Association Referral Service', href: '#' },
    ],
  },
  {
    imageSrc: '/icons/male-doctor.png',
    title: 'Forms and Documents',
    description:
      'Quick access to key legal & compensation forms for accidents & claims.',
    links: [
      { text: 'MV-104: Report of Motor Vehicle Accident', href: '#' },
      { text: 'C-3: Employee Claim for Compensation', href: '#' },
      { text: 'LS 223: Complaint of Labor Law Violation', href: '#' },
      { text: 'NY Courts Forms', href: '#' },
    ],
  },
];

const AdditionalResources = () => {
  return (
    <section id="resources" className="py-16 bg-gray-50">
      <div className="lg:max-w-5/6 max-w-5xl lg:mx-auto px-4">
        <div className="text-center mb-12">
          <button className="px-4 py-2 font-bold text-xs text-[#3498DB] border-2 border-[#3498DB] rounded-full">
            Resources
          </button>
          <h2 className="text-5xl text-center font-bold mt-4">
            Additional Resources
          </h2>
          <p className="text-gray-600 mt-4">
            Helpful Links and Information for New York Legal Matters
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 hover:shadow-md transition"
            >
              <div className="border p-10 rounded-full border-[#05588E29] h-24 w-24 relative mb-4">
                {/* <div className="relative w-20 h-20 border  rounded-full p-12 my-2"> */}
                <Image
                  src={resource.imageSrc}
                  alt={resource.title}
                  fill
                  sizes="40px"
                  className="object-cover"
                />

                {/* </div> */}
              </div>
              <h1 className="text-2xl lg:w-2/3 font-semibold text-black my-4">
                {resource.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {resource.description}
              </p>
              <h2 className="text-xl font-semibold text-gray-800 my-4">
                Links:
              </h2>
              <ul className="list-inside text-md text-[#3498DB] space-y-3 font-medium">
                {resource.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-2 text-[#3498DB]"
                    >
                      <Link className="text-[#3498DB] h-5 w-5" />
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalResources;
