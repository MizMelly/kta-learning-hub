import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="bg-[#f4f7fa] border-b border-gray-200 relative">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate("/courses")}
            className="text-gray-700 font-medium hover:text-black transition"
          >
            Courses
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="text-gray-700 font-medium hover:text-black transition"
          >
            Admin
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#0f66b7] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#09539a] transition"
          >
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#1d2939]" />
          ) : (
            <Menu className="w-6 h-6 text-[#1d2939]" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            <button
              onClick={() => handleNavigate("/courses")}
              className="text-left text-gray-700 font-medium py-2"
            >
              Courses
            </button>

            <button
              onClick={() => handleNavigate("/admin")}
              className="text-left text-gray-700 font-medium py-2"
            >
              Admin
            </button>

            <button
              onClick={() => handleNavigate("/login")}
              className="bg-[#0f66b7] text-white py-3 rounded-xl font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;