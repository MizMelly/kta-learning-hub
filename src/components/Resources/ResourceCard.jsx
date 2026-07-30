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
        rounded-3xl
        lg:rounded-4xl
        border
        border-gray-200
        bg-white
        p-5
        sm:p-6
        lg:p-7
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-[#124A66]/10">
          {getIcon()}
        </div>

        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-gray-500">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 sm:mt-6 lg:mt-8 font-serif text-2xl sm:text-3xl lg:text-[34px] leading-tight text-[#124A66] transition group-hover:text-[#E46F21]">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 sm:mt-4 lg:mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-6 sm:mt-7 lg:mt-8 border-t border-gray-200 pt-5 sm:pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base font-semibold text-[#124A66]">
            {readTime}
          </span>

          <ArrowRight
            size={18}
            className="text-[#124A66] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#E46F21]"
          />
        </div>
      </div>
    </article>
  );
}