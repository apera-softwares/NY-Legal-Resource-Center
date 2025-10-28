import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const DisabilityClassifications = () => {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left Section */}
      <div className="w-full space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-base">
          Disability Classifications
        </h2>
        <p className="text-base lg:text-lg text-text-muted">
          {`New York workers' compensation defines several disability classifications that determine the type and amount of benefits you may receive.`}
        </p>

        <ul className="space-y-3">
          {/* Temporary Total Disability */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">
                  Temporary Total Disability (TTD):{" "}
                </strong>
                When an employee is completely unable to work for a limited
                period of time due to a work-related injury or illness.
              </span>
            </div>
          </li>

          {/* Temporary Partial Disability */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">
                  Temporary Partial Disability (TPD):{" "}
                </strong>
                When an employee can work but with restrictions or reduced
                capacity while recovering from the injury.
              </span>
            </div>
          </li>

          {/* Permanent Total Disability */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">
                  Permanent Total Disability (PTD):{" "}
                </strong>
                When an employee is permanently unable to perform any type of
                gainful employment due to the severity of the injury.
              </span>
            </div>
          </li>

          {/* Permanent Partial Disability */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">
                  Permanent Partial Disability (PPD):{" "}
                </strong>
                When an employee sustains a permanent loss of function or
                limitation but can still engage in some form of work.
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* Right Section - Image */}
      <div className="w-full">
        <img
          src="/assets/images/construction-worker-4.jpg"
          alt="Construction worker illustration"
          className="w-full lg:w-[512px] h-[512px] object-cover border border-primary rounded-2xl lg:ml-auto"
        />
      </div>
    </section>
  );
};

export default DisabilityClassifications;
