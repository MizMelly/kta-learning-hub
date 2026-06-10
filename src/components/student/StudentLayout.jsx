import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { currentStudent } from "../../data/mockData";

const navItems = [
  { to: "/student/dashboard", label: "Dashboard", icon: "⊞" },
  { to: "/student/courses", label: "My Courses", icon: "📚" },
];

export default function StudentLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col fixed top-0 left-0 h-full z-20">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl">
            🎓
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">KTA Hub</h1>
            <p className="text-white/50 text-xs mt-0.5">Learning Platform</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Student profile footer */}
        <div className="border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
              {currentStudent.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentStudent.name}
              </p>
              <p className="text-xs text-white/40 truncate">
                {currentStudent.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
