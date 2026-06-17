import { Lock, ShieldCheck, X, Loader2 } from "lucide-react";
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
        setStudentCourses(coursesRes.data || coursesRes || []);
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
      await enrollments.pay({
        courseId: selectedCourse.id,
        amount: selectedCourse.price,
      });
      setShowPayment(false);
      setPaymentSuccess(true);
      // Refresh courses to show updated status
      const updated = await enrollments.getMyCourses();
      setStudentCourses(updated.data || updated || []);
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
    <div className="max-w-6xl mx-auto px-6 py-10 bg-background min-h-screen">

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
          <p className="text-gray-500">You don't have any courses yet.</p>
          <button
            onClick={() => navigate("/student/courses")}
            className="mt-4 bg-[#0F66B7] text-white px-6 py-2.5 rounded-2xl font-semibold hover:bg-[#09539a] transition"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {studentCourses.map((course) => {
            const isLocked = !course.isPaid && !course.isEnrolled;
            const progress = course.progressPercentage || 0;

            return (
              <div
                key={course.id}
                className="bg-card rounded-3xl border border-border shadow-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-4">
                      {isLocked && (
                        <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-muted-foreground">
                          <Lock size={16} />
                          <span className="font-medium">Locked</span>
                        </div>
                      )}
                      <span className="text-xl text-gray-500">
                        ₦{(course.price || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  {isLocked ? (
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowPayment(true);
                      }}
                      className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-semibold hover:bg-[#0a376a] transition"
                    >
                      Unlock Course
                    </button>
                  ) : (
                    <button
  onClick={() => navigate(`/student/courses/${course.id}`)}
  className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-semibold hover:bg-[#0a376a] transition"
>
  Continue Learning
</button>
                  )}
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D5E3F1] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
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
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>

            <h2 className="text-4xl font-bold text-slate-900 mb-8">Payment</h2>

            <div className="border border-gray-200 rounded-3xl p-5 mb-5">
              <div className="flex justify-between pb-5 border-b">
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
        <div className="fixed top-6 right-6 bg-success text-success-foreground px-6 py-4 rounded-2xl shadow-xl z-50">
          Payment Successful!
        </div>
      )}
    </div>
  );
}