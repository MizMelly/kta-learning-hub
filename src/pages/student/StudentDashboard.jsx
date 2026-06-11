import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  FileText,
  MessageSquare,
  Search,
  Bell,
  ArrowRight,
} from "lucide-react";
import { courses, currentStudent, getAllLessons } from "../../data/mockData";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter((c) => c.enrolled);

  const statCards = [
    {
      label: "Courses Enrolled",
      value: enrolledCourses.length,
      icon: BookOpen,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      label: "Courses Completed",
      value: enrolledCourses.filter((c) => c.progress === 100).length,
      icon: GraduationCap,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      text: "text-green-700",
    },
    {
      label: "Assignments Submitted",
      value: 3,
      icon: FileText,
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      text: "text-amber-700",
    },
    {
      label: "Reflections Submitted",
      value: 2,
      icon: MessageSquare,
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      text: "text-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-5 lg:p-8">
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            Welcome back <span className="text-sm">👋</span>
          </p>
          <h1 className="text-2xl font-bold text-[#0F2D52] mt-1">
            {currentStudent.name}
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Continue your learning journey with KTA Hub
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm w-64">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search courses..."
              className="outline-none text-sm flex-1 placeholder:text-gray-400"
            />
          </div>

          <button className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition">
            <Bell size={18} />
          </button>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F2D52] to-[#1E4A7A] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {currentStudent.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#0F2D52] via-[#1E4A7A] to-[#355D8A] p-5 md:p-6 text-white overflow-hidden relative shadow-md">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E79B23]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-bold">
            Keep Learning, Keep Growing 🚀
          </h2>
          <p className="text-white/70 mt-2 text-sm max-w-xl">
            Track your progress, complete lessons, submit assignments,
            and continue building valuable skills.
          </p>
          <button
            onClick={() => navigate("/student/courses")}
            className="mt-4 bg-[#E79B23] hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md"
          >
            View My Courses
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className={`${card.bg} rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div
                className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center mb-3`}
              >
                <Icon size={20} className={card.text} />
              </div>
              <p className={`text-2xl font-bold ${card.text}`}>
                {card.value}
              </p>
              <p className="text-gray-500 text-xs mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Continue Learning Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0F2D52]">
            Continue Learning
          </h2>
          <p className="text-gray-400 text-xs mt-0.5">
            Pick up where you left off
          </p>
        </div>
        <button
          onClick={() => navigate("/student/courses")}
          className="text-[#0F2D52] font-semibold text-sm hover:text-[#E79B23] transition"
        >
          View All
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {enrolledCourses.map((course) => {
          const allLessons = getAllLessons(course.id);
          const completedCount = allLessons.filter((l) => l.completed).length;
          const nextLesson = allLessons.find((l) => !l.completed);

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Course Banner */}
              <div className="h-36 bg-gradient-to-br from-[#0F2D52] via-[#1E4A7A] to-[#355D8A] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E79B23]/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <BookOpen size={44} className="text-white relative z-10" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-bold text-[#0F2D52] text-base leading-snug">
                    {course.title}
                  </h3>
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap mt-0.5">
                    {course.progress}%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4">{course.instructor}</p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#E79B23] to-amber-400 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-xs text-gray-400 mb-5">
                  <span>
                    {completedCount}/{allLessons.length} lessons
                  </span>
                  <span>{course.modules.length} modules</span>
                </div>

                {/* CTA */}
                <button
                  onClick={() =>
                    navigate(
                      `/student/courses/${course.id}/lessons/${
                        nextLesson?.id || allLessons[0]?.id
                      }`
                    )
                  }
                  className="w-full bg-gradient-to-r from-[#0F2D52] to-[#1E4A7A] text-white rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-all"
                >
                  Continue Learning
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}