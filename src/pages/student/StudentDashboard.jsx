import { Lock, ShieldCheck, X, Loader2, BookOpen, Layers, PlayCircle, CheckCircle2, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, enrollments } from "../../services/api";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [studentCourses, setStudentCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPayment, setShowPayment] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch user profile and enrolled courses on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, coursesRes] = await Promise.all([
          auth.getProfile(),
          enrollments.getMyCourses(),
        ]);
        setUser(profileRes.data || profileRes);
        const coursesData = coursesRes.data || coursesRes || [];
        setStudentCourses(Array.isArray(coursesData) ? coursesData : []);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePayment = async () => {
    if (!selectedCourse) return;
    try {
      setPaymentLoading(true);
      // Mock payment
      await enrollments.pay({
        courseId: selectedCourse.id,
        amount: selectedCourse.price,
      });
      // Then enroll
      await enrollments.enroll({ courseId: selectedCourse.id });
      setShowPayment(false);
      setPaymentSuccess(true);
      const updated = await enrollments.getMyCourses();
      const updatedData = updated.data || updated || [];
      setStudentCourses(Array.isArray(updatedData) ? updatedData : []);
      setTimeout(() => setPaymentSuccess(false), 3000);
    } catch (err) {
      alert("Payment failed: " + (err.message || "Unknown error"));
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 flex justify-center">
        <Loader2 className="animate-spin text-[#0F66B7]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#0F66B7] text-white px-6 py-2 rounded-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen">

      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-slate-900">
          Welcome back, {user?.fullName?.split(" ")[0] || "Student"}.
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Continue your learning journey.
        </p>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-slate-900 mb-6">My Courses</h2>

      {studentCourses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">You don't have any courses yet.</p>
          <p className="text-gray-400 text-sm mt-1">Browse available courses and enroll to get started.</p>
          <button
            onClick={() => navigate("/student/courses")}
            className="mt-5 bg-[#0F66B7] text-white px-6 py-2.5 rounded-2xl font-semibold hover:bg-[#09539a] transition"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {studentCourses.map((course) => {
            const progress = course.progressPercentage || 0;
            const moduleCount = course.modules?.length || course.moduleCount || 0;
            const lessonCount = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || course.lessonCount || 0;
            const completedCount = course.completedLessons || 0;
            const hasContent = moduleCount > 0 || lessonCount > 0;

            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {course.instructor || "KTA Learning Hub"}
                    </p>

                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Layers size={13} />
                        {moduleCount} modules
                      </div>
                      <span className="text-gray-300">·</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <PlayCircle size={13} />
                        {lessonCount} lessons
                      </div>
                      <span className="text-gray-300">·</span>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 size={13} />
                        {completedCount} completed
                      </div>
                      <span className="text-gray-300">·</span>
                      <span className="text-xl text-gray-500">
                        ₦{(course.price || 0).toLocaleString()}
                      </span>
                      {!hasContent && (
                        <span className="ml-2 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-xs font-medium">
                          Content coming soon
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/student/courses/${course.id}`)}
                    className="bg-[#0F66B7] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#09539a] transition flex-shrink-0"
                  >
                    {hasContent ? "Continue Learning" : "View Course"}
                  </button>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0F66B7] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Quick lesson buttons — only if content exists */}
                {hasContent && course.modules && (
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Jump to a lesson
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {course.modules.flatMap((mod) =>
                        mod.lessons?.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() =>
                              navigate(`/student/courses/${course.id}/lessons/${lesson.id}`)
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              lesson.completed
                                ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                : "bg-white text-gray-600 border-gray-200 hover:border-[#0F66B7] hover:text-[#0F66B7]"
                            }`}
                          >
                            {lesson.title}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-7 relative">
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-4xl font-bold text-slate-900 mb-8">Payment</h2>

            <div className="border border-gray-200 rounded-3xl p-5 mb-5">
              <div className="flex justify-between pb-5 border-b border-gray-100">
                <span className="text-gray-500">Course</span>
                <span className="font-medium text-slate-900 text-right">
                  {selectedCourse?.title}
                </span>
              </div>
              <div className="flex justify-between pt-5">
                <span className="text-gray-500">Amount</span>
                <span className="text-5xl font-bold text-[#0F66B7]">
                  ₦{(selectedCourse?.price || 0).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl p-4 flex gap-3 mb-6">
              <ShieldCheck size={18} className="text-green-600 mt-1 shrink-0" />
              <p className="text-sm text-gray-500">
                Simulated checkout for testing. No real payment is taken.
              </p>
            </div>

            <button
              className="w-full bg-[#0F66B7] text-white py-4 rounded-2xl font-semibold hover:bg-[#09539a] transition disabled:opacity-50"
              onClick={handlePayment}
              disabled={paymentLoading}
            >
              {paymentLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </span>
              ) : (
                "Complete Payment"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {paymentSuccess && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl z-50 flex items-center gap-2">
          <CheckCircle2 size={18} />
          Payment Successful!
        </div>
      )}
    </div>
  );
}
