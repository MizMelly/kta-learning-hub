import { Lock, ShieldCheck, X, Loader2, BookOpen, Layers, PlayCircle, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, enrollments, courses } from "../../services/api";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const FLW_PUBLIC_KEY = "FLWPUBK_TEST-51090b4aa0ebefc8f37b147d7176fa8a-X";

// ─── Progress Helpers ────────────────────────────────────────────────────────
function getCourseProgress(courseId) {
  try {
    const progress = JSON.parse(localStorage.getItem("kta_progress") || "{}");
    return progress[courseId] || { completedLessons: [], percentage: 0 };
  } catch {
    return { completedLessons: [], percentage: 0 };
  }
}

function markLessonComplete(courseId, lessonId) {
  try {
    const progress = JSON.parse(localStorage.getItem("kta_progress") || "{}");
    if (!progress[courseId]) {
      progress[courseId] = { completedLessons: [], percentage: 0 };
    }
    if (!progress[courseId].completedLessons.includes(lessonId)) {
      progress[courseId].completedLessons.push(lessonId);
    }
    localStorage.setItem("kta_progress", JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to save progress:", err);
  }
}

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch user profile, all courses, and enrolled courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileData, allData, enrolledData] = await Promise.all([
          auth.getProfile(),
          courses.getAll(),
          enrollments.getMyCourses(),
        ]);
        setUser(profileData);
        const allCoursesArray = Array.isArray(allData) ? allData : [];
        const enrolledCoursesArray = Array.isArray(enrolledData) ? enrolledData : [];
        setAllCourses(allCoursesArray);
        setEnrolledCourses(enrolledCoursesArray);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isEnrolled = (courseId) =>
    enrolledCourses.some((c) => (c.courseId || c.id) === courseId);

  const getEnrollment = (courseId) =>
    enrolledCourses.find((c) => (c.courseId || c.id) === courseId);

  const handleFlutterwavePayment = (course) => {
    setSelectedCourse(course);
    setPaymentLoading(true);

    const config = {
      public_key: FLW_PUBLIC_KEY,
      tx_ref: "kta-" + Date.now(),
      amount: course.price || 0,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd,banktransfer",
      customer: {
        email: user?.email || user?.Email || "student@kta.com",
        phone_number: user?.phoneNumber || "",
        name: user?.fullName || user?.FullName || "Student",
      },
      customizations: {
        title: course.title,
        description: "Course enrollment payment",
        logo: "https://kta-learning-hub-2936.vercel.app/logo.png",
      },
    };

    const handlePayment = useFlutterwave(config);

    handlePayment({
      callback: async (response) => {
        console.log("Flutterwave full response:", response);
        closePaymentModal();

        // Check multiple possible success statuses
        const isSuccess = 
          response.status === "successful" || 
          response.status === "completed" || 
          response.status === "success" ||
          response.success === true ||
          response.data?.status === "successful";

        if (isSuccess) {
          try {
            // Step 1: Enroll
            const enrollRes = await enrollments.enroll({ courseId: course.id });
            const enrollmentId = enrollRes.data?.id || enrollRes.id || enrollRes.data?.enrollmentId || enrollRes.enrollmentId;

            if (enrollmentId) {
              // Step 2: Record payment
              await enrollments.pay({
                enrollmentId: enrollmentId,
                paymentMethod: "Flutterwave",
                paymentReference: response.tx_ref || response.data?.tx_ref,
                transactionId: response.transaction_id?.toString() || response.data?.id?.toString() || response.tx_ref,
              });
            }

            setPaymentSuccess(true);
            // Refresh data
            const [allData, enrolledData] = await Promise.all([
              courses.getAll(),
              enrollments.getMyCourses(),
            ]);
            setAllCourses(Array.isArray(allData) ? allData : []);
            setEnrolledCourses(Array.isArray(enrolledData) ? enrolledData : []);
            setTimeout(() => setPaymentSuccess(false), 4000);
          } catch (err) {
            alert("Payment recorded but enrollment failed: " + err.message);
          }
        } else {
          console.log("Payment status:", response.status);
          console.log("Payment not successful, response:", response);
          alert("Payment was not successful. Status: " + (response.status || "unknown"));
        }
        setPaymentLoading(false);
      },
      onClose: () => {
        setPaymentLoading(false);
        console.log("Payment modal closed");
      },
    });
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

      {allCourses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No courses available yet.</p>
          <p className="text-gray-400 text-sm mt-1">Check back soon for new courses.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {allCourses.map((course) => {
            const courseId = course.id;
            const enrolled = isEnrolled(courseId);
            const enrollment = getEnrollment(courseId);
            const localProgress = getCourseProgress(courseId);
            const moduleCount = course.modules?.length || course.moduleCount || 0;
            const lessonCount = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || course.lessonCount || 0;
            const completedCount = localProgress.completedLessons.length || enrollment?.completedLessons || 0;
            const progress = lessonCount > 0 ? Math.round((completedCount / lessonCount) * 100) : 0;
            const hasContent = moduleCount > 0 || lessonCount > 0;

            return (
              <div
                key={courseId}
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
                      {!enrolled && (
                        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-gray-500">
                          <Lock size={16} />
                          <span className="font-medium">Locked</span>
                        </div>
                      )}
                      {enrolled && (
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-600">
                          <CheckCircle2 size={16} />
                          <span className="font-medium">Active</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Layers size={13} />
                        {moduleCount} modules
                      </div>
                      <span className="text-gray-300">·</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <PlayCircle size={13} />
                        {lessonCount} lessons
                      </div>
                      {enrolled && (
                        <>
                          <span className="text-gray-300">·</span>
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle2 size={13} />
                            {completedCount} completed
                          </div>
                        </>
                      )}
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

                  {!enrolled ? (
                    <button
                      onClick={() => handleFlutterwavePayment(course)}
                      disabled={paymentLoading}
                      className="bg-[#0F66B7] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#09539a] transition flex-shrink-0 flex items-center gap-2 disabled:opacity-50"
                    >
                      <Lock size={18} />
                      {paymentLoading ? "Processing..." : "Unlock Course"}
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/student/courses/${courseId}`)}
                      className="bg-[#0F66B7] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#09539a] transition flex-shrink-0 flex items-center gap-2"
                    >
                      {progress > 0 ? "Continue Learning" : "Start Learning"}
                      <ArrowRight size={18} />
                    </button>
                  )}
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
              </div>
            );
          })}
        </div>
      )}

      {/* Success Toast */}
      {paymentSuccess && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl z-50 flex items-center gap-2">
          <CheckCircle2 size={18} />
          Payment Successful! Course unlocked.
        </div>
      )}
    </div>
  );
}
