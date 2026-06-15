import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-[#f4f7fa] min-h-[calc(100vh-64px)] flex items-center justify-center px-5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#101828]">
          Learning That Drives Real
          <br />
          Transformation
        </h1>

        {/* Description */}
        <p className="mt-3 sm:mt-6 max-w-8xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-[#667085]">
          More than videos. More than courses. A complete learning
          experience that combines guided lessons, audio learning,
          assignments, reflections, and community engagement to help
          learners grow, apply knowledge, and achieve measurable results.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#0f66b7] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-[#09539a] transition shadow-md">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>

          <button className="w-full sm:w-auto bg-white border border-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg text-[#1d2939] shadow-sm hover:bg-gray-50 transition">
            Explore Platform
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;