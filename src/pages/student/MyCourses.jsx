import { useNavigate } from "react-router-dom";
import { courses, getAllLessons } from "../../data/mockData";

export default function MyCourses() {
  const navigate = useNavigate();
  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary">My Courses</h2>
        <p className="text-text-secondary mt-1">
          {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>

      <div className="space-y-5">
        {enrolledCourses.map((course) => {
          const allLessons = getAllLessons(course.id);
          const completedCount = allLessons.filter((l) => l.completed).length;
          const nextLesson = allLessons.find((l) => !l.completed);

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="md:w-56 h-40 md:h-auto bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                  <span className="text-6xl">📱</span>
                </div>

                {/* Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-text-secondary text-sm mt-0.5">
                        {course.instructor}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                        course.progress === 100
                          ? "bg-success-bg text-success"
                          : "bg-info-bg text-info"
                      }`}
                    >
                      {course.progress === 100 ? "Completed" : "In Progress"}
                    </span>
                  </div>

                  {/* Modules summary */}
                  <div className="flex gap-4 mt-3 mb-4">
                    <span className="text-xs text-text-muted">
                      📦 {course.modules.length} modules
                    </span>
                     <span className="text-xs text-text-muted">
                      🎬 {allLessons.length} lessons
                    </span>
                    <span className="text-xs text-text-muted">
                      ✅ {completedCount} completed
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-1 flex justify-between items-center">
                    <span className="text-xs text-text-muted">Progress</span>
                    <span className="text-xs font-semibold text-primary">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-border-light rounded-full h-2 mb-5">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  {/* Modules list */}
                  <div className="space-y-3 mb-5">
                    {course.modules.map((mod) => (
                      <div key={mod.id}>
                        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
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
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                lesson.completed
                                  ? "bg-success-bg text-success border-success/20"
                                  : "bg-surface border-border text-text-secondary hover:bg-border-light"
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
                    className="bg-primary text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-primary-light transition-colors"
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
