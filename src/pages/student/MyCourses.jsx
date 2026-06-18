import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { enrollments, courses } from "../../services/api";
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Layers,
  Clock,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function MyCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await enrollments.getMyCourses();
      const data = res.data || res || [];
      const enrolledList = Array.isArray(data) ? data : [];
      setEnrolledCourses(enrolledList);

      // Fetch full course details for each enrolled course to get modules/lessons
      const detailsMap = {};
      await Promise.all(
        enrolledList.map(async (enrollment) => {
          const courseId = enrollment.courseId || enrollment.id;
          try {
            const courseData = await courses.getById(courseId);
            detailsMap[courseId] = courseData;
          } catch (err) {
            console.error("Failed to fetch course details:", courseId, err);
          }
        })
      );
      setCourseDetails(detailsMap);
    } catch (err) {
      setError(err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchData();
    }, 0);

    return () => clearTimeout(timer);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0F2D52]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-[#0F2D52] text-white px-6 py-2 rounded-xl text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B1F3A]">My Courses</h1>
        <p className="text-gray-400 text-sm mt-0.5">
          {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <BookOpen size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
          <button
            onClick={() => navigate("/student/dashboard")}
            className="text-[#0F2D52] font-medium text-sm hover:underline mt-2"
          >
            Browse courses on Dashboard →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {enrolledCourses.map((course) => {
            const courseId = course.courseId || course.id;
            const details = courseDetails[courseId];

            // Use course details if available, otherwise fall back to enrollment data
            const moduleCount = details?.modules?.length || course.moduleCount || 0;
            const lessonCount = details?.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || course.lessonCount || 0;
            const completedCount = course.completedLessons || 0;
            const progress = lessonCount > 0 ? Math.round((completedCount / lessonCount) * 100) : 0;
            const hasContent = moduleCount > 0 || lessonCount > 0;
            const instructor = details?.instructorName || course.instructor || "KTA Learning Hub";

            return (
              <div
                key={courseId}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Thumbnail */}
                  <div className="lg:w-44 h-32 lg:h-auto bg-linear-to-br from-[#0F2D52] via-[#1E4A7A] to-[#0A1E36] flex items-center justify-center shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,#E79B23_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#1E4A7A_0%,transparent_40%)]" />
                    <BookOpen size={32} className="text-white/90 relative z-10" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                      <div>
                        <h2 className="text-base font-bold text-[#0B1F3A] leading-snug">
                          {course.title}
                        </h2>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {instructor}
                        </p>
                      </div>
                      <span
                        className={`self-start px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                          progress === 100
                            ? "bg-green-50 text-green-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {progress === 100 ? "Completed" : "In Progress"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 mt-3">
                      {hasContent ? (
                        <>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Layers size={13} />
                            {moduleCount} modules
                          </div>
                          <span className="text-gray-300">·</span>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <PlayCircle size={13} />
                            {lessonCount} lessons
                          </div>
                        </>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-xs font-medium">
                          Content coming soon
                        </span>
                      )}
                      <span className="text-gray-300">·</span>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 size={13} />
                        {completedCount} completed
                      </div>
                      {course.duration && (
                        <>
                          <span className="text-gray-300">·</span>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={13} />
                            {course.duration}
                          </div>
                        </>
                      )}
                    </div>

                    {hasContent && (
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-medium text-gray-500">Progress</span>
                          <span className="text-xs font-bold text-[#0F2D52]">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-linear-to-r from-[#E79B23] to-amber-400 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => navigate(`/student/courses/${courseId}`)}
                      className="bg-[#0F2D52] text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors shadow-sm flex items-center gap-2"
                    >
                      {progress === 100 ? (
                        <>Review Course <ArrowRight size={14} /></>
                      ) : progress > 0 || completedCount > 0 ? (
                        <>Continue Learning <ArrowRight size={14} /></>
                      ) : (
                        <>Start Learning <ArrowRight size={14} /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
