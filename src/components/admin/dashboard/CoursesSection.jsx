import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { courses } from "../../../services/api";
import CourseCard from "./CourseCard";

export default function CoursesSection() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courses.getAll();
        const data = res.data || res || [];
        setCourseList(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setCourseList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-[#0B1F3A] mb-6">
        Your Courses
      </h2>

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="animate-spin text-[#0F66B7]" size={24} />
        </div>
      ) : courseList.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">No courses created yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {courseList.map((course) => (
            <CourseCard
              key={course.id}
              image={course.thumbnailUrl || course.image || null}
              title={course.title}
              subtitle={`${course.modules?.length || course.moduleCount || 0} modules · ${course.lessons?.length || course.lessonCount || 0} lessons`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
