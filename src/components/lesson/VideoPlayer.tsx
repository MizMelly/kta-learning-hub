import { Play } from "lucide-react";

export default function VideoPlayer() {
  return (
    <section className=" w-full overflow-hidden bg-black shadow-lg">

      {/* Video Area */}

      <div className="relative flex h-75 w-full items-center justify-center md:h-100 lg:h-125">

        {/* Play Button */}

        <button className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E46F21] transition duration-300 hover:scale-105 md:h-20 md:w-20 lg:h-24 lg:w-24">
          <Play
            size={30}
            fill="#124A66"
            className="ml-1 text-[#124A66] md:h-9 md:w-9"
          />
        </button>

        {/* Lesson Info */}

        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E46F21] md:text-sm">
            Module 3 • Lesson 1
          </p>

          <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
            Resistance &amp; Flow
          </h1>

        </div>

      </div>

    </section>
  );
}