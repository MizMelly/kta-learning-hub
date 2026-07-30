import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  "Interactive Learning Management System",
  "Private Member Community",
  "Live Virtual & In-Person Events",
  "1-on-1 & Group Coaching",
];

export default function FeaturedCourse() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden bg-[#0B4F6C] py-14 md:py-20 px-5 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:gap-16 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="font-serif font-bold leading-tight text-white">
            <span className="block text-4xl sm:text-5xl lg:text-7xl">
              More Than a Course.
            </span>

            <span className="block text-4xl sm:text-5xl lg:text-7xl">
              An Ecosystem.
            </span>
          </h2>

          <p className="mt-6 md:mt-8 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            True transformation doesn't happen in isolation. Our platform
            combines structured learning, accountability, expert coaching, and
            immersive experiences into one transformational journey.
          </p>

          {/* Feature List */}
          <div className="mt-8 md:mt-10 space-y-5 md:space-y-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 md:gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 md:h-12 md:w-12">
                  <Star
                    className="fill-[#F47A20] text-[#F47A20]"
                    size={16}
                  />
                </div>

                <p className="text-base leading-7 text-white sm:text-lg sm:leading-8 md:text-xl">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/about")}
            className="mt-8 md:mt-12 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-[#134F73] shadow-lg transition hover:bg-gray-100 sm:w-auto sm:px-8 sm:py-5 sm:text-lg"
          >
            Learn About Our Methodology
            <ArrowRight size={20} />
          </button>
        </div>

        {/* RIGHT ECOSYSTEM DIAGRAM */}
        <div className="relative flex min-h-105 items-center justify-center md:min-h-155">
          {/* Outer Rings */}
          <div className="absolute h-80 w-[320px] rounded-full border border-white/10 md:h-140 md:w-140" />
          <div className="absolute h-65 w-65 rounded-full border border-[#8A6B3D]/40 md:h-112.5 md:w-112.5" />
          <div className="absolute h-50 w-50 rounded-full border border-white/10 md:h-85 md:w-85" />

          {/* Center Circle */}
          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-[#F47A20] shadow-2xl md:h-40 md:w-40">
            <span className="font-serif text-2xl font-bold text-white md:text-4xl">
              YOU
            </span>
          </div>

          {/* Top */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#134F73] shadow-lg md:top-2 md:px-8 md:py-4 md:text-base">
            Programs
          </div>

          {/* Left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#134F73] shadow-lg md:px-8 md:py-4 md:text-base">
            Community
          </div>

          {/* Right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#134F73] shadow-lg md:px-8 md:py-4 md:text-base">
            Coaching
          </div>

          {/* Bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#134F73] shadow-lg md:bottom-2 md:px-8 md:py-4 md:text-base">
            Events
          </div>
        </div>
      </div>
    </section>
  );
}