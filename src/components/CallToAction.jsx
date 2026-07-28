import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#134F73] py-28 px-6">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-125 w-125 rounded-full bg-white/5 blur-[180px]" />
        <div className="absolute -right-40 bottom-0 h-125 w-125 rounded-full bg-[#2E6E94]/20 blur-[180px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h2 className="font-serif text-white text-5xl md:text-7xl font-bold leading-tight">
          Ready to Step Up?
        </h2>

        {/* Description */}
        <p className="mt-8 text-xl md:text-2xl text-white/85 leading-9 max-w-3xl mx-auto">
          Join a global community of leaders committed to excellence,
          impact, and continuous growth.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/register")}
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#F47A20] px-10 py-5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:bg-[#E26C14] hover:scale-105"
        >
          Start Your Journey
          <ArrowRight size={22} />
        </button>

      </div>
    </section>
  );
}