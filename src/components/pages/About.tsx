import AboutHero from "../AboutPage/AboutHero";
import GenesisSection from "../AboutPage/GenesisSection";
import ValuesSection from "../AboutPage/ValuesSection";
import ImpactSection from "../AboutPage/ImpactSection";
import FacultySection from "../AboutPage/FacultySection";
import Navbar from "../Navbar";
import Footer from "../Footer";


export default function About() {
  return (
    <>
    <Navbar />
      <AboutHero />
      <GenesisSection />
      <ValuesSection />
      <ImpactSection />
      <FacultySection />
      <Footer />
    </>
  );
}