import {
  Users,
  BookOpen,
  GraduationCap,
  FileCheck,
  NotebookPen,
  Star,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsGrid({ stats }) {
  const data = stats || {
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalAssignmentsSubmitted: 0,
    totalReflectionsSubmitted: 0,
    averageLessonRating: 0,
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Students"
        value={data.totalStudents}
        icon={<Users size={22} className="text-blue-600" />}
        bgColor="bg-blue-50"
      />

      <StatCard
        title="Total Courses"
        value={data.totalCourses}
        icon={<BookOpen size={22} className="text-blue-600" />}
        bgColor="bg-blue-50"
      />

      <StatCard
        title="Enrollments"
        value={data.totalEnrollments}
        icon={<GraduationCap size={22} className="text-amber-600" />}
        bgColor="bg-amber-50"
      />

      <StatCard
        title="Assignments Submitted"
        value={data.totalAssignmentsSubmitted}
        icon={<FileCheck size={22} className="text-green-600" />}
        bgColor="bg-green-50"
      />

      <StatCard
        title="Reflections Submitted"
        value={data.totalReflectionsSubmitted}
        icon={<NotebookPen size={22} className="text-green-600" />}
        bgColor="bg-green-50"
      />

      <StatCard
        title="Avg Lesson Rating"
        value={data.averageLessonRating?.toFixed(1) || "0.0"}
        icon={<Star size={22} className="text-amber-600" />}
        bgColor="bg-amber-50"
      />
    </div>
  );
}
