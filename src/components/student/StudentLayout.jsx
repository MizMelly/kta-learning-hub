import { useState, useEffect } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Menu,
  X,
  LogOut,
  Loader2,
} from "lucide-react";
import { auth } from "../../services/api";

const navItems = [
  {
    to: "/student/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/student/courses",
    label: "My Courses",
    icon: BookOpen,
  },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await auth.getProfile();
        setUser(res.data || res);
      } catch (err) {
        console.error("Failed to load profile:", err);
        // If profile fails, redirect to login
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0F2D52]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0F2D52] to-[#1E4A7A] flex items-center justify-center text-white font-bold shadow-md">
            🎓
          </div>
          <div>
            <h1 className="font-bold text-[#0F2D52]">KTA Hub</h1>
            <p className="text-xs text-gray-400">Learning Platform</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center bg-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          h-full
          w-72
          bg-[#0F2D52]
          text-white
          z-50
          transform
          transition-transform
          duration-300
          shadow-2xl
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          lg:flex
          lg:flex-col
        `}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E79B23] to-amber-400 flex items-center justify-center shadow-lg">
              🎓
            </div>
            <div>
              <h1 className="text-xl font-bold">KTA Hub</h1>
              <p className="text-xs text-white/60">Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium ${
                    isActive
                      ? "bg-[#E79B23] text-white shadow-lg"
                      : "hover:bg-white/10 text-white/80"
                  }`
                }
              >
                <Icon size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Student Profile */}
        <div className="border-t border-white/10 p-4">
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E79B23] to-amber-400 flex items-center justify-center text-[#0F2D52] font-bold">
                {(user?.fullName || "?").charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.fullName || "Student"}</p>
                <p className="text-xs text-white/50 truncate">{user?.email || ""}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
