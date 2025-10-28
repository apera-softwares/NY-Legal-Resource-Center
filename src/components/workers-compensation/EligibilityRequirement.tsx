import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const EligibilityRequirements = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <div className="w-full space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-base">
          Eligibility Requirements
        </h2>
        <p className="text-base lg:text-lg text-text-muted">
          {`To qualify for workers’ compensation benefits in New York, both employees and employers must meet specific legal requirements. Understanding these conditions helps ensure you receive the protection you deserve after a workplace injury or illness.`}
        </p>
        <div className="w-full">
          <ul className="space-y-3">
            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">
                    Covered Employment:{" "}
                  </strong>
                  Most employees in New York are covered from their first day
                  of work, including part-time, full-time, and seasonal workers.
                  Independent contractors, volunteers, and certain domestic
                  workers may be excluded under specific conditions.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">
                    Work-Related Injury or Illness:{" "}
                  </strong>
                  The injury or illness must have arisen “out of and in the
                  course of employment.” This includes accidents at the
                  workplace or occupational diseases caused by job conditions.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">
                    Timely Reporting:{" "}
                  </strong>
                  You must notify your employer of the injury within{" "}
                  <strong>30 days</strong> of the incident. Delays in reporting
                  may lead to denial or reduction of benefits.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">
                    Medical Documentation:{" "}
                  </strong>
                  A licensed healthcare provider must confirm that the injury or
                  illness is directly related to your job duties. Medical
                  reports play a key role in determining eligibility and benefit
                  amounts.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">
                    Employer Coverage:{" "}
                  </strong>
                  The employer must have an active workers’ compensation
                  insurance policy or be self-insured under New York State law.
                  Uninsured employers may face penalties and direct liability.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full">
        <img
          src="/assets/images/construction-worker-2.jpg"
          alt="Worker filing claim form"
          className="w-full lg:w-[512px] h-[512px] border border-primary rounded-2xl lg:ml-auto"
        />
      </div>
    </div>
  );
};

export default EligibilityRequirements;
