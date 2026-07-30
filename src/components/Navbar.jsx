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
    <header className="sticky top-0 z-50 bg-[#0F4A66] shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:h-20 lg:px-10">

        {/* Logo */}
        <button onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Unleash Academy"
            className="h-9 w-auto sm:h-10 lg:h-14"
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
                className={`relative font-medium transition ${
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

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm text-white">
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
                className="font-medium text-white hover:text-[#F47A20] transition"
              >
                Log In
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-full bg-[#F47A20] px-7 py-3 font-semibold text-white transition hover:bg-[#E36C13]"
              >
                Start Your Journey
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#0F4A66] lg:hidden">
          <div className="flex flex-col gap-5 px-5 py-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.path)}
                className="text-left text-white transition hover:text-[#F47A20]"
              >
                {link.name}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => handleNavigate("/admin")}
                className="text-left text-white transition hover:text-[#F47A20]"
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
                  className="rounded-full bg-[#F47A20] py-3 font-semibold text-white"
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