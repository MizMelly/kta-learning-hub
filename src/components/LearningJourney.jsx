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
    <section className="bg-white py-16 md:py-24 px-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif font-bold leading-tight text-[#134F73]">
              <span className="block text-4xl sm:text-5xl lg:text-7xl">
                Transformational
              </span>

              <span className="block text-4xl sm:text-5xl lg:text-7xl">
                Programs
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-gray-500 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              Curated journeys designed to elevate every dimension of your
              life and leadership.
            </p>
          </div>

          <button
            onClick={() => navigate("/programs")}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-4 text-base font-semibold text-[#134F73] transition hover:bg-gray-50 sm:w-auto sm:px-8 sm:text-lg"
          >
            View All Programs
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3 lg:gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl md:rounded-4xl border border-gray-200 bg-white shadow-sm transition hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="flex h-52 items-center justify-center bg-[#EEF5F2] md:h-64">
                <BookOpen
                  size={50}
                  className="text-[#C6D6D9] md:h-15 md:w-15"
                  strokeWidth={1.5}
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
                  <BookOpen size={14} />
                  <span>{program.mode}</span>
                  <span>•</span>
                  <span>{program.duration}</span>
                </div>

                <h3 className="mt-4 md:mt-6 font-serif text-3xl font-bold leading-tight text-[#134F73] md:text-4xl">
                  {program.title}
                </h3>

                <p className="mt-4 md:mt-6 text-base leading-7 text-gray-500 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
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