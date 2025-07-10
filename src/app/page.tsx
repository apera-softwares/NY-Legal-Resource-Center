import AdditionalResources from "@/components/AdditionalResources";
import ConsultWithAttorney from "@/components/ConsultWithAttorney";
import Hero from "@/components/Hero";
import ScrollSection from "@/components/scroll-section/ScrollSection";
import WokerCompensation from "@/components/compensation-tab/WokerCompensation";
import LaborLaws from "@/components/labor-laws/LaborLaws";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollSection/>
      <WokerCompensation/>
      <LaborLaws/>
      <AdditionalResources/>
      <ConsultWithAttorney/>
    </>
  );
}
