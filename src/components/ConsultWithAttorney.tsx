"use client"
import React, { useState } from 'react';
import {  FaChevronDown } from 'react-icons/fa';
import { FaRegCircleCheck } from "react-icons/fa6";

const pointsLeft = [
  'Evaluate the specific details of your case',
  'Explain your rights and options under New York law',
  'Handle paperwork and meet critical deadlines',
  'Negotiate with insurance companies and opposing parties',
  'Represent you in hearings, trials, or appeals if necessary',
  'Maximize your potential compensation',
];

const pointsRight = [
  'An auto accident resulting in significant injury or property damage',
  'A workplace injury or occupational illness',
  'Experiencing workplace discrimination, harassment, or retaliation',
  "Being denied workers' compensation benefits",
  'Wage and hour violations or other labor law issues',
];

const ConsultWithAttorney = () => {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  return (
    <section id="consultation" className=" pt-24 pb-16 bg-white">
      <div className="lg:max-w-5/6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 text-center">
        <button className="px-4 py-2 font-bold text-xs text-[#3498DB] border-2 border-[#3498DB] rounded-full">
          Get Free Consultation
        </button>
        <h2 className="text-3xl lg:text-5xl font-bold mt-4">
          Consult with an Attorney
        </h2>
        <p className="text-gray-500 mt-4">
          Get Expert Legal Advice for Your Specific Situation
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
          {/* LEFT CARD */}
          <div className="border border-blue-100 rounded-xl p-6 shadow-sm">
            <div
              className="flex items-start justify-between gap-4 mb-4 cursor-pointer"
              onClick={() => setShowLeft(!showLeft)}
            >
              <h2 className="text-[#3498DB] font-bold text-xl lg:text-2xl">
                Why Consult with a Specialized Attorney?
              </h2>
              <FaChevronDown
                className={`shrink-0 text-[#3498DB] w-5 h-5 mt-1 lg:mt-2 transition-transform duration-200  ${
                  showLeft ? "" : "rotate-180"
                }`}
              />
            </div>

            {showLeft && (
              <>
                <p className="text-[#758599] text-base lg:text-lg mb-4 md:w-5/6 leading-normal">
                  New York&apos;s legal system is complex, and the laws
                  governing auto accidents, workers&apos; compensation, and
                  labor rights have many nuances. A specialized attorney can:
                </p>
                <ul className="space-y-2">
                  {pointsLeft.map((point, index) => (
                    <li key={index}>
                      <div className="flex items-start gap-3">
                        <FaRegCircleCheck className=" text-[#3498DB] mt-1  shrink-0" />
                        <span className="text-base lg:text-lg  font-medium ">
                          {point}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* RIGHT CARD */}
          <div className="border border-blue-100 rounded-xl p-6 shadow-sm">
            <div
              className="flex items-start justify-between mb-4 cursor-pointer"
              onClick={() => setShowRight(!showRight)}
            >
              <h2 className="text-[#3498DB] font-bold text-xl lg:text-2xl">
                When to Contact an Attorney
              </h2>
              <FaChevronDown
                className={` shrink-0 text-[#3498DB] w-5 h-5 mt-1 lg:mt-2 transition-transform duration-200  ${
                  showRight ? "" : "rotate-180"
                }`}
              />
            </div>

            {showRight && (
              <>
                <p className="text-[#758599] text-base lg:text-lg mb-4 md:w-5/6 leading-normal">
                  It&apos;s advisable to consult with an attorney as soon as
                  possible after:
                </p>
                <ul className="space-y-2">
                  {pointsRight.map((point, index) => (
                    <li key={index}>
                      <div className="flex items-start gap-3">
                        <FaRegCircleCheck className=" text-[#3498DB] mt-1  shrink-0" />
                        <span className="text-base lg:text-lg  font-medium ">
                          {point}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultWithAttorney;
