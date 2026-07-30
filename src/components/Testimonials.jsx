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
    <section className="bg-white py-16 md:py-24 px-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif font-bold leading-tight text-[#134F73]">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              Stories of Transformation
            </span>
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-500 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            Hear from leaders who have walked the path and unleashed their full
            potential.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl md:rounded-4xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Stars */}
              <div className="mb-6 flex gap-1 md:mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[#F47A20] text-[#F47A20] md:h-4.5 md:w-4.5"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="min-h-auto md:min-h-55 font-serif text-xl italic leading-8 text-[#134F73] sm:text-2xl sm:leading-9 md:text-3xl md:leading-10">
                "{item.quote}"
              </p>

              {/* User */}
              <div className="mt-8 flex items-center gap-3 md:mt-10 md:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#134F73] text-lg font-bold text-white md:h-14 md:w-14 md:text-xl">
                  {item.initial}
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-[#134F73] md:text-2xl">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500 md:text-base">
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