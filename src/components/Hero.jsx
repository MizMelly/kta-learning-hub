import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F5F7FA] py-12 sm:py-16 lg:min-h-[calc(100vh-80px)] flex items-center justify-center px-5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0A376A]">
          Learning That Drives Real
          <br />
          Transformation
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-[#4B5563]">
          More than videos. More than courses. A complete learning
          experience that combines guided lessons, audio learning,
          assignments, reflections, and community engagement to help
          learners grow, apply knowledge, and achieve measurable results.
        </p>

        {/* Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Primary CTA */}
          <button  onClick={() => navigate("/login")}
           className="w-full sm:w-auto bg-[#0B4F97] text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-[#0A376A] transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secondary CTA */}
          <button  onClick={() => navigate("/login")}
           className="w-full sm:w-auto bg-white border-2 border-[#0B4F97] px-8 py-4 rounded-2xl font-semibold text-lg text-[#0B4F97] hover:bg-[#EAF2FB] transition-all duration-300">
            Explore Platform
          </button>
        </div>

        {/* Accent Line */}
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-1 bg-[#E88B1A] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;