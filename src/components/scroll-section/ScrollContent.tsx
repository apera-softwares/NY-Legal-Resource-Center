import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const ScrollContent = () => {
  return (
    <div className="w-full col-span-12 lg:col-span-9 px-4 sm:px-6 lg:px-0">
      {/* image section */}
      <div className="w-full">
        <img
          src="/assets/images/accident.png"
          alt="Accident"
          className="w-full h-[412px] object-cover object-center rounded-2xl"
        />
      </div>

      {/* no-fault-system section */}
      <div
        id="no-fault-system"
        className="w-full pt-8 pb-12 border-b border-border-primary"
      >
        <h2 className="font-bold text-2xl lg:text-3xl mb-4">
          New York
          <span className="text-primary"> No-Fault Insurance System</span>
        </h2>
        <p className="text-base lg:text-lg text-text-muted leading-normal">
          New York operates under a "No-Fault" insurance system, which means
          that regardless of who caused the accident, your own insurance company
          pays for medical treatment and other out-of-pocket losses up to
          $50,000. This system was designed to reduce litigation and ensure
          prompt payment of medical bills and lost wages.
        </p>
      </div>

      {/* key-coverages section */}
      <div
        id="key-coverages"
        className="w-full py-12 border-b border-border-primary"
      >
        <h2 className="font-bold text-2xl lg:text-3xl mb-6">
          Key Components of NY No-Fault Coverage
        </h2>
        <ul className="space-y-2.5">
          {[
            {
              title: "Basic Economic Loss Coverage:",
              desc: "Up to $50,000 per person",
            },
            {
              title: "Medical Expenses:",
              desc: "All necessary medical and rehabilitation expenses",
            },
            {
              title: "Lost Wages:",
              desc: "Up to $2,000 per month for up to three years",
            },
            {
              title: "Other Reasonable Expenses:",
              desc: "Up to $25 per day for up to one year",
            },
            {
              title: "Death Benefit:",
              desc: "$2,000 in addition to the basic economic loss coverage",
            },
          ].map((item) => (
            <li key={item.title}>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-sm text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">{item.title} </strong>
                  {item.desc}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* serious-injury section */}
      <div
        id="serious-injury"
        className="w-full py-12 border-b border-border-primary"
      >
        <h2 className="font-bold text-2xl lg:text-3xl mb-4 text-text-base">
          Serious Injury Threshold
        </h2>
        <p className="text-base lg:text-lg leading-normal mb-4 text-text-base">
          To sue for pain and suffering in New York, you must have sustained a
          "serious injury" as defined by New York Insurance Law §5102(d), which
          includes:
        </p>
        <ul className="space-y-1">
          {[
            "Significant disfigurement",
            "Death",
            "Fracture",
            "Loss of a fetus",
            "Dismemberment",
            "Significant limitation of use of a body function or system",
            "Permanent loss of use of a body organ, member, function, or system",
            "Permanent consequential limitation of use of a body organ or member",
            `Medically determined injury or impairment of a non-permanent
            nature which prevents the injured person from performing
            substantially all of the material acts which constitute such
            person's usual and customary daily activities for not less than
            90 days during the 180 days immediately following the occurrence
            of the injury or impairment.`,
          ].map((text) => (
            <li key={text}>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-sm text-primary shrink-0 mt-1" />
                <span className="text-text-muted">{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* legal-deadlines section */}
      <div
        id="legal-deadlines"
        className="w-full py-12 border-b border-border-primary"
      >
        <h2 className="font-bold text-2xl lg:text-3xl mb-4">
          Statute of Limitations
        </h2>
        <p className="text-base lg:text-lg text-text-muted leading-normal mb-4">
          In New York, the statute of limitations for filing a personal injury
          lawsuit after an auto accident is generally three years from the date
          of the accident. However, there are important deadlines for no-fault
          benefits:
        </p>
        <ul className="space-y-2.5">
          {[
            {
              title: "No-Fault Application:",
              desc: "Must be filed within 30 days of the accident",
            },
            {
              title: "Medical Bills:",
              desc: "Must be submitted within 45 days of treatment",
            },
            {
              title: "Lost Wage Claims:",
              desc: "Must be submitted within 90 days",
            },
          ].map((item) => (
            <li key={item.title}>
              <div className="flex items-start gap-3">
                <FaRegCircleCheck className="text-sm text-primary shrink-0 mt-1" />
                <span className="text-text-muted">
                  <strong className="text-text-base">{item.title} </strong>
                  {item.desc}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* negligence section */}
      <div
        id="negligence"
        className="w-full py-12 border-b border-border-primary"
      >
        <h2 className="font-bold text-2xl lg:text-3xl mb-4">
          Comparative Negligence
        </h2>
        <p className="text-base lg:text-lg text-text-muted leading-normal">
          New York follows a "pure comparative negligence" rule, which means
          that you can recover damages even if you were partially at fault for
          the accident. However, your recovery will be reduced by your
          percentage of fault.
        </p>
      </div>

      {/* 2023-updates section */}
      <div
        id="2023-updates"
        className="w-full py-12 border-b border-border-primary"
      >
        <h2 className="font-bold text-2xl lg:text-3xl mb-4 text-text-base">
          Recent Changes to NY Auto Accident Laws
        </h2>
        <p className="text-base lg:text-lg text-text-muted leading-normal">
          As of 2023, New York has implemented several changes to its auto
          accident laws, including increased minimum liability insurance
          requirements and expanded coverage for pedestrians and cyclists.
          Always consult with an attorney for the most current legal advice.
        </p>
      </div>
    </div>
  );
};

export default ScrollContent;