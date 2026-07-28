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
    <section className="bg-white py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center max-w-4xl mx-auto">

          <h2 className="font-serif text-[#134F73] font-bold text-5xl lg:text-6xl">
            The Architecture of Growth
          </h2>

          <p className="mt-6 text-xl text-gray-500 leading-9">
            We don't just share information we facilitate profound
            shifts in identity, capability, and performance.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-[30px] border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 p-10"
              >

                {/* Icon */}

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">

                  <Icon
                    size={28}
                    className="text-[#F47A20]"
                  />

                </div>

                {/* Title */}

                <h3 className="mt-10 text-[#134F73] font-serif font-bold text-4xl leading-tight">

                  {item.title}

                </h3>

                {/* Description */}

                <p className="mt-8 text-gray-500 text-xl leading-9">

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