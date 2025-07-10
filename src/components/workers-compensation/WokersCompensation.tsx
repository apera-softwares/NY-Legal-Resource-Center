"use client";
import React, { useState, ReactNode } from "react";
import TypeOfWorkersCompensationBenifit from "./TypeOfWorkersCompensationBenifit";
import EligibilityRequirements from "./EligibilityRequirement";
import ExtemptOccupations from "./ExtemptOccupations";
import DisabilityClassifications from "./DisabilityClassifications";
import FilingAClaim from "./FilingAClaim";
import UpdateToWorkers from "./UpdateToWorkers";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}
export const tabs: TabItem[] = [
  {
    id: "compensation-tab-1",
    label: `Types of Workers' Compensation Benefits`,
    content: <TypeOfWorkersCompensationBenifit />,
  },
  {
    id: "compensation-tab-2",
    label: `Eligibility Requirements`,
    content: <EligibilityRequirements />,
  },
  {
    id: "compensation-tab-3",
    label: `Exempt Occupations`,
    content: <ExtemptOccupations />,
  },
  {
    id: "compensation-tab-4",
    label: `Disability Classifications`,
    content: <DisabilityClassifications />,
  },
  {
    id: "compensation-tab-5",
    label: `Filing a Claim`,
    content: <FilingAClaim />,
  },
  {
    id: "compensation-tab-6",
    label: `2023 Updates to Workers' Co.. in NY`,
    content: <UpdateToWorkers />,
  },
];

const WokersCompensation = () => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div id="workers-compensation" className="w-full bg-[#FAFAFA]">
      <div className="w-full lg:max-w-5/6  mx-auto">
        <div className="w-full px-4 sm:px-6 lg:px-0  py-24 ">
          <div className="w-full flex flex-col items-center gap-4 mb-14">
            <button className="px-4 py-2 font-bold text-xs text-[#3498DB] border-2 border-[#3498DB] rounded-full">
              {`Workers' Compensation`}
            </button>
            <h2 className=" text-3xl lg:text-5xl text-center font-bold">
              {`Workers' Compensation in`}{" "}
              <span className="text-[#3498DB]">New York</span>
            </h2>
            <p className="text-center text-[#758599]">
              {`Understanding Your Rights and Benefits After a Workplace Injury`}
            </p>
          </div>
          <div className="w-full flex flex-col lg:flex-row   lg:flex-nowrap border border-[#05588E29] rounded-xl overflow-hidden mb-20">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setActiveTabId(tabItem.id)}
                className={`text-base lg:text-lg font-medium px-7 py-5 ${
                  activeTabId === tabItem.id
                    ? "text-white bg-[#3498DB]"
                    : "text-[#758599]"
                }  border border-[#05588E29] cursor-pointer`}
              >
                {`${tabItem.label}`}
              </button>
            ))}
          </div>
          <div className="w-full">{activeTab?.content}</div>
        </div>
      </div>
    </div>
  );
};

export default WokersCompensation;
