import AdditionalResources from "@/components/AdditionalResources";
import ConsultWithAttorney from "@/components/ConsultWithAttorney";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import ScrollSection from "@/components/ScrollSection";
import WokerCompensation from "@/components/WokerCompensation";

export default function Home() {
  return (
    <>
      <Hero />
      <FAQ />
      <ScrollSection/>
      <WokerCompensation/>
      <AdditionalResources/>
      <ConsultWithAttorney/>
    </>
  );
}
