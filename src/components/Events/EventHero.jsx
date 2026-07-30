import {
  Calendar,
  MapPin,
} from "lucide-react";

export default function EventHero() {
  return (
    <section className="py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#124A66]">
            Live Experiences
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 lg:leading-9 text-gray-500">
            Immerse yourself in environments designed to catalyze
            profound shifts in perspective and performance.
          </p>
        </div>

        {/* Hero Card */}
        <div className="mt-10 sm:mt-14 lg:mt-20 overflow-hidden rounded-3xl lg:rounded-[36px] bg-[#124A66] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-20 shadow-2xl">
          {/* Badge */}
          <span className="inline-block rounded-full bg-[#E46F21] px-4 py-2 text-xs sm:text-sm font-bold uppercase text-white">
            Featured Event
          </span>

          {/* Title */}
          <h1 className="mt-6 sm:mt-8 max-w-3xl font-serif text-3xl sm:text-5xl lg:text-6xl leading-tight text-white">
            Unleash Global Summit 2024
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 lg:leading-9 text-white/80">
            Our flagship annual event bringing together leaders
            from around the world for three days of immersive
            transformation.
          </p>

          {/* Event Info */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-5 sm:gap-8 text-sm sm:text-base lg:text-lg text-white">
            <div className="flex items-center gap-3">
              <Calendar
                size={20}
                className="text-[#E46F21] shrink-0"
              />

              <span>November 15, 2024</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                className="text-[#E46F21] shrink-0"
              />

              <span>London, UK & Virtual</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="mt-10 sm:mt-14 lg:mt-16">
            <p className="mb-5 sm:mb-6 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-white/50">
              Starts In
            </p>

            <div className="grid grid-cols-2 gap-5 sm:flex sm:flex-wrap sm:gap-8">
              {[
                ["08", "Days"],
                ["16", "Hours"],
                ["24", "Minutes"],
                ["18", "Seconds"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="text-center sm:text-left"
                >
                  <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white">
                    {value}
                  </div>

                  <div className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-white/50">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <button className="mt-10 sm:mt-12 lg:mt-14 w-full sm:w-auto rounded-full bg-[#E46F21] px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition duration-300 hover:bg-[#cf611d]">
            Secure Your Ticket
          </button>
        </div>
      </div>
    </section>
  );
}