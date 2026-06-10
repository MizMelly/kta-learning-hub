import { useNavigate } from "react-router-dom";
import { courses, currentStudent, getAllLessons } from "../../data/mockData";

const statCards = [
  {
    label: "Courses Enrolled",
    value: courses.filter((c) => c.enrolled).length,
    icon: "📚",
    color: "bg-info-bg text-info",
  },
  {
    label: "Courses Completed",
    value: courses.filter((c) => c.enrolled && c.progress === 100).length,
    icon: "✅",
    color: "bg-success-bg text-success",
  },
  {
    label: "Assignments Submitted",
    value: 3,
    icon: "📝",
    color: "bg-warning-bg text-warning",
  },
  {
    label: "Reflections Submitted",
    value: 2,
    icon: "💭",
    color: "bg-secondary/10 text-secondary-dark",
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-text-secondary text-sm mb-1">Welcome back 👋</p>
        <h2 className="text-3xl font-bold text-text-primary">
          {currentStudent.name}
        </h2>
        <p className="text-text-secondary mt-1">
          Here's where you left off. Keep going.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 border border-border-light shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${card.color}`}
            >
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-text-primary">{card.value}</p>
            <p className="text-text-secondary text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-text-primary">
          Continue Learning
        </h3>
        <button
          onClick={() => navigate("/student/courses")}
          className="text-sm text-info hover:underline font-medium"
        >
          View all →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {enrolledCourses.map((course) => {
          const allLessons = getAllLessons(course.id);
          const nextLesson = allLessons.find((l) => !l.completed);

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden"
            >
              {/* Thumbnail placeholder */}
              <div className="h-36 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-5xl">📱</span>
              </div>

              <div className="p-5">
                <h4 className="font-bold text-text-primary text-base leading-snug mb-1">
                  {course.title}
                </h4>
                <p className="text-text-secondary text-sm mb-4">
                  {course.instructor}
                </p>

                {/* Progress bar */}
                <div className="mb-1 flex justify-between items-center">
                  <span className="text-xs text-text-muted">Progress</span>
                  <span className="text-xs font-semibold text-primary">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-border-light rounded-full h-2 mb-4">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/student/courses/${course.id}/lessons/${
                        nextLesson?.id || allLessons[0]?.id
                      }`
                    )
                  }
                  className="w-full bg-primary text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-primary-light transition-colors"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
