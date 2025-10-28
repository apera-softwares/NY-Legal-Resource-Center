import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const FilingAClaim = () => {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left Section */}
      <div className="w-full space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-base">
          Filing a Claim
        </h2>
        <p className="text-base lg:text-lg text-text-muted">
          {`If you are injured on the job or develop a work-related illness in New York, you must follow certain steps to file a workers’ compensation claim and receive benefits.`}
        </p>

        <ul className="space-y-3">
          {/* Step 1 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Report the Injury: </strong>
                Notify your employer in writing within 30 days of the accident
                or when you first become aware of a work-related illness. Failing
                to report within this time frame may affect your eligibility for benefits.
              </span>
            </div>
          </li>

          {/* Step 2 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Seek Medical Attention: </strong>
                Visit a healthcare provider authorized by the New York State
                Workers’ Compensation Board. Inform them that your injury or
                illness is work-related.
              </span>
            </div>
          </li>

          {/* Step 3 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">File Form C-3: </strong>
                Submit a Workers’ Compensation Employee Claim Form (Form C-3) to
                the New York State Workers’ Compensation Board within two years
                of the injury or illness to officially start your claim.
              </span>
            </div>
          </li>

          {/* Step 4 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Cooperate During Review: </strong>
                Your employer’s insurance carrier will review your claim.
                Provide any requested documentation and attend medical
                examinations if required.
              </span>
            </div>
          </li>

          {/* Step 5 */}
          <li>
            <div className="flex items-start gap-3">
              <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
              <span className="text-text-muted">
                <strong className="text-text-base">Receive Benefits: </strong>
                If approved, you may begin receiving wage replacement and
                medical benefits. If denied, you have the right to appeal before
                the Workers’ Compensation Board.
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* Right Section - Image */}
      <div className="w-full">
        <img
          src="/assets/images/construction-worker-5.jpg"
          alt="Worker filing a compensation claim"
          className="w-full lg:w-[512px] h-[512px] object-cover border border-primary rounded-2xl lg:ml-auto"
        />
      </div>
    </section>
  );
};

export default FilingAClaim;
