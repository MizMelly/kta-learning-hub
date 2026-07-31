import EventHero from "../components/Events/EventHero";
import EventsGrid from "../components/Events/EventsGrid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Events() {
  return (
    <>
    < Navbar />

      <EventHero />
      <EventsGrid />

      < Footer/>
    </>
  );
}