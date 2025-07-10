import React from 'react'

const Hero = ()=> {
  return (
    <section
      className="relative h-[100vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/ny.avif')" }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 lg:max-w-5/6 max-w-5xl lg:mx-auto px-4  flex flex-col justify-center h-full text-white">
        <span className="inline-block mb-4 px-3 py-2 text-sm bg-transparent border-2 border-[#3498DB] text-[#3498DB] rounded-full w-max font-semibold">
          Legal Insights
        </span>

        <h1 className="text-4xl flex flex-col sm:text-7xl font-bold leading-tight">
          <span>
            <span className="text-[#3498DB]">New York </span>
            Legal Resource
          </span>
          <span>Center</span>
        </h1>

        <p className="mt-4 text-md lg:text-2xl font-medium underline">
          {` “Expert Guidance on Auto Accidents, Workers' Compensation & Labor Laws”`}
        </p>

        <p className="mt-4 lg:text-lg text-gray-200 ">
          Get clear, reliable information based on New York State laws to help
          you understand your
        </p>
        <p className="lg:text-lg text-gray-200 ">
          {" "}
          rights. From auto accidents to labor claims, explore your legal
          options with confidence.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <button className="bg-[#3498DB] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#2983c0] transition cursor-pointer">
            Get Free Consultation
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition cursor-pointer">
            Watch Attorney Video
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero