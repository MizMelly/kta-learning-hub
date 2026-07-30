import {
  Target,
  BadgeCheck,
  Compass,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Evidence-Based Learning",
    description:
      "Curriculums grounded in neuroscience, psychology, and real-world high-performance data.",
  },
  {
    icon: BadgeCheck,
    title: "World-Class Facilitators",
    description:
      "Learn from industry masters, clinical psychologists, and seasoned executives.",
  },
  {
    icon: Compass,
    title: "Lifelong Ecosystem",
    description:
      "Beyond a course, a private network of driven individuals holding you to your highest standard.",
  },
];

const WhyPlatform = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif font-bold leading-tight text-[#134F73]">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              The Architecture of Growth
            </span>
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-500 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            We don't just share information—we facilitate profound shifts in
            identity, capability, and performance.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-3xl md:rounded-[30px] border border-gray-200 bg-white p-6 md:p-10 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 md:h-16 md:w-16">
                  <Icon
                    size={22}
                    className="text-[#F47A20] md:h-7 md:w-7"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 md:mt-10 font-serif text-3xl font-bold leading-tight text-[#134F73] md:text-4xl">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-4 md:mt-8 text-base leading-7 text-gray-500 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
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

export default WhyPlatform;