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
    <div className="rounded-3xl lg:rounded-4xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        {/* Date */}
        <div className="flex h-16 w-16 sm:h-18 sm:w-18 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#F6F7F4]">
          <span className="text-[11px] sm:text-sm font-bold uppercase tracking-wide text-[#124A66]">
            {month}
          </span>

          <span className="mt-1 text-3xl sm:text-4xl font-serif leading-none text-[#124A66]">
            {day}
          </span>
        </div>

        {/* Badge */}
        {badge && (
          <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-[11px] sm:px-4 sm:py-2 sm:text-sm font-semibold text-blue-600 whitespace-nowrap">
            {badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-5 text-2xl sm:mt-6 sm:text-3xl lg:mt-8 lg:text-4xl font-serif leading-tight text-[#124A66]">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base sm:leading-8 lg:mt-5 lg:text-lg lg:leading-9">
        {description}
      </p>

      {/* Divider */}
      <div className="my-5 border-t border-gray-200 sm:my-6 lg:my-8" />

      {/* Details */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-sm text-gray-700 sm:text-base lg:text-lg">
          <Clock3
            size={18}
            className="mt-0.5 shrink-0 text-gray-500"
          />

          <span className="leading-6">{time}</span>
        </div>

        <div className="flex items-start gap-3 text-sm text-gray-700 sm:text-base lg:text-lg">
          <MapPin
            size={18}
            className="mt-0.5 shrink-0 text-gray-500"
          />

          <span className="leading-6 wrap-break-word">
            {location}
          </span>
        </div>
      </div>

      {/* Button */}
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#124A66] py-3 text-base font-semibold text-[#124A66] transition-all duration-300 hover:bg-[#124A66] hover:text-white sm:mt-8 sm:gap-3 sm:py-4 sm:text-lg lg:mt-10">
        Register
        <ArrowRight size={18} />
      </button>
    </div>
  );
}