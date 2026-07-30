import { ArrowRight } from "lucide-react";

export default function FeaturedResource() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-3xl lg:rounded-[32px] border border-gray-200 bg-white shadow-md">

          <div className="grid lg:grid-cols-[52%_48%]">

            {/* LEFT IMAGE */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto">

              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200"
                alt="Featured Resource"
                className="h-full w-full object-cover"
              />

              {/* Brand Overlay */}
              <div className="absolute inset-0 bg-[#124A66]/20" />

            </div>

            {/* RIGHT CONTENT */}
            <div className="flex items-center">

              <div className="w-full p-6 sm:p-8 lg:p-12 xl:p-16">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E46F21] sm:text-sm">
                  Featured Essay
                </p>

                <h2 className="mt-4 font-serif text-3xl leading-tight text-[#124A66] sm:text-4xl lg:text-5xl xl:text-[50px]">
                  The Architecture of a Resilient Mind
                </h2>

                <p className="mt-5 text-base leading-7 text-gray-500 sm:text-lg sm:leading-8 lg:mt-6 lg:leading-9">
                  How top performers build mental structures that
                  withstand pressure without breaking. An exploration
                  of cognitive reframing and emotional agility.
                </p>

                <button className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#124A66] transition-all duration-300 hover:text-[#E46F21] sm:mt-10 sm:gap-3 sm:text-lg">
                  Read Essay

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}