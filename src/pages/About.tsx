import AboutHero from "../components/AboutPage/AboutHero";
import GenesisSection from "../components/AboutPage/GenesisSection";
import ValuesSection from "../components/AboutPage/ValuesSection";
import ImpactSection from "../components/AboutPage/ImpactSection";
import FacultySection from "../components/AboutPage/FacultySection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


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