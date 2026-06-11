import { useNavigate } from "react-router-dom";
import { courses, currentStudent, getAllLessons } from "../../data/mockData";

const statCards = [
  {
    label: "Courses Enrolled",
    value: courses.filter((c) => c.enrolled).length,
    icon: "📚",
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    label: "Courses Completed",
    value: courses.filter((c) => c.enrolled && c.progress === 100).length,
    icon: "🎓",
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    text: "text-green-600",
  },
  {
    label: "Assignments Submitted",
    value: 3,
    icon: "📝",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    text: "text-amber-600",
  },
  {
    label: "Reflections Submitted",
    value: 2,
    icon: "💭",
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    text: "text-purple-600",
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-gray-400 text-sm mb-1 flex items-center gap-1">
          Welcome back <span>👋</span>
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-[#0B1F3A]">
          {currentStudent.name}
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Here's where you left off. Keep going.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`${card.bg} rounded-3xl p-6 border border-white shadow-sm`}
          >
            <div
              className={`w-11 h-11 ${card.iconBg} rounded-2xl flex items-center justify-center text-xl mb-5`}
            >
              {card.icon}
            </div>
            <p className={`text-4xl font-bold ${card.text}`}>{card.value}</p>
            <p className="text-gray-500 text-sm mt-2 leading-snug">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0B1F3A]">Continue Learning</h2>
          <p className="text-gray-400 text-sm mt-0.5">Pick up where you left off</p>
        </div>
        <button
          onClick={() => navigate("/student/courses")}
          className="text-sm text-[#0F2D52] font-semibold hover:underline"
        >
          View all →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {enrolledCourses.map((course) => {
          const allLessons = getAllLessons(course.id);
          const nextLesson = allLessons.find((l) => !l.completed);
          const completedCount = allLessons.filter((l) => l.completed).length;

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-gradient-to-br from-[#0F2D52] via-[#1E4A7A] to-[#0A1E36] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20% 50%, #E79B23 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1E4A7A 0%, transparent 40%)"
                  }}
                />
                <span className="text-6xl relative z-10">📱</span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-[#0B1F3A] text-base leading-snug">
                    {course.title}
                  </h3>
                  <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0">
                    {course.progress}%
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{course.instructor}</p>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div
                    className="bg-[#E79B23] h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-gray-400">
                    {completedCount} of {allLessons.length} lessons done
                  </span>
                  <span className="text-xs text-gray-400">
                    {course.modules.length} modules
                  </span>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/student/courses/${course.id}/lessons/${nextLesson?.id || allLessons[0]?.id}`
                    )
                  }
                  className="w-full bg-[#0F2D52] text-white rounded-2xl py-3 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors"
                >
                  Continue Learning →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
