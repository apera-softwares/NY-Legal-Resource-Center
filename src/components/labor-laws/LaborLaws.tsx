"use client";
import React from "react";
import { laborLaws } from "@/data/laborLaws";
import LaborLawItem from "./LaborLawItem";

const LaborLaws = () => {
  return (
    <section id="labor-laws" className="w-full lg:max-w-5/6  mx-auto">
      <div className="w-full px-4 sm:px-6 lg:px-0  py-24">
        <div className="w-full flex flex-col items-center gap-4 mb-14">
          <button className="px-4 py-2 font-bold text-xs text-[#3498DB] border-2 border-[#3498DB] rounded-full">
            laws
          </button>
          <h2 className="text-3xl lg:text-5xl text-center font-bold">
            <span className="text-[#3498DB]">New York </span>
            Labor Laws
          </h2>
          <p className="text-center text-[#758599]">
            {`Understanding Workplace Rights and Protections`}
          </p>
        </div>
        <div className="w-full rounded-2xl lg:rounded-3xl p-6 lg:p-8 space-y-6 border border-[#05588E29]">
          {laborLaws.map((lawItem) => (
            <LaborLawItem
              key={lawItem.id}
              title={lawItem.title}
              content={lawItem.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaborLaws;
