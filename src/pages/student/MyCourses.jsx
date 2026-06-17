import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enrollments, courses } from "../../services/api";
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Layers,
  Clock,
  Loader2,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";

export default function MyCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("enrolled");

  // Payment modal state
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [enrolledRes, allRes] = await Promise.all([
        enrollments.getMyCourses(),
        courses.getAll(),
      ]);
      const enrolledData = enrolledRes.data || enrolledRes || [];
      const allData = allRes.data || allRes || [];
      setEnrolledCourses(Array.isArray(enrolledData) ? enrolledData : []);
      setAllCourses(Array.isArray(allData) ? allData : []);
    } catch (err) {
      setError(err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isEnrolled = (courseId) =>
    enrolledCourses.some((c) => c.id === courseId || c.courseId === courseId);

  const handleEnroll = async (course) => {
    if (course.price > 0) {
      // Paid course — show payment modal
      setSelectedCourse(course);
      setShowPayment(true);
      return;
    }
    // Free course — enroll directly
    try {
      setEnrollLoading(course.id);
      await enrollments.enroll({ courseId: course.id });
      await fetchData();
      setActiveTab("enrolled");
    } catch (err) {
      alert("Enrollment failed: " + (err.message || "Unknown error"));
    } finally {
      setEnrollLoading(null);
    }
  };

  const handlePayment = async () => {
    if (!selectedCourse) return;
    try {
      setPaymentLoading(true);
      // Step 1: Enroll first (creates enrollment record)
      const enrollRes = await enrollments.enroll({ courseId: selectedCourse.id });
      // Step 2: Extract enrollmentId from response
      const enrollmentId = enrollRes.data?.id || enrollRes.id || enrollRes.data?.enrollmentId || enrollRes.enrollmentId;
      if (!enrollmentId) {
        throw new Error("Enrollment succeeded but no enrollment ID returned");
      }
      // Step 3: Pay using enrollmentId (not courseId)
      await enrollments.pay({
        enrollmentId: enrollmentId,
        paymentMethod: "Mock",
        paymentReference: "mock-ref-" + Date.now(),
        transactionId: "mock-txn-" + Date.now(),
      });
      setShowPayment(false);
      await fetchData();
      setActiveTab("enrolled");
    } catch (err) {
      alert("Payment failed: " + (err.message || "Unknown error"));
    } finally {
      setPaymentLoading(false);
    }
  };

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

  const displayedCourses = activeTab === "enrolled" ? enrolledCourses : allCourses;

  return (
    <div className="min-h-screen bg-slate-50 p-5 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">My Courses</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
          </p>
        </div>

        <div className="flex bg-white rounded-xl border border-slate-200 p-1">
          <button
            onClick={() => setActiveTab("enrolled")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "enrolled"
                ? "bg-[#0F2D52] text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Enrolled
          </button>
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "browse"
                ? "bg-[#0F2D52] text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Browse All
          </button>
        </div>
      </div>

      {displayedCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <BookOpen size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">
            {activeTab === "enrolled"
              ? "You haven't enrolled in any courses yet."
              : "No courses available right now."}
          </p>
          {activeTab === "enrolled" && (
            <button
              onClick={() => setActiveTab("browse")}
              className="text-[#0F2D52] font-medium text-sm hover:underline mt-2"
            >
              Browse courses →
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedCourses.map((course) => {
            const courseId = course.id || course.courseId;
            const enrolled = isEnrolled(courseId);
            const progress = course.progressPercentage || course.progress || 0;
            const moduleCount = course.modules?.length || course.moduleCount || 0;
            const lessonCount =
              course.lessons?.length ||
              course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) ||
              course.lessonCount ||
              0;
            const completedCount = course.completedLessons || 0;
            const hasContent = moduleCount > 0 || lessonCount > 0;

            return (
              <div
                key={courseId}
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
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                      <div>
                        <h2 className="text-base font-bold text-[#0B1F3A] leading-snug">
                          {course.title}
                        </h2>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {course.instructor || "KTA Learning Hub"}
                        </p>
                      </div>
                      <span
                        className={`self-start px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                          progress === 100
                            ? "bg-green-50 text-green-600"
                            : enrolled
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {progress === 100
                          ? "Completed"
                          : enrolled
                          ? "In Progress"
                          : "Not Enrolled"}
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
                      {enrolled && hasContent && (
                        <>
                          <span className="text-gray-300">·</span>
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle2 size={13} />
                            {completedCount} completed
                          </div>
                        </>
                      )}
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

                    {enrolled && hasContent && (
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-medium text-gray-500">Progress</span>
                          <span className="text-xs font-bold text-[#0F2D52]">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#E79B23] to-amber-400 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {!enrolled && course.price !== undefined && (
                      <div className="mb-4">
                        <span className="text-lg font-bold text-[#0F2D52]">
                          ₦{(course.price || 0).toLocaleString()}
                        </span>
                      </div>
                    )}

                    {enrolled && hasContent && course.modules && (
                      <div className="space-y-3 mb-5">
                        {course.modules.map((mod) => (
                          <div key={mod.id}>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                              {mod.title}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {mod.lessons?.map((lesson) => (
                                <button
                                  key={lesson.id}
                                  onClick={() =>
                                    navigate(
                                      `/student/courses/${courseId}/lessons/${lesson.id}`
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
                    )}

                    {enrolled ? (
                      <button
                        onClick={() => navigate(`/student/courses/${courseId}`)}
                        className="bg-[#0F2D52] text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors shadow-sm flex items-center gap-2"
                      >
                        {progress === 100 ? (
                          <>Review Course <span>→</span></>
                        ) : (
                          <>Continue Learning <span>→</span></>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course)}
                        disabled={enrollLoading === course.id}
                        className="bg-[#0F2D52] text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
                      >
                        {enrollLoading === course.id ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Enrolling...
                          </>
                        ) : (
                          <>
                            <Lock size={14} />
                            Enroll Now
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
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
    </div>
  );
}
