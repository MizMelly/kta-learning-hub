import ResourceCard from "./ResourceCard";

const resources = [
  {
    category: "Article",
    title: "The Architecture of a Resilient Mind",
    description:
      "How to build mental structures that withstand pressure without breaking.",
    readTime: "5 min read",
  },
  {
    category: "Video",
    title: "Overcoming The Imposter Phenomenon",
    description:
      "Dr. Marcus Adebayo breaks down why high-achievers feel like frauds.",
    readTime: "12:45",
  },
  {
    category: "Podcast",
    title: "Ep 42: Leading with Vulnerability",
    description:
      "A conversation on the power of showing up authentically.",
    readTime: "45:20",
  },
  {
    category: "Download",
    title: "The Weekly Alignment Planner",
    description:
      "Our signature Sunday planning framework for high-impact weeks.",
    readTime: "PDF Document",
  },
];

export default function ResourcesGrid({
  activeCategory,
  search,
}) {
  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "All" ||
      resource.category === activeCategory;

    const matchesSearch =
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">

            {filteredResources.map((resource) => (
              <div key={resource.title} className="h-full">
                <ResourceCard
                  category={resource.category}
                  title={resource.title}
                  description={resource.description}
                  readTime={resource.readTime}
                />
              </div>
            ))}

          </div>
        ) : (
          <div className="flex min-h-70 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 text-center">

            <h3 className="text-xl font-semibold text-[#124A66]">
              No resources found
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              We couldn't find any resources matching your search or selected
              category. Try using different keywords or choose another category.
            </p>

          </div>
        )}

      </div>
    </section>
  );
}