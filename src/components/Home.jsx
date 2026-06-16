import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import WhyPlatform from "../components/WhyPlatform";
import LearningJourney from "../components/LearningJourney";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyPlatform />
      <LearningJourney />
      <Footer />
    </>
  );
}