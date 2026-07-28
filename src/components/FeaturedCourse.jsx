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
    <section className="bg-[#0B4F6C] py-20 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="font-serif text-white text-5xl lg:text-7xl font-bold leading-tight">
            More Than a Course.
            <br />
            An Ecosystem.
          </h2>

          <p className="mt-8 text-white/85 text-xl leading-9 max-w-2xl">
            True transformation doesn't happen in isolation. Our platform
            combines structured learning, accountability, expert coaching,
            and immersive experiences into one transformational journey.
          </p>

          {/* Feature List */}
          <div className="mt-10 space-y-6">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Star className="text-[#F47A20] fill-[#F47A20]" size={18} />
                </div>

                <p className="text-white text-xl leading-8">{item}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/about")}
            className="mt-12 bg-white text-[#134F73] hover:bg-gray-100 transition px-8 py-5 rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg"
          >
            Learn About Our Methodology
            <ArrowRight size={20} />
          </button>
        </div>

        {/* RIGHT ECOSYSTEM DIAGRAM */}
        <div className="relative flex items-center justify-center min-h-155">

          {/* Outer Rings */}
          <div className="absolute w-140 h-140 rounded-full border border-white/10" />
          <div className="absolute w-112.5 h-112.5 rounded-full border border-[#8A6B3D]/40" />
          <div className="absolute w-85 h-85 rounded-full border border-white/10" />

          {/* Center Circle */}
          <div className="relative z-10 w-40 h-40 rounded-full bg-[#F47A20] flex items-center justify-center shadow-2xl">
            <span className="text-white text-4xl font-serif font-bold">YOU</span>
          </div>

          {/* Top */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white text-[#134F73] px-8 py-4 rounded-full font-semibold shadow-lg">
            Programs
          </div>

          {/* Left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-[#134F73] px-8 py-4 rounded-full font-semibold shadow-lg">
            Community
          </div>

          {/* Right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-[#134F73] px-8 py-4 rounded-full font-semibold shadow-lg">
            Coaching
          </div>

          {/* Bottom */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-[#134F73] px-8 py-4 rounded-full font-semibold shadow-lg">
            Events
          </div>
        </div>
      </div>
    </section>
  );
}