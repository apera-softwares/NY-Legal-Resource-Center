"use client";
import React from "react"
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";

const Contact = () => {
  const handleCalendlyClick = () => {
    window.open("https://calendly.com/smartinstallersnyc", "_blank");
  };

  return (
    <section id="contact" className="w-full pb-24 bg-white">
      <div className="w-full lg:max-w-5/6  mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-3xl lg:text-4xl font-bold text-text-base mb-10 text-center">
          Schedule Your Free Consultation
        </h2>

        <div className="flex flex-col items-center">
          <div className="text-center max-w-2xl">
            <p className="text-lg text-text-muted mb-8">
              Ready to discuss your case? Schedule a free consultation with our
              legal team to get expert advice on your specific situation.
            </p>

            <button
              onClick={handleCalendlyClick}
              className="bg-primary text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#2983c0] transition-colors duration-300 cursor-pointer"
            >
              Book Your Free Consultation
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 w-full">
            <div className="text-center">
              <div className="flex items-center justify-center border rounded-full border-border-primary w-16 h-16 mb-4 mx-auto">
                <FiPhoneCall className="text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-base mb-2">
                Phone
              </h3>
              <p className="text-text-muted">Contact us directly</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center border rounded-full border-border-primary w-16 h-16 mb-4 mx-auto">
                <FiMail className="text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-base mb-2">
                Email
              </h3>
              <p className="text-text-muted">smartinstallersnyc@gmail.com</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center border rounded-full border-border-primary w-16 h-16 mb-4 mx-auto">
                <GrLocation className="text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-base mb-2">
                Location
              </h3>
              <p className="text-text-muted">New York, NY</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
