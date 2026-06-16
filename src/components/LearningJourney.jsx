import {
  UserPlus,
  BookOpen,
  Sparkles,
  Users,
} from "lucide-react";

const steps = [
  {
    step: "Step 1",
    icon: UserPlus,
    title: "Create Your Student Account",
    description:
      "Register and access your personalized learning dashboard.",
  },
  {
    step: "Step 2",
    icon: BookOpen,
    title: "Enroll In A Course",
    description:
      "Choose a course and unlock your learning experience.",
  },
  {
    step: "Step 3",
    icon: Sparkles,
    title: "Learn & Apply",
    description:
      "Watch lessons, complete assignments, and submit reflections.",
  },
  {
    step: "Step 4",
    icon: Users,
    title: "Engage & Grow",
    description:
      "Connect with other learners through discussions and shared insights.",
  },
];

const LearningJourney = () => {
  return (
    <section className="bg-[#F5F7FA] py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="bg-[#EAF2FB] text-[#0B4F97] px-4 py-2 rounded-full text-sm font-semibold">
            Simple Learning Process
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A376A]">
          Your Learning Journey
        </h2>

        <p className="text-center mt-5 max-w-3xl mx-auto text-lg text-[#6B7280]">
          Follow a structured path designed to help you learn,
          practice, engage, and achieve meaningful outcomes.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-center h-full"
              >
                {/* Step */}
                <span className="text-sm font-semibold uppercase tracking-wider text-[#E88B1A]">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="mt-5 w-16 h-16 rounded-2xl bg-[#EAF2FB] flex items-center justify-center mx-auto group-hover:bg-[#0B4F97] transition-colors duration-300">
                  <Icon
                    className="text-[#0B4F97] group-hover:text-white transition-colors duration-300"
                    size={28}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl lg:text-2xl font-semibold text-[#1F2937] leading-tight min-h-17.5 flex items-center justify-center">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-base lg:text-lg leading-relaxed text-[#6B7280] grow">
                  {item.description}
                </p>

                {/* Accent Line */}
                <div className="mt-6 mx-auto w-12 h-1 bg-[#E88B1A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;