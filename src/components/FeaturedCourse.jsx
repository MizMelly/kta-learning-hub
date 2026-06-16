import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeaturedCourse() {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-16 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12">
          

          <h2 className="mt-5 text-3xl md:text-5xl font-bold text-[#0A376A]">
            Start Your Learning Journey
          </h2>
        </div>

        {/* Course Card */}
        <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-300">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT SIDE */}
            <div>
              <p className="text-[#E88B1A] font-semibold text-sm uppercase tracking-wider mb-3">
                Featured Course
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#0A376A] leading-tight">
                Social Media Management Masterclass
              </h2>

              <p className="mt-5 text-[#6B7280] text-lg leading-relaxed">
                Master content strategy, audience growth, engagement
                techniques, and social media performance tracking while
                building practical skills that drive real business results.
              </p>

              {/* Course Features */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "6 Lessons",
                  "3 Modules",
                  "Certificate Ready",
                  "Community Access",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2 rounded-full text-sm font-medium text-[#374151]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#E88B1A]" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mt-8">
                <p className="text-sm text-[#6B7280]">
                  Course Investment
                </p>

                <p className="text-4xl font-bold text-[#0B4F97]">
                  ₦25,000
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate("/courses")}
                className="mt-8 bg-[#0B4F97] hover:bg-[#0A376A] text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Course
                <ArrowRight size={20} />
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-center">
              <div className="w-full max-w-md h-80 bg-linear-to-br from-[#EAF2FB] to-white border border-[#DCE6F2] rounded-3xl shadow-sm flex items-center justify-center">

                <div className="text-center">
                  <div className="w-20 h-20 bg-[#0B4F97] rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 7L12 3L4 7V17L12 21L20 17V7Z"
                        stroke="white"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-[#0A376A]">
                    Course Preview
                  </h3>

                  <p className="mt-2 text-[#6B7280]">
                    Learn social media strategy,
                    content planning and audience growth.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}