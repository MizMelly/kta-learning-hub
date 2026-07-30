import EventCard from "./EventCard";

const events = [
  {
    month: "OCT",
    day: "22",
    badge: "Virtual",
    title: "Masterclass: The Conscious Leader",
    description:
      "A 2-hour intensive on leading with purpose, empathy and decisive clarity in uncertain times.",
    time: "03:00 PM",
    location: "Virtual",
  },
  {
    month: "FEB",
    day: "10",
    title: "Deep Rest & Integration Retreat",
    description:
      "Step away from the noise and integrate your growth in this immersive retreat.",
    time: "09:00 AM",
    location: "Bali, Indonesia",
  },
  {
    month: "DEC",
    day: "5",
    badge: "Virtual",
    title: "2025 Vision Mapping Workshop",
    description:
      "Set your trajectory for the upcoming year with our proven Vision Mapping methodology.",
    time: "07:00 PM",
    location: "Virtual",
  },
];

export default function EventsGrid() {
  return (
    <section className="pb-24">

      <div className="mx-auto max-w-7xl px-6">

        <h2 className="font-serif text-5xl text-[#124A66]">
          Upcoming Schedule
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">

          {events.map((event) => (
            <EventCard
              key={event.title}
              {...event}
            />
          ))}

        </div>

      </div>

    </section>
  );
}