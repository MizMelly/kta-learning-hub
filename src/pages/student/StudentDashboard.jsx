import { Lock, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
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

  const [showPayment, setShowPayment] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

      {/* Title */}
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        My Courses
      </h2>

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
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowPayment(true);
                      }}
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

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-7 relative">
            {/* Close */}
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-4xl font-bold text-slate-900 mb-8">
              Payment
            </h2>

            {/* Course Info */}
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
                  ₦{selectedCourse?.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-slate-100 rounded-2xl p-4 flex gap-3 mb-6">
              <ShieldCheck
                size={18}
                className="text-green-600 mt-1 shrink-0"
              />

              <p className="text-sm text-gray-500">
                Simulated checkout for testing. No real payment is taken.
              </p>
            </div>

            {/* Payment Button */}
            <button
              className="w-full bg-[#0F66B7] text-white py-4 rounded-2xl font-semibold hover:bg-[#09539a] transition"
              onClick={() => {
                setShowPayment(false);
                setPaymentSuccess(true);

                setTimeout(() => {
                  setPaymentSuccess(false);
                }, 3000);
              }}
            >
              Complete Payment
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {paymentSuccess && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl z-50">
          ✅ Payment Successful!
        </div>
      )}
    </div>
  );
}