import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#134F73] py-16 md:py-28 px-5 sm:px-6">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-60 w-60 md:h-125 md:w-125 rounded-full bg-white/5 blur-[120px] md:blur-[180px]" />
        <div className="absolute -right-40 bottom-0 h-60 w-60 md:h-125 md:w-125 rounded-full bg-[#2E6E94]/20 blur-[120px] md:blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Heading */}
        <h2 className="font-serif font-bold leading-tight text-white">
          <span className="block text-4xl sm:text-5xl md:text-7xl">
            Ready to Step Up?
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 md:mt-8 max-w-3xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
          Join a global community of leaders committed to excellence,
          impact, and continuous growth.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/register")}
          className="mt-8 md:mt-12 flex w-full items-center justify-center gap-2 rounded-full bg-[#F47A20] px-6 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:bg-[#E26C14] hover:scale-105 sm:mx-auto sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
        >
          Start Your Journey
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}