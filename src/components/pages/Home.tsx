import Hero from "../HomePage/Hero";
import GrowthSection from "../HomePage/GrowthSection";
import ProgramsSection from "../HomePage/ProgramsSection";
import EcosystemSection from "../HomePage/EcosystemSection";
import Testimonials from "../HomePage/Testimonials";
import CTASection from "../HomePage/CTASection";

export default function Home() {
  return (
    <>
     <Hero />
          <GrowthSection />
          <ProgramsSection />
          <EcosystemSection />
          <Testimonials />
          <CTASection />
    </>
  );
}