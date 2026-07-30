import {
  ArrowRight,
  FileText,
  PlayCircle,
  Headphones,
  Download,
} from "lucide-react";

export default function ResourceCard({
  category,
  title,
  description,
  readTime,
}) {
  const getIcon = () => {
    switch (category) {
      case "Article":
        return <FileText size={20} className="text-[#124A66]" />;

      case "Video":
        return <PlayCircle size={20} className="text-[#124A66]" />;

      case "Podcast":
        return <Headphones size={20} className="text-[#124A66]" />;

      case "Download":
        return <Download size={20} className="text-[#124A66]" />;

      default:
        return <FileText size={20} className="text-[#124A66]" />;
    }
  };

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        rounded-3xl
        lg:rounded-[32px]
        border
        border-gray-200
        bg-white
        p-5
        sm:p-6
        lg:p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#124A66]/10
        hover:shadow-xl
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#124A66]/10 sm:h-12 sm:w-12">
          {getIcon()}
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 sm:text-xs">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 font-serif text-2xl leading-tight text-[#124A66] transition-colors duration-300 group-hover:text-[#E46F21] sm:mt-6 sm:text-3xl lg:mt-8 lg:text-[34px]">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 flex-1 text-sm leading-7 text-gray-500 sm:text-base sm:leading-8 lg:mt-5 lg:text-lg">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-6 border-t border-gray-200 pt-5 sm:mt-8 sm:pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#124A66] sm:text-base">
            {readTime}
          </span>

          <ArrowRight
            size={20}
            className="text-[#124A66] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#E46F21]"
          />
        </div>
      </div>
    </article>
  );
}