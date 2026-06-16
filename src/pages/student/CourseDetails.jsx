import {
  PlayCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseDetails() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Left */}
        <div>
          <h1 className="text-5xl font-bold text-slate-900">
            Social Media Management Masterclass
          </h1>

          <p className="text-gray-500 mt-2">
            by KTA Faculty
          </p>

          <p className="mt-8 text-xl text-gray-600 leading-relaxed">
            Master content strategy, audience growth,
            engagement techniques, and social media
            performance tracking.
          </p>

          {/* Progress */}
          <div className="mt-10 border rounded-3xl p-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">
                Your progress
              </span>

              <span>0%</span>
            </div>

            <div className="h-3 bg-slate-200 rounded-full">
              <div className="h-3 w-0 bg-[#0F66B7] rounded-full" />
            </div>
          </div>

          {/* Module 1 */}
          <h2 className="text-3xl font-bold mt-14 mb-6">
            Module 1: Foundations of Social Media Strategy
          </h2>

          <div className="space-y-4">
            {/* Lesson 1 */}
            <div
              onClick={() => navigate("/lesson/1")}
              className="border rounded-3xl p-6 flex items-center justify-between hover:shadow-md cursor-pointer transition"
            >
              <div>
                <p className="text-sm text-gray-400">
                  Lesson 1
                </p>

                <h3 className="text-xl font-semibold">
                  Creating A Winning Social Media Strategy
                </h3>
              </div>

              <PlayCircle className="text-[#0F66B7]" />
            </div>

            {/* Lesson 2 */}
            <div
              onClick={() => navigate("/lesson/2")}
              className="border rounded-3xl p-6 flex items-center justify-between hover:shadow-md cursor-pointer transition"
            >
              <div>
                <p className="text-sm text-gray-400">
                  Lesson 2
                </p>

                <h3 className="text-xl font-semibold">
                  Setting Goals & Defining Your Audience
                </h3>
              </div>

              <PlayCircle className="text-[#0F66B7]" />
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="border rounded-3xl p-6 h-fit shadow-sm">
          <h2 className="text-6xl font-bold text-[#0F66B7]">
            ₦25,000
          </h2>

          <div className="bg-green-100 text-green-600 rounded-2xl px-4 py-3 mt-6 inline-flex items-center gap-2">
            <CheckCircle size={18} />
            Enrolled
          </div>

          <button
            onClick={() => navigate("/lesson/1")}
            className="w-full mt-8 bg-[#0F66B7] text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-2 hover:bg-[#0d5aa3] transition"
          >
            Start Learning
            <ArrowRight size={20} />
          </button>

          <p className="text-gray-500 mt-4">
            6 lessons · lifetime access
          </p>
        </div>
      </div>
    </div>
  );
}