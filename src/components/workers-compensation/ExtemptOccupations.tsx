import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const ExtemptOccupations = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <div className="w-full space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-base">
          Exempt Occupations
        </h2>
        <p className="text-base lg:text-lg text-text-muted">
          {`While most workers in New York are covered by workers’ compensation insurance, certain categories of employment are exempt from mandatory coverage under state law. These exemptions are based on the nature of the work, type of employer, or specific wage and employment conditions.`}
        </p>

        <div className="w-full">
          <ul className="space-y-3">
            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">Sole Proprietors: </strong>
                  Individuals who operate their own business without employees
                  are not automatically required to carry workers’ compensation
                  coverage but may choose to purchase it voluntarily for
                  self-protection.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">Partners and LLC Members: </strong>
                  Members of partnerships or limited liability companies (LLCs)
                  with no employees are generally exempt unless they elect
                  optional coverage for themselves.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">Domestic Workers: </strong>
                  Household employees working less than 40 hours per week and
                  not residing in the employer’s home are typically exempt from
                  coverage requirements.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">
                    Clergy and Religious Workers:{" "}
                  </strong>
                  Ministers, priests, rabbis, imams, and other religious
                  officials are exempt from mandatory workers’ compensation
                  coverage under New York law.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">
                    Certain Farm Laborers:{" "}
                  </strong>
                  Farm workers employed on small farms with limited payrolls may
                  be exempt, depending on the size and revenue of the operation.
                  However, many agricultural employers still provide coverage
                  voluntarily.
                </span>
              </div>
            </li>

            <li>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-base text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">Volunteers and Interns: </strong>
                  Unpaid volunteers and student interns are typically exempt
                  from mandatory coverage, though exceptions exist for certain
                  government or nonprofit programs.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full">
        <img
          src="/assets/images/construction-worker-3.jpg"
          alt="Worker illustration"
          className="w-full lg:w-[512px] h-[512px] border border-primary rounded-2xl lg:ml-auto"
        />
      </div>
    </div>
  );
};

export default ExtemptOccupations;
