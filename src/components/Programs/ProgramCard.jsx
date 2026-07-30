import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MonitorPlay,
} from "lucide-react";

export default function ProgramCard({
  category,
  title,
  description,
  duration,
  delivery,
  startDate,
}) {
  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        rounded-3xl
        lg:rounded-4xl
        border
        border-gray-200
        bg-white
        p-5
        sm:p-6
        lg:p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-[#124A66]/20
        hover:shadow-xl
      "
    >
      {/* Category */}
      <span className="inline-flex w-fit rounded-full bg-[#124A66]/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#124A66]">
        {category}
      </span>

      {/* Title */}
      <h3 className="mt-4 sm:mt-5 lg:mt-6 font-serif text-2xl sm:text-3xl font-semibold leading-tight text-[#124A66]">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 sm:mt-4 lg:mt-5 flex-1 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
        {description}
      </p>

      {/* Info */}
      <div className="mt-6 sm:mt-7 lg:mt-8 space-y-3 sm:space-y-4 border-t border-gray-100 pt-5 sm:pt-6">
        <div className="flex items-center gap-3 text-gray-700">
          <Clock3
            size={18}
            className="text-[#E46F21] shrink-0"
          />

          <span className="text-sm sm:text-base">
            {duration}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <MonitorPlay
            size={18}
            className="text-[#E46F21] shrink-0"
          />

          <span className="text-sm sm:text-base">
            {delivery}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <CalendarDays
            size={18}
            className="text-[#E46F21] shrink-0"
          />

          <span className="text-sm sm:text-base">
            Starts {startDate}
          </span>
        </div>
      </div>

      {/* Button */}
      <button className="mt-6 sm:mt-7 lg:mt-8 inline-flex items-center gap-2 sm:gap-3 self-start rounded-full bg-[#124A66] px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white transition duration-300 hover:bg-[#0E3D53]">
        View Details

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </article>
  );
}