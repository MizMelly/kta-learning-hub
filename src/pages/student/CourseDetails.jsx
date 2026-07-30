import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Loader2,
  BookOpen,
  Clock,
  Layers,
  Lock,
} from "lucide-react";
import { courses, modules, enrollments } from "../../services/api";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [modulesList, setModulesList] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [courseRes, modulesRes, enrollmentRes] = await Promise.all([
        courses.getById(courseId),
        modules.getByCourse(courseId),
        enrollments.check(courseId).catch(() => ({ data: null })),
      ]);
      setCourse(courseRes.data || courseRes);
      const mods = modulesRes.data || modulesRes || [];
      setModulesList(Array.isArray(mods) ? mods : []);
      setEnrollment(enrollmentRes.data || enrollmentRes || null);
    } catch (err) {
      setError(err.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    Promise.resolve().then(fetchData);
  }, [fetchData]);

  const isEnrolled = !!enrollment;
  const progress = enrollment?.progressPercentage || course?.progressPercentage || 0;

  const allLessons = [];
  modulesList.forEach((mod) => {
    if (mod.lessons) allLessons.push(...mod.lessons);
  });
  const hasContent = allLessons.length > 0;
  const firstLesson = allLessons[0];

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

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-400">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/student/courses")}
          className="flex items-center gap-2 text-sm text-[#0F2D52] font-medium mb-4 sm:mb-6 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to My Courses
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          {/* Left */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              {course.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {course.instructor || "KTA Faculty"}
            </p>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 leading-7 sm:leading-relaxed">
              {course.description || "No description available."}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Layers size={14} />
                {modulesList.length} modules
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={14} />
                {allLessons.length} lessons
              </span>
              {course.duration && (
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {course.duration}
                </span>
              )}
            </div>

            {/* Progress (only if enrolled) */}
            {isEnrolled && (
              <div className="mt-6 sm:mt-8 border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-[#0B1F3A]">Your progress</span>
                  <span className="font-bold text-[#0F2D52]">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0F66B7] rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Modules & Lessons */}
            <div className="mt-10">
              {modulesList.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                  <p className="text-gray-400">No modules yet.</p>
                  <p className="text-gray-300 text-sm mt-1">Content is being prepared. Check back soon!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {modulesList.map((mod, modIdx) => (
                    <div key={mod.id}>
                      <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-3 sm:mb-4">
                        Module {modIdx + 1}: {mod.title}
                      </h2>

                      {mod.lessons?.length === 0 ? (
                        <p className="text-sm text-gray-400 ml-2">No lessons in this module yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {mod.lessons.map((lesson, lessonIdx) => (
                            <div
                              key={lesson.id}
                              onClick={() =>
                                isEnrolled
                                  ? navigate(`/student/courses/${courseId}/lessons/${lesson.id}`)
                                  : null
                              }className={`bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 transition ${
                                isEnrolled
                                  ? "hover:shadow-md cursor-pointer"
                                  : "opacity-60 cursor-not-allowed"
                              }`}
                            >
                              <div>
                                <p className="text-sm text-gray-400">
                                  Lesson {lessonIdx + 1}
                                </p>
                                <h3 className="text-base sm:text-lg font-semibold text-[#0B1F3A] leading-snug">
                                  {lesson.title}
                                </h3>
                                {lesson.duration && (
                                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                    <Clock size={10} /> {lesson.duration}
                                  </p>
                                )}
                              </div>
                              <div className="shrink-0">
                                {isEnrolled ? (
                                  lesson.completed ? (
                                    <CheckCircle size={24} className="text-green-500" />
                                  ) : (
                                    <PlayCircle size={24} className="text-[#0F66B7]" />
                                  )
                                ) : (
                                  <Lock size={20} className="text-gray-300" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Card */}
          <div className="border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 h-fit shadow-sm bg-white lg:sticky lg:top-6 order-first lg:order-last">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F66B7]">
              ₦{(course.price || 0).toLocaleString()}
            </h2>

            {isEnrolled ? (
              <>
                <div className="bg-green-100 text-green-600 rounded-2xl px-4 py-3 mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  <CheckCircle size={18} />
                  Enrolled
                </div>

                {hasContent ? (
                  <button
                    onClick={() =>
                      firstLesson
                        ? navigate(`/student/courses/${courseId}/lessons/${firstLesson.id}`)
                        : null
                    }
                   className="w-full mt-5 sm:mt-6 bg-[#0F66B7] text-white py-3.5 sm:py-4 rounded-2xl font-semibold flex justify-center items-center gap-2 hover:bg-[#0d5aa3] transition"
                   >
                    {progress > 0 ? "Continue Learning" : "Start Learning"}
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <div className="mt-6 bg-amber-50 text-amber-600 rounded-2xl px-4 py-3 text-sm text-center">
                    Content coming soon
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate("/student/courses")}
                className="w-full mt-5 sm:mt-6 bg-[#0F2D52] text-white py-3.5 sm:py-4 rounded-2xl font-semibold hover:bg-[#1E4A7A] transition"
              >
                Enroll to Access
              </button>
            )}

            <p className="text-gray-500 mt-4 text-sm text-center lg:text-left">
              {allLessons.length} lesson{allLessons.length !== 1 ? "s" : ""} · lifetime access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
