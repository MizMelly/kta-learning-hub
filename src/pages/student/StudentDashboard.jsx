import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const studentCourses = [
  {
    id: 1,
    title: "Social Media Management Masterclass",
    paid: false,
    progress: 0,
    price: 25000,
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-slate-900">
          Welcome back, jasmine.
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Continue your learning journey.
        </p>
      </div>

      {/* Section Title */}
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        My Courses
      </h2>

      {/* Empty State */}
      {studentCourses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center">
          <p className="text-gray-500">
            You don't have any courses yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {studentCourses.map((course) => {
            const isLocked = !course.paid;

            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-4">
                      {isLocked && (
                        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-gray-500">
                          <Lock size={16} />
                          <span className="font-medium">Locked</span>
                        </div>
                      )}

                      <span className="text-xl text-gray-500">
                        ₦{course.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {isLocked ? (
                    <button
                      onClick={() => navigate(`/payment/${course.id}`)}
                      className="bg-[#0F66B7] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#09539a] transition"
                    >
                      Unlock Course
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        navigate(`/student/course/${course.id}`)
                      }
                      className="bg-[#0F66B7] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#09539a] transition"
                    >
                      Continue Learning
                    </button>
                  )}
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>

                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D5E3F1] rounded-full transition-all"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
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