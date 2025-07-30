"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

const pointsLeft = [
  "Evaluate the specific details of your case",
  "Explain your rights and options under New York law",
  "Handle paperwork and meet critical deadlines",
  "Negotiate with insurance companies and opposing parties",
  "Represent you in hearings, trials, or appeals if necessary",
  "Maximize your potential compensation",
];

const pointsRight = [
  "An auto accident resulting in significant injury or property damage",
  "A workplace injury or occupational illness",
  "Experiencing workplace discrimination, harassment, or retaliation",
  "Being denied workers' compensation benefits",
  "Wage and hour violations or other labor law issues",
];

const ConsultWithAttorney = () => {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  const handleCalendlyClick = () => {
    window.open("https://calendly.com/smartinstallersnyc", "_blank");
  };

  return (
    <section id="consultation" className="w-full pt-24 pb-16 bg-white">
      <div className="w-full lg:max-w-5/6  mx-auto px-4 sm:px-6 lg:px-0 ">
        <div className="flex flex-col items-center  mb-14 ">
          <button className="px-4 py-2 font-bold text-xs text-center text-primary border-2 border-primary  rounded-full">
            Get Free Consultation
          </button>
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-text-base mt-4">
            Consult with an Attorney
          </h2>
          <p className=" text-text-muted text-center mt-4">
            Get Expert Legal Advice for Your Specific Situation
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* LEFT CARD */}
          <div className="border border-border-primary rounded-xl p-6 shadow-sm">
            <div
              className="flex items-start justify-between gap-4 mb-4 cursor-pointer"
              onClick={() => setShowLeft(!showLeft)}
            >
              <h2 className="text-primary font-bold text-xl lg:text-2xl">
                Why Consult with a Specialized Attorney?
              </h2>
              <FaChevronDown
                className={`shrink-0 text-primary w-5 h-5 mt-1 lg:mt-2 transition-transform duration-200  ${
                  showLeft ? "" : "rotate-180"
                }`}
              />
            </div>

            {showLeft && (
              <div>
                <p className="text-text-muted text-base lg:text-lg mb-4 md:w-5/6 leading-normal">
                  New York&apos;s legal system is complex, and the laws
                  governing auto accidents, workers&apos; compensation, and
                  labor rights have many nuances. A specialized attorney can:
                </p>
                <ul className="space-y-2">
                  {pointsLeft.map((point, index) => (
                    <li key={index}>
                      <div className="flex items-start gap-3   ">
                        <FaRegCircleCheck className=" text-primary mt-1.5 shrink-0" />
                        <span className="text-base lg:text-lg  font-medium text-text-base ">
                          {point}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT CARD */}
          <div className="border border-border-primary rounded-xl p-6 shadow-sm">
            <div
              className="flex items-start justify-between mb-4 cursor-pointer"
              onClick={() => setShowRight(!showRight)}
            >
              <h2 className="text-primary font-bold text-xl lg:text-2xl">
                When to Contact an Attorney
              </h2>
              <FaChevronDown
                className={` shrink-0 text-primary w-5 h-5 mt-1 lg:mt-2 transition-transform duration-200  ${
                  showRight ? "" : "rotate-180"
                }`}
              />
            </div>

            {showRight && (
              <div>
                <p className="text-text-muted text-base lg:text-lg mb-4 md:w-5/6 leading-normal">
                  It&apos;s advisable to consult with an attorney as soon as
                  possible after:
                </p>
                <ul className="space-y-2">
                  {pointsRight.map((point, index) => (
                    <li key={index}>
                      <div className="flex items-start gap-3">
                        <FaRegCircleCheck className=" text-primary mt-1.5  shrink-0" />
                        <span className="text-base lg:text-lg  font-medium text-text-base ">
                          {point}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* CALENDLY BUTTON */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleCalendlyClick}
            className="bg-primary text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#2983c0] transition-colors duration-300 cursor-pointer"
          >
            Schedule Your Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultWithAttorney;
