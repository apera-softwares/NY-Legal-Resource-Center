import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const UpdateToWorkers = () => {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Text Section */}
      <div className="w-full space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-base">
          2023–2024 Updates to Workers' Compensation in New York
        </h2>

        <p className="text-base lg:text-lg text-text-muted">
          {`Recent updates to New York’s Workers’ Compensation laws aim to increase wage replacement benefits, improve access to care, and simplify claim processes for injured workers.`}
        </p>

        <ul className="space-y-3">
          {/* Update 1 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Increased Maximum Benefits: </strong>
                The maximum weekly benefit for temporary or permanent disability
                has been raised to match the New York State Average Weekly Wage,
                providing stronger income protection for injured workers.
              </span>
            </div>
          </li>

          {/* Update 2 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Streamlined Online Filing: </strong>
                The Workers’ Compensation Board has modernized its digital
                platform, allowing employees and employers to file forms,
                upload documents, and track case progress entirely online.
              </span>
            </div>
          </li>

          {/* Update 3 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Expanded Mental Health Coverage: </strong>
                The law now recognizes mental health injuries — including
                post-traumatic stress and anxiety caused by workplace events —
                even without a direct physical injury.
              </span>
            </div>
          </li>

          {/* Update 4 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Faster Claim Reviews: </strong>
                The Board has shortened processing times for claims and medical
                authorizations, ensuring injured workers receive timely decisions
                and uninterrupted care.
              </span>
            </div>
          </li>

          {/* Update 5 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Improved Access to Translation Services: </strong>
                Non-English-speaking workers now have access to free interpretation
                and translation support during hearings and when filing claims,
                promoting fairness and inclusivity.
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* Image Section */}
      <div className="w-full">
        <img
          src="/assets/images/construction-worker-6.jpg"
          alt="Workers compensation law updates"
          className="w-full lg:w-[512px] h-[512px] object-cover border border-primary rounded-2xl lg:ml-auto"
        />
      </div>
    </section>
  );
};

export default UpdateToWorkers;
