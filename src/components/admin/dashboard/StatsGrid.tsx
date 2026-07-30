import {
  Users,
  BookOpen,
  GraduationCap,
  FileCheck,
  NotebookPen,
  Star,
} from "lucide-react";

import StatCard from "./StatCard";

interface DashboardStats {
  totalStudents?: number;
  totalCourses?: number;
  totalEnrollments?: number;
  totalAssignmentsSubmitted?: number;
  totalReflectionsSubmitted?: number;
  averageLessonRating?: number;
}

interface StatsGridProps {
  stats: DashboardStats | null;
}

export default function StatsGrid({
  stats,
}: StatsGridProps) {
  const data: DashboardStats = stats ?? {
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
        value={data.totalStudents ?? 0}
        icon={<Users size={22} className="text-blue-600" />}
        bgColor="bg-blue-50"
      />

      <StatCard
        title="Total Courses"
        value={data.totalCourses ?? 0}
        icon={<BookOpen size={22} className="text-blue-600" />}
        bgColor="bg-blue-50"
      />

      <StatCard
        title="Enrollments"
        value={data.totalEnrollments ?? 0}
        icon={<GraduationCap size={22} className="text-amber-600" />}
        bgColor="bg-amber-50"
      />

      <StatCard
        title="Assignments Submitted"
        value={data.totalAssignmentsSubmitted ?? 0}
        icon={<FileCheck size={22} className="text-green-600" />}
        bgColor="bg-green-50"
      />

      <StatCard
        title="Reflections Submitted"
        value={data.totalReflectionsSubmitted ?? 0}
        icon={<NotebookPen size={22} className="text-green-600" />}
        bgColor="bg-green-50"
      />

      <StatCard
        title="Avg Lesson Rating"
        value={(data.averageLessonRating ?? 0).toFixed(1)}
        icon={<Star size={22} className="text-amber-600" />}
        bgColor="bg-amber-50"
      />
    </div>
  );
}