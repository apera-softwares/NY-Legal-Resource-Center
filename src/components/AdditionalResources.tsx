import React from "react";
import Image from "next/image";
import { Link } from "lucide-react";
import { resources } from "@/data/resources";


const AdditionalResources = () => {
  return (
    <section id="resources" className="py-16 bg-gray-50">
      <div className="lg:max-w-5/6 max-w-5xl lg:mx-auto px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-12">
          <button className="px-4 py-2 font-bold text-xs text-[#3498DB] border-2 border-[#3498DB] rounded-full">
            Resources
          </button>
          <h2 className="text-3xl lg:text-5xl text-center font-bold mt-4">
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
              <div className="flex items-center justify-center border rounded-full border-[#05588E29] w-20 h-20 md:h-24 md:w-24 mb-4">
                <Image
                  src={resource.imageSrc}
                  alt={resource.title}
                  className=""
                />
              </div>
              {/* <div className="flex items-center justify-center border p-8 lg:p-10 rounded-full border-[#05588E29] w-20 h-20 md:h-24 md:w-24 mb-4">
                {resource.icon}
              </div> */}
              <h1 className="text-xl sm:text-2xl lg:w-2/3 font-semibold text-black my-4">
                {resource.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                {resource.description}
              </p>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 my-4">
                Links:
              </h2>
              <ul className="list-inside  text-[#3498DB] space-y-3 font-medium">
                {resource.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-start gap-2 text-[#3498DB]"
                    >
                      <Link className=" shrink-0 w-4 h-4 lg:w-5 lg:h-5 mt-0.5" />
                      <span className="">{link.text}</span>
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
