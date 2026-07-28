import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The Life Essence program fundamentally shifted how I operate. I am no longer reacting to my business—I am leading it from a place of deep alignment.",
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    initial: "S",
  },
  {
    quote:
      "I joined Ignite Business expecting strategies, but experienced a complete mindset shift. One of the best investments I've made in myself.",
    name: "David Okafor",
    role: "Founder, Nexus Health",
    initial: "D",
  },
  {
    quote:
      "The coaching helped me overcome years of self-doubt. Today I confidently walk into opportunities I once believed were beyond me.",
    name: "Elena Rostova",
    role: "Creative Director",
    initial: "E",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">

          <h2 className="font-serif text-[#134F73] text-5xl lg:text-6xl font-bold">
            Stories of Transformation
          </h2>

          <p className="mt-6 text-xl text-gray-500">
            Hear from leaders who have walked the path and unleashed their full
            potential.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#F47A20] text-[#F47A20]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif italic text-[#134F73] text-2xl leading-10 min-h-55">
                "{item.quote}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-10">

                <div className="w-14 h-14 rounded-full bg-[#134F73] text-white flex items-center justify-center text-xl font-bold">
                  {item.initial}
                </div>

                <div>
                  <h4 className="text-2xl font-semibold text-[#134F73]">
                    {item.name}
                  </h4>

                  <p className="text-gray-500">
                    {item.role}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}