import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0A376A] py-20 px-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#E88B1A]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#0B4F97]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
          Ready To Experience
          <br />
          Learning Differently?
        </h2>

        {/* Description */}
        <p className="text-blue-100 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Join a growing community of learners gaining practical skills,
          engaging with experts, and transforming knowledge into results.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-[#E88B1A] hover:bg-[#d87d10] text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create Free Account
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => navigate("/courses")}
            className="bg-white text-[#0B4F97] px-8 py-4 rounded-2xl font-semibold border border-white hover:bg-[#F5F7FA] transition-all duration-300"
          >
            Explore Courses
          </button>
        </div>

        {/* Accent Line */}
        <div className="flex justify-center mt-12">
          <div className="w-24 h-1 bg-[#E88B1A] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}