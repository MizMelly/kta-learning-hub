import {
  Clock3,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function EventCard({
  month,
  day,
  badge,
  title,
  description,
  time,
  location,
}) {
  return (
    <div className="rounded-3xl lg:rounded-4xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-16 w-16 sm:h-18 sm:w-18 flex-col items-center justify-center rounded-2xl bg-[#F6F7F4] shrink-0">
          <span className="text-xs sm:text-sm font-bold uppercase text-[#124A66]">
            {month}
          </span>

          <span className="mt-1 text-3xl sm:text-4xl font-serif text-[#124A66] leading-none">
            {day}
          </span>
        </div>

        {badge && (
          <span className="rounded-full bg-[#EEF4FF] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-blue-600">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="mt-5 sm:mt-6 lg:mt-8 font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight text-[#124A66]">
        {title}
      </h3>

      <p className="mt-3 sm:mt-4 lg:mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500">
        {description}
      </p>

      <div className="my-5 sm:my-6 lg:my-8 border-t border-gray-200" />

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-3 text-sm sm:text-base lg:text-lg text-gray-700">
          <Clock3
            size={18}
            className="text-gray-500 shrink-0"
          />

          <span>{time}</span>
        </div>

        <div className="flex items-center gap-3 text-sm sm:text-base lg:text-lg text-gray-700">
          <MapPin
            size={18}
            className="text-gray-500 shrink-0"
          />

          <span>{location}</span>
        </div>
      </div>

      <button className="mt-6 sm:mt-8 lg:mt-10 flex w-full items-center justify-center gap-2 sm:gap-3 rounded-full border border-[#124A66] py-3 sm:py-4 text-base sm:text-lg font-semibold text-[#124A66] transition-all duration-300 hover:bg-[#124A66] hover:text-white">
        Register
        <ArrowRight size={18} />
      </button>
    </div>
  );
}