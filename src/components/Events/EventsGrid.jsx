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
    <section className="pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#124A66]">
            Upcoming Schedule
          </h2>

          <p className="mt-3 max-w-2xl text-base sm:text-lg text-gray-500 leading-7">
            Join our upcoming live experiences, workshops, and immersive
            transformational events designed to accelerate your personal and
            professional growth.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
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