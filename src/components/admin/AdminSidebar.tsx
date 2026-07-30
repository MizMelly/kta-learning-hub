import type { Dispatch, SetStateAction } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  X,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const links = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Courses",
    path: "/admin/courses",
    icon: <BookOpen size={20} />,
  },
  {
    name: "Students",
    path: "/admin/students",
    icon: <Users size={20} />,
  },
  {
    name: "Submissions",
    path: "/admin/submissions",
    icon: <FileText size={20} />,
  },
  {
    name: "Discussions",
    path: "/admin/discussions",
    icon: <MessageSquare size={20} />,
  },
];

export default function AdminSidebar({
  isOpen,
  setIsOpen,
}: AdminSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("kta_token");
    localStorage.removeItem("kta_user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:relative
          top-0 left-0
          z-50
          h-screen
          w-67.5
          bg-[#0F2D52]
          text-white
          flex flex-col
          transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="px-5 py-4 flex items-center gap-3">
  <div className="h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center">
    <img
      src={logo}
      alt="KTA Hub Logo"
      className="h-full w-full object-contain"
    />
  </div>

  <h1 className="text-xl font-semibold">
    Unleash Academy
  </h1>
</div>

        {/* Section Label */}
        <div className="px-6 py-3">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                  isActive
                    ? "bg-[#E79B23] text-white font-semibold"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="mt-auto border-t border-white/10 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center font-semibold text-white">
              AD
            </div>

            <div>
              <p className="font-medium text-white">Admin User</p>
              <p className="text-xs text-white/40">
                admin@unleashacademy.com
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}