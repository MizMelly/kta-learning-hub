import { useState } from "react";
import { Loader2 } from "lucide-react";
import CourseCard from "./CourseCard";

interface Course {
  id: string | number;
  title: string;
  thumbnailUrl?: string;
  image?: string;
  totalModules?: number;
  totalLessons?: number;
}

export default function CoursesSection() {
  const [courseList] = useState<Course[]>([]);
  const [loading] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold text-[#0B1F3A]">
        Courses
      </h2>

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2
            className="animate-spin text-[#0F66B7]"
            size={24}
          />
        </div>
      ) : courseList.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">
          No courses created yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {courseList.map((course) => (
            <CourseCard
              key={course.id}
              image={course.thumbnailUrl ?? course.image ?? ""}
              title={course.title}
              subtitle={`${course.totalModules ?? 0} modules · ${
                course.totalLessons ?? 0
              } lessons`}
            />
          ))}
        </div>
      )}
    </div>
  );
}