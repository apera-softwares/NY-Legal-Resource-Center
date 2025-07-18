"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleScrollToConsultForm = () => {
    const consultForm = document.getElementById("contact");
    if (consultForm) {
      consultForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigateToChatBot = () => {
    router.push("/chat-bot");
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat py-24 "
      style={{ backgroundImage: "url('/assets/images/hero-section-bg.png')" }}
    >
      <div className="absolute inset-0 bg-slate-950/80" />

      <div className="w-full h-full relative z-10 lg:max-w-5/6 max-w-5xl lg:mx-auto px-4 sm:px-6 lg:px-0 flex flex-col justify-center text-white mt-20">
        <span className="inline-block mb-4 px-4 py-2 text-sm bg-transparent border-2 border-primary text-primary rounded-full w-max font-bold">
          Legal Insights
        </span>

        <h1 className="flex flex-col text-4xl sm:text-5xl lg:text-7xl font-bold">
          <span>
            <span className="text-primary">New York </span>
            Legal Resource
          </span>
          <span>Center</span>
        </h1>

        <p className="mt-4 text-lg lg:text-2xl font-semibold underline">
          {`“Expert Guidance on Auto Accidents, Workers' Compensation & Labor Laws”`}
        </p>

        <p className="mt-4 text-base lg:text-lg text-gray-200">
          Get clear, reliable information based on New York State laws to help
          you understand your
        </p>
        <p className="text-base lg:text-lg text-[#D0D5DD]">
          rights. From auto accidents to labor claims, explore your legal
          options with confidence.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <button
            onClick={handleScrollToConsultForm}
            className="bg-primary text-white px-6 py-3 rounded-md font-bold hover:bg-[#2983c0] transition-colors duration-300 cursor-pointer"
          >
            Get Free Consultation
          </button>

          <button
            onClick={handleNavigateToChatBot}
            className="border border-white text-white px-6 py-3 rounded-md font-bold hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
          >
            Get Your Free Police Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
