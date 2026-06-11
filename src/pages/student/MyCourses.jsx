import { useNavigate } from "react-router-dom";
import { courses, getAllLessons } from "../../data/mockData";
import { BookOpen, CheckCircle2, PlayCircle, Layers, Clock } from "lucide-react";

export default function MyCourses() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <div className="min-h-screen bg-slate-50 p-5 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B1F3A]">My Courses</h1>
        <p className="text-gray-400 text-sm mt-0.5">
          {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>

      <div className="space-y-4">
        {enrolledCourses.map((course) => {
          const allLessons = getAllLessons(course.id);
          const completedCount = allLessons.filter((l) => l.completed).length;
          const nextLesson = allLessons.find((l) => !l.completed);

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Thumbnail */}
                <div className="lg:w-44 h-32 lg:h-auto bg-gradient-to-br from-[#0F2D52] via-[#1E4A7A] to-[#0A1E36] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,_#E79B23_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_#1E4A7A_0%,_transparent_40%)]" />
                  <BookOpen size={32} className="text-white/90 relative z-10" />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 lg:p-6">
                  {/* Title row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                    <div>
                      <h2 className="text-base font-bold text-[#0B1F3A] leading-snug">
                        {course.title}
                      </h2>
                      <p className="text-gray-400 text-xs mt-0.5">{course.instructor}</p>
                    </div>
                    <span
                      className={`self-start px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                        course.progress === 100
                          ? "bg-green-50 text-green-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {course.progress === 100 ? "Completed" : "In Progress"}
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-2 mb-4 mt-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Layers size={13} />
                      {course.modules.length} modules
                    </div>
                    <span className="text-gray-300">·</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <PlayCircle size={13} />
                      {allLessons.length} lessons
                    </div>
                    <span className="text-gray-300">·</span>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle2 size={13} />
                      {completedCount} completed
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-gray-500">Progress</span>
                      <span className="text-xs font-bold text-[#0F2D52]">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#E79B23] to-amber-400 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="space-y-3 mb-5">
                    {course.modules.map((mod) => (
                      <div key={mod.id}>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                          {mod.title}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {mod.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() =>
                                navigate(
                                  `/student/courses/${course.id}/lessons/${lesson.id}`
                                )
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                lesson.completed
                                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                  : "bg-white text-gray-500 border-slate-200 hover:border-slate-300 hover:text-[#0F2D52]"
                              }`}
                            >
                              {lesson.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/student/courses/${course.id}/lessons/${
                          nextLesson?.id || allLessons[0]?.id
                        }`
                      )
                    }
                    className="bg-[#0F2D52] text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors shadow-sm flex items-center gap-2"
                  >
                    {nextLesson ? "Continue Learning" : "Review Course"}
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}