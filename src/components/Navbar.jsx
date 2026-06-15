import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#f4f7fa] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#0f66b7] rounded-xl flex items-center justify-center">
            <GraduationCap className="text-white w-4 h-4 sm:w-6 sm:h-6" />
          </div>

          <h1 className="text-base sm:text-xl md:text-2xl font-bold text-[#1d2939]">
            KTA Learning Hub
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-8">

          <button
            onClick={() => navigate("/courses")}
            className="text-sm sm:text-base text-gray-700 font-medium hover:text-black transition"
          >
            Courses
          </button>

          {/* Admin Button */}
          <button
            onClick={() => navigate("/admin")}
            className="text-sm sm:text-base text-gray-700 font-medium hover:text-black transition"
          >
            Admin
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#0f66b7] text-white text-sm sm:text-base px-3 py-2 sm:px-5 rounded-xl font-medium hover:bg-[#09539a] transition"
          >
            Sign in
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;