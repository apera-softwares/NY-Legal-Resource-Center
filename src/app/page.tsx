import AdditionalResources from "@/components/AdditionalResources";
import ConsultWithAttorney from "@/components/ConsultWithAttorney";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ScrollSection from "@/components/scroll-section/ScrollSection";
import WokersCompensation from "@/components/workers-compensation/WokersCompensation";
import LaborLaws from "@/components/labor-laws/LaborLaws";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollSection/>
      <WokersCompensation/>
      <LaborLaws/>
      <AdditionalResources/>
      <ConsultWithAttorney/>
      <Contact/>
    </>
  );
}
