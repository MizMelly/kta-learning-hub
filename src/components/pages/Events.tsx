import EventHero from "../Events/EventHero";
import EventsGrid from "../Events/EventsGrid";
import Navbar from "../Navbar";
import Footer from "../Footer";


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