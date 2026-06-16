import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeaturedCourse() {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-16 bg-[#f4f7fa]">
      <div className="max-w-6xl mx-auto">

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-[#f8fafc] to-[#eef2f7] p-8 md:p-12 shadow-sm">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT SIDE */}
            <div>

              {/* Badge */}
              <p className="text-[#0f66b7] font-semibold text-sm uppercase tracking-wide mb-3">
                Featured Course
              </p>

              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-bold text-[#101828] leading-tight">
                Social Media Management Masterclass
              </h2>

              {/* Description */}
              <p className="mt-4 text-[#667085] text-base md:text-lg">
                Master content strategy, audience growth, engagement techniques,
                and social media performance tracking.
              </p>

              {/* Pills */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "6 Lessons",
                  "3 Modules",
                  "Certificate Ready",
                  "Community Access",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-[#344054]"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Price */}
              <p className="mt-6 text-3xl font-bold text-[#0f66b7]">
                ₦25,000
              </p>

              {/* Button */}
              <button
                onClick={() => navigate("/courses")}
                className="mt-6 bg-[#0f66b7] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#09539a] transition flex items-center gap-2"
              >
                View Course →
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-center">
              <div className="w-full max-w-md h-70 md:h-85 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center">
                <div className="text-center text-gray-400">
                  {/* placeholder icon */}
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mx-auto"
                  >
                    <path
                      d="M20 7L12 3L4 7V17L12 21L20 17V7Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <p className="mt-2 text-sm">Course Preview</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}