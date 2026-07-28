import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("kta_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

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

  const isAdmin =
    user?.role === "Admin" || user?.Role === "Admin";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Events", path: "/events" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0F4A66]">
      <div className="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Unleash Academy"
            className="h-12 lg:h-14 w-auto"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;

            return (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`relative font-medium transition duration-300 ${
                  active
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}

                {active && (
                  <span className="absolute left-0 right-0 -bottom-3 mx-auto h-0.5 w-8 rounded-full bg-[#F47A20]" />
                )}
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="text-white/80 hover:text-white transition"
            >
              Admin
            </button>
          )}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-6">

          {user ? (
            <>
              <span className="text-white text-sm">
                {user.fullName || user.FullName}
              </span>

              <button
                onClick={handleLogout}
                className="text-white hover:text-[#F47A20] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-white font-medium hover:text-[#F47A20] transition"
              >
                Log In
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-[#F47A20] hover:bg-[#E36C13] text-white font-semibold px-7 py-3 rounded-full transition duration-300"
              >
                Start Your Journey
              </button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0F4A66] border-t border-white/10">

          <div className="px-6 py-5 flex flex-col gap-5">

            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.path)}
                className="text-left text-white hover:text-[#F47A20]"
              >
                {link.name}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => handleNavigate("/admin")}
                className="text-left text-white hover:text-[#F47A20]"
              >
                Admin
              </button>
            )}

            {user ? (
              <>
                <span className="text-white">
                  {user.fullName || user.FullName}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigate("/login")}
                  className="text-left text-white"
                >
                  Log In
                </button>

                <button
                  onClick={() => handleNavigate("/register")}
                  className="bg-[#F47A20] text-white py-3 rounded-full font-semibold"
                >
                  Start Your Journey
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;