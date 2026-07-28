import { ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const programs = [
  {
    mode: "In-Person & Online",
    duration: "3 Days",
    title: "Life Essence",
    description:
      "A deep journey into self-discovery, purpose alignment and emotional mastery.",
  },
  {
    mode: "Online",
    duration: "6 Weeks",
    title: "Mind Mastery",
    description:
      "Master your mindset, overcome limiting beliefs and unlock peak performance.",
  },
  {
    mode: "Hybrid",
    duration: "8 Weeks",
    title: "Ignite Business",
    description:
      "Transform your entrepreneurial vision into a thriving business reality.",
  },
];

const LearningJourney = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div className="max-w-2xl">
            <h2 className="font-serif text-[#134F73] text-5xl lg:text-7xl font-bold leading-tight">
              Transformational
              <br />
              Programs
            </h2>

            <p className="mt-6 text-xl text-gray-500 leading-9">
              Curated journeys designed to elevate every dimension of your
              life and leadership.
            </p>
          </div>

          <button
            onClick={() => navigate("/programs")}
            className="border border-gray-300 rounded-full px-8 py-4 font-semibold text-[#134F73] flex items-center gap-3 hover:bg-gray-50 transition"
          >
            View All Programs
            <ArrowRight size={18} />
          </button>

        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {programs.map((program, index) => (
            <div
              key={index}
              className="rounded-4xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition"
            >

              {/* Image Placeholder */}
              <div className="h-64 bg-[#EEF5F2] flex items-center justify-center">
                <BookOpen
                  size={60}
                  className="text-[#C6D6D9]"
                  strokeWidth={1.5}
                />
              </div>

              {/* Content */}
              <div className="p-8">

                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <BookOpen size={15} />
                  <span>{program.mode}</span>
                  <span>•</span>
                  <span>{program.duration}</span>
                </div>

                <h3 className="mt-6 font-serif text-4xl text-[#134F73] font-bold leading-tight">
                  {program.title}
                </h3>

                <p className="mt-6 text-lg text-gray-500 leading-8">
                  {program.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default LearningJourney;