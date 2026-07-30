import { ArrowRight } from "lucide-react";

export default function FeaturedResource() {
  return (
<section className="py-14">
  <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-md">

          <div className="grid lg:grid-cols-[52%_48%]">

            {/* LEFT IMAGE */}

            <div className="relative h-65 sm:h-87.5 lg:h-auto">

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

              <div className="w-full p-8 sm:p-10 lg:p-12 xl:p-16">

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E46F21]">
                  Featured Essay
                </p>

                <h2 className="mt-5 font-serif text-3xl leading-tight text-[#124A66] md:text-2xl lg:text-[50px]">
                  The Architecture of a Resilient Mind
                </h2>

                <p className="mt-6 text-lg leading-9 text-gray-500">
                  How top performers build mental structures that
                  withstand pressure without breaking. An exploration
                  of cognitive reframing and emotional agility.
                </p>

                <button className="mt-10 inline-flex items-center gap-3 font-semibold text-[#124A66] transition hover:text-[#E46F21]">

                  Read Essay

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}