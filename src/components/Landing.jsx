import { GraduationCap, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-100 px-4">
      <div className="text-center max-w-2xl">
        {/* Badge */}
        

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          A modern LMS, built for educators and learners.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Pick a view to explore the student portal for learning, or the admin
          console for course operations.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Student Button */}
          <button
            onClick={() => navigate("/student/dashboard")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            <GraduationCap size={18} />
            Open Student Portal
            <ArrowRight size={18} />
          </button>

          {/* Admin Button */}
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition"
          >
            <Shield size={18} />
            Open Admin Console
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}