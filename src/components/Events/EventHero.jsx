import {
  Calendar,
  MapPin,
} from "lucide-react";

export default function EventHero() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="font-serif text-6xl text-[#124A66]">
            Live Experiences
          </h2>

          <p className="mt-6 text-xl leading-9 text-gray-500">
            Immerse yourself in environments designed to catalyze
            profound shifts in perspective and performance.
          </p>

        </div>

        {/* Hero */}

        <div className="mt-20 overflow-hidden rounded-[36px] bg-[#124A66] px-10 py-14 shadow-2xl lg:px-16 lg:py-20">

          <span className="rounded-full bg-[#E46F21] px-5 py-2 text-sm font-bold uppercase text-white">
            Featured Event
          </span>

          <h1 className="mt-8 max-w-3xl font-serif text-6xl leading-tight text-white">
            Unleash Global Summit 2024
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-9 text-white/80">
            Our flagship annual event bringing together leaders
            from around the world for three days of immersive
            transformation.
          </p>

          <div className="mt-10 flex flex-wrap gap-8 text-lg text-white">

            <div className="flex items-center gap-3">

              <Calendar className="text-[#E46F21]" />

              November 15, 2024

            </div>

            <div className="flex items-center gap-3">

              <MapPin className="text-[#E46F21]" />

              London, UK & Virtual

            </div>

          </div>

          {/* Countdown */}

          <div className="mt-16">

            <p className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-white/50">
              Starts In
            </p>

            <div className="flex gap-8">

              {[
                ["08", "Days"],
                ["16", "Hours"],
                ["24", "Minutes"],
                ["18", "Seconds"],
              ].map(([value, label]) => (
                <div key={label}>

                  <div className="font-serif text-5xl text-white">
                    {value}
                  </div>

                  <div className="mt-2 text-sm uppercase tracking-widest text-white/50">
                    {label}
                  </div>

                </div>
              ))}

            </div>

          </div>

          <button className="mt-14 rounded-full bg-[#E46F21] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#cf611d]">
            Secure Your Ticket
          </button>

        </div>

      </div>

    </section>
  );
}