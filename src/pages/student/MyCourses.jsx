import { useNavigate } from "react-router-dom";
import { courses, getAllLessons } from "../../data/mockData";

export default function MyCourses() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#0B1F3A]">My Courses</h1>
        <p className="text-gray-400 mt-1 text-sm">
          {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>

      <div className="space-y-6">
        {enrolledCourses.map((course) => {
          const allLessons = getAllLessons(course.id);
          const completedCount = allLessons.filter((l) => l.completed).length;
          const nextLesson = allLessons.find((l) => !l.completed);

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Thumbnail */}
                <div className="lg:w-60 h-48 lg:h-auto bg-gradient-to-br from-[#0F2D52] via-[#1E4A7A] to-[#0A1E36] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 50%, #E79B23 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1E4A7A 0%, transparent 40%)",
                    }}
                  />
                  <span className="text-7xl relative z-10">📱</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 lg:p-8">
                  {/* Title row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <h2 className="text-xl font-bold text-[#0B1F3A] leading-snug">
                        {course.title}
                      </h2>
                      <p className="text-gray-400 text-sm mt-0.5">{course.instructor}</p>
                    </div>
                    <span
                      className={`self-start px-4 py-1.5 rounded-full text-xs font-bold flex-shrink-0 ${
                        course.progress === 100
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {course.progress === 100 ? "✓ Completed" : "In Progress"}
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-4 mb-5 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                      <span>📦</span> {course.modules.length} modules
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                      <span>🎬</span> {allLessons.length} lessons
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                      <span>✅</span> {completedCount} completed
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-500">Progress</span>
                      <span className="text-xs font-bold text-[#0F2D52]">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-[#E79B23] h-2.5 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="space-y-4 mb-7">
                    {course.modules.map((mod) => (
                      <div key={mod.id}>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                          {mod.title}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {mod.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() =>
                                navigate(
                                  `/student/courses/${course.id}/lessons/${lesson.id}`
                                )
                              }
                              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:shadow-sm ${
                                lesson.completed
                                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                  : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-[#0F2D52]"
                              }`}
                            >
                              {lesson.completed ? "✓ " : ""}
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
                    className="bg-[#0F2D52] text-white rounded-2xl px-8 py-3 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors shadow-sm"
                  >
                    {nextLesson ? "Continue Learning →" : "Review Course →"}
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
