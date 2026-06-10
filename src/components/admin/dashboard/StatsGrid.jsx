import {
  Users,
  BookOpen,
  GraduationCap,
  FileCheck,
  NotebookPen,
  Star,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Students"
        value="5"
        icon={<Users size={22} className="text-blue-600" />}
        bgColor="bg-blue-50"
      />

      <StatCard
        title="Total Courses"
        value="2"
        icon={<BookOpen size={22} className="text-blue-600" />}
        bgColor="bg-blue-50"
      />

      <StatCard
        title="Enrollments"
        value="6"
        icon={<GraduationCap size={22} className="text-amber-600" />}
        bgColor="bg-amber-50"
      />

      <StatCard
        title="Assignments Submitted"
        value="3"
        icon={<FileCheck size={22} className="text-green-600" />}
        bgColor="bg-green-50"
      />

      <StatCard
        title="Reflections Submitted"
        value="3"
        icon={<NotebookPen size={22} className="text-green-600" />}
        bgColor="bg-green-50"
      />

      <StatCard
        title="Avg Lesson Rating"
        value="4.7"
        icon={<Star size={22} className="text-amber-600" />}
        bgColor="bg-amber-50"
      />
    </div>
  );
}