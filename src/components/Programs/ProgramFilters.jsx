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
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              min-h-12
              rounded-full
              px-4
              py-3
              text-center
              text-sm
              font-semibold
              transition-all
              duration-300
              sm:px-6
              sm:text-[15px]
              lg:px-7
              ${
                activeCategory === category
                  ? "bg-[#124A66] text-white shadow-lg"
                  : "border border-[#E5E7EB] bg-[#F6F7F4] text-[#124A66] hover:border-[#124A66] hover:bg-white"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}