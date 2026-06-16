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
    <div className="max-w-6xl mx-auto px-6 py-10 bg-background min-h-screen">

      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-foreground">
          Welcome back, jasmine.
        </h1>

        <p className="text-muted-foreground mt-2 text-lg">
          Continue your learning journey.
        </p>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-foreground mb-6">
        My Courses
      </h2>

      {studentCourses.length === 0 ? (
        <div className="bg-card rounded-3xl border border-border p-10 text-center">
          <p className="text-muted-foreground">
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

                      <span className="text-xl text-muted-foreground">
                        ₦{course.price.toLocaleString()}
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
                      onClick={() =>
                        navigate(`/student/course/${course.id}`)
                      }
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
                    <span>{course.progress}%</span>
                  </div>

                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
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

          <div className="bg-card rounded-3xl shadow-xl w-full max-w-md p-7 relative border border-border">

            {/* Close */}
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>

            <h2 className="text-4xl font-bold text-foreground mb-8">
              Payment
            </h2>

            {/* Course Info */}
            <div className="border border-border rounded-3xl p-5 mb-5">

              <div className="flex justify-between pb-5 border-b border-border">
                <span className="text-muted-foreground">Course</span>

                <span className="font-medium text-foreground text-right">
                  {selectedCourse?.title}
                </span>
              </div>

              <div className="flex justify-between pt-5">
                <span className="text-muted-foreground">Amount</span>

                <span className="text-4xl font-bold text-primary">
                  ₦{selectedCourse?.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-muted rounded-2xl p-4 flex gap-3 mb-6">
              <ShieldCheck
                size={18}
                className="text-success mt-1 shrink-0"
              />

              <p className="text-sm text-muted-foreground">
                Simulated checkout for testing. No real payment is taken.
              </p>
            </div>

            {/* Payment Button */}
            <button
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold hover:bg-[#0a376a] transition"
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

      {/* Success Toast */}
      {paymentSuccess && (
        <div className="fixed top-6 right-6 bg-success text-success-foreground px-6 py-4 rounded-2xl shadow-xl z-50">
          Payment Successful!
        </div>
      )}
    </div>
  );
}