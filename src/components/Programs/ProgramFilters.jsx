const categories = [
  "All",
  "Personal Development",
  "Business",
  "Coaching",
];

export default function ProgramFilters({
  activeCategory,
  setActiveCategory,
}) {
  return (
    <section className="px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 sm:gap-4">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-7 sm:py-3 sm:text-[15px] ${
              activeCategory === category
                ? "bg-[#124A66] text-white shadow-lg"
                : "border border-transparent bg-[#F1F3F1] text-[#124A66] hover:border-[#124A66] hover:bg-white"
            }`}
          >
            {category}
          </button>
        ))}

      </div>
    </section>
  );
}