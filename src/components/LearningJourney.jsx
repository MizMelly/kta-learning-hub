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
    <section className="bg-[#dae5ed] py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091b33] mb-12 lg:mb-20">
          Learning Journey
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md duration-300 flex flex-col text-center h-full"
              >
                {/* Step */}
                <span className="text-lg md:text-xl font-semibold text-[#5B3A10]">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="mt-5 w-16 h-16 rounded-2xl bg-[#0B67B1] flex items-center justify-center mx-auto">
                  <Icon className="text-white" size={28} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl lg:text-2xl font-semibold text-[#091b33] leading-tight min-h-17.5 flex items-center justify-center">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-500 grow">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;