import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("kta_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("kta_token");
    localStorage.removeItem("kta_user");
    setUser(null);
    navigate("/login");
  };

  const isAdmin = user?.role === "Admin" || user?.Role === "Admin";

  return (
    <header className="bg-[#F5F7FA] border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 sm:h-24 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="KonfirmTech Africa"
            className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate("/courses")}
            className="font-medium text-[#1F2937] hover:text-[#0B4F97] transition-colors"
          >
            Courses
          </button>

          {/* Only show Admin if logged in as admin */}
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="font-medium text-[#1F2937] hover:text-[#0B4F97] transition-colors"
            >
              Admin
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {user.fullName || user.FullName || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#0B4F97] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0A376A] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#0A376A]" />
          ) : (
            <Menu className="w-6 h-6 text-[#0A376A]" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            <button
              onClick={() => handleNavigate("/courses")}
              className="text-left font-medium text-[#1F2937] py-2 hover:text-[#0B4F97]"
            >
              Courses
            </button>

            {isAdmin && (
              <button
                onClick={() => handleNavigate("/admin")}
                className="text-left font-medium text-[#1F2937] py-2 hover:text-[#0B4F97]"
              >
                Admin
              </button>
            )}

            {user ? (
              <>
                <span className="text-sm text-gray-500 py-2">
                  {user.fullName || user.FullName || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-left font-medium text-red-500 py-2 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("/login")}
                className="bg-[#0B4F97] hover:bg-[#0A376A] text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
