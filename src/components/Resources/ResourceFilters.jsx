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
    <section className="px-4 pb-14 sm:px-6 md:pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm sm:px-6 sm:py-4">

            <Search
              size={20}
              className="text-gray-400 shrink-0"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics..."
              className="ml-3 w-full bg-transparent text-base sm:text-lg text-[#124A66] placeholder:text-gray-400 focus:outline-none"
            />

          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:px-7 sm:py-3 sm:text-base ${
                activeCategory === category
                  ? "bg-[#124A66] text-white shadow-md"
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