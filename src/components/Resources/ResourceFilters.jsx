import { Search } from "lucide-react";

const categories = [
  "All",
  "Articles",
  "Videos",
  "Podcasts",
  "Downloads",
];

export default function ResourceFilters({
  activeCategory,
  setActiveCategory,
  search,
  setSearch,
}) {
  return (
    <section className="px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
      <div className="mx-auto max-w-7xl">

        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-[#124A66] focus-within:ring-4 focus-within:ring-[#124A66]/10 sm:px-6 sm:py-4">

            <Search
              size={20}
              className="shrink-0 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, videos, podcasts..."
              className="ml-3 w-full bg-transparent text-sm text-[#124A66] placeholder:text-gray-400 focus:outline-none sm:text-base lg:text-lg"
            />

          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm lg:px-7 lg:py-3 lg:text-base ${
                activeCategory === category
                  ? "bg-[#124A66] text-white shadow-lg"
                  : "border border-gray-200 bg-white text-[#124A66] hover:border-[#124A66] hover:bg-[#124A66]/5"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </div>
    </section>
  );
}