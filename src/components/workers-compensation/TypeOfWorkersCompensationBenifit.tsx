import React from "react";

import { FaRegCircleCheck } from "react-icons/fa6";
const TypeOfWorkersCompensationBenifit = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <div className="w-full space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-base ">
          {` Types of Workers' Compensation Benefits`}
        </h2>
        <p className="text-base lg:text-lg text-text-muted ">
          {`New York workers' compensation provides several types of benefits:`}
        </p>
        <div className="w-full">
          <ul className=" space-y-3">
            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className=" text-text-muted">
                  <strong className="text-text-base">Medical Benefits : </strong>
                  100% coverage for necessary medical care related to your work
                  injury with no time limit or cost limit as long as the care is
                  necessary and related to the work injury
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className=" text-text-muted">
                  <strong className="text-text-base">
                    Temporary Disability Benefits :{" "}
                  </strong>
                  Cash benefits for lost time from work, calculated at 2/3 of
                  your average weekly wage (AWW) multiplied by your percentage
                  of disability, up to a maximum weekly amount
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className=" text-text-muted">
                  <strong className="text-text-base">
                    Permanent Disability Benefits :{" "}
                  </strong>
                  Compensation for permanent impairments, either scheduled loss
                  of use (SLU) for specific body parts or non-scheduled awards
                  for other permanent disabilities
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className=" text-text-muted">
                  <strong className="text-text-base">Death Benefits : </strong>
                  Weekly cash benefits for surviving dependents plus funeral
                  expenses up to $12,500 in New York City, Nassau, Suffolk,
                  Rockland, and Westchester counties, and up to $10,500 in all
                  other counties
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <img
          src="/assets/images/construction-worker-1.png"
          alt=""
          className="w-full lg:w-[512px] h-[512px] border border-primary rounded-2xl lg:ml-auto"
        />
      </div>
    </div>
  );
};

export default TypeOfWorkersCompensationBenifit;
