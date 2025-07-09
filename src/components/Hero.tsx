import React from 'react'

const Hero = ()=> {
  return (
    <section className="relative h-[90vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/nyc.jpg')" }}>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col justify-center h-full text-white">
        <span className="inline-block mb-4 px-3 py-1 text-sm bg-blue-600 text-white rounded-full w-max font-semibold">
          Legal Insights
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          <span className="text-blue-500">New York</span>{' '}
          Legal Resource Center
        </h1>

        <p className="mt-4 text-lg font-medium italic">
          “Expert Guidance on Auto Accidents, Workers' Compensation & Labor Laws”
        </p>

        <p className="mt-4 text-base text-gray-200 max-w-2xl">
          Get clear, reliable information based on New York State laws to help you understand your rights.
          From auto accidents to labor claims, explore your legal options with confidence.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
            Get Free Consultation
          </button>
          <button className="border border-white text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition">
            Watch Attorney Video
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero