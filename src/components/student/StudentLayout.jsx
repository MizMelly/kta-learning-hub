import { useState, useEffect } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Users,
  Trophy,
  Settings,
  Menu,
  X,
  LogOut,
  Loader2,
} from "lucide-react";

import { auth } from "../../services/api";
import logo from "../../assets/logo.png";

const navItems = [
  {
    to: "/student/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/student/courses",
    label: "My Programs",
    icon: BookOpen,
  },
  {
    to: "",
    label: "Schedule",
    icon: CalendarDays,
  },
  {
    to: "",
    label: "Community",
    icon: Users,
  },
  {
    to: "",
    label: "Achievements",
    icon: Trophy,
  },
  {
    to: "",
    label: "Settings",
    icon: Settings,
  },
];

export default function StudentLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await auth.getProfile();
        setUser(response.data || response);
      } catch (err) {
        console.error("Failed to load profile:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("kta_token");
    localStorage.removeItem("kta_user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <Loader2
          className="animate-spin text-[#0B4F97]"
          size={34}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] overflow-x-hidden">

      {/* Mobile Header */}

      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between shadow-sm">

        <div className="flex items-center gap-3 min-w-0">

          <img
            src={logo}
            alt="Unleash Academy"
            className="h-10 sm:h-12 w-auto shrink-0"
          />

          <div className="min-w-0">

            <h2 className="font-bold text-[#0F2D52] text-sm sm:text-base truncate">
              Unleash Academy
            </h2>

            <p className="text-[11px] sm:text-xs text-slate-500">
              Student Portal
            </p>

          </div>

        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 flex items-center justify-center shrink-0"
        >
          {sidebarOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>

      </header>

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[85%]
          max-w-xs
          lg:w-72
          bg-white
          border-r
          border-slate-200
          z-50
          shadow-xl
          transform
          transition-transform
          duration-300
          flex
          flex-col
          overflow-hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Logo */}

        <div className="px-4 py-4 border-b border-slate-200 shrink-0">

          <div className="flex items-center gap-2">

            <img
              src={logo}
              alt="Unleash Academy"
              className="h-9 w-auto"
            />

            <div>

              <h2 className="text-lg font-bold text-[#0F4D74] leading-none">
                Unleash
              </h2>

              <p className="text-[#F47A20] tracking-[0.15em] text-[10px] mt-0.5 uppercase">
                Academy
              </p>

            </div>

          </div>

        </div>
                {/* Navigation */}

        <nav className="flex-1 px-3 py-3 space-y-2 overflow-hidden flex flex-col">

          {navItems.map((item, index) => {
            const Icon = item.icon;

            // Disabled Items
            if (!item.to) {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-semibold text-sm bg-[#134F73] text-white opacity-70 cursor-default select-none"
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              );
            }

            // Active Items
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2.5 font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-[#134F73] text-white shadow-md"
                      : "bg-[#134F73] text-white hover:bg-[#0F4566]"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

        </nav>

        {/* Profile */}

        <div className="border-t border-slate-200 p-3 shrink-0">

          <div className="flex items-center gap-2 mb-3">

            <div className="w-10 h-10 rounded-full bg-[#134F73] text-white flex items-center justify-center text-sm font-bold shrink-0">
              {(user?.fullName || "S").charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">

              <h4 className="font-semibold text-[#134F73] text-xs truncate">
                {user?.fullName || "Student"}
              </h4>

              <p className="text-[11px] text-slate-500 truncate">
                {user?.email}
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-xs text-[#475569] hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}

      <main className="lg:ml-72 min-h-screen overflow-x-hidden">

        <div className="min-h-screen w-full">
          <Outlet />
        </div>

      </main>

    </div>
  );
}