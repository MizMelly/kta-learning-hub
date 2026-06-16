import {
  Video,
  FileText,
  Headphones,
  ClipboardList,
  Pencil,
  MessageSquare,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Video Learning",
  },
  {
    icon: FileText,
    title: "Written Learning Notes",
  },
  {
    icon: Headphones,
    title: "Audio Learning Companion",
  },
  {
    icon: ClipboardList,
    title: "Assignments",
  },
  {
    icon: Pencil,
    title: "Personal Reflection",
  },
  {
    icon: MessageSquare,
    title: "Community Discussion",
  },
  {
    icon: Star,
    title: "Lesson Feedback & Ratings",
  },
];

const WhyPlatform = () => {
  return (
    <section className="bg-[#0A376A] py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <div className="inline-block mb-4">
            
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Why This Platform?
          </h2>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Traditional learning platforms stop at delivering content.
            KonfirmTech Learning Hub is designed to help learners engage,
            reflect, apply, and transform. Every lesson includes:
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-12 lg:mt-16">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center gap-4 border border-transparent hover:border-[#E88B1A]"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#EAF2FB] flex items-center justify-center shrink-0 group-hover:bg-[#E88B1A] transition-colors duration-300">
                  <Icon
                    className="text-[#0B4F97] group-hover:text-white transition-colors duration-300"
                    size={24}
                  />
                </div>

                {/* Text */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#1F2937] leading-snug">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Bottom Accent */}
        <div className="flex justify-center mt-16">
          <div className="w-24 h-1 bg-[#E88B1A] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyPlatform;