import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  NotebookPen,
  MessageSquare,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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
    name: "Reflections",
    path: "/admin/reflections",
    icon: <NotebookPen size={20} />,
  },
  {
    name: "Discussions",
    path: "/admin/discussions",
    icon: <MessageSquare size={20} />,
  },
];

const AdminSidebar = () => {
  return (
    <div className="w-72 bg-[#0A2342] text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        🎓 KTA Hub
      </h1>

      <p className="text-gray-400 uppercase text-sm mb-4">
        Management
      </p>

      <div className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl transition ${
                isActive
                  ? "bg-[#F4A41D] text-black"
                  : "hover:bg-[#16395E]"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;