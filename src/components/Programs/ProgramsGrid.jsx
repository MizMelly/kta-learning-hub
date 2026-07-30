import ProgramCard from "./ProgramCard";

const programs = [
  {
    category: "Personal Development",
    title: "Life Essence",
    description:
      "Transform your mindset, identity and habits to become the highest version of yourself.",
    duration: "12 Weeks",
    delivery: "Online Live",
    startDate: "August 12",
  },
  {
    category: "Business",
    title: "Ignite Business",
    description:
      "Scale your business with proven systems, leadership principles and sustainable growth strategies.",
    duration: "10 Weeks",
    delivery: "Hybrid",
    startDate: "September 2",
  },
  {
    category: "Coaching",
    title: "Executive Coaching",
    description:
      "One-on-one coaching designed for executives, founders and high-performing leaders.",
    duration: "8 Sessions",
    delivery: "Private Online",
    startDate: "Open Enrollment",
  },
  {
    category: "Business",
    title: "Corporate Leadership",
    description:
      "Leadership development programs tailored for organizations seeking lasting transformation.",
    duration: "Custom",
    delivery: "On-site & Virtual",
    startDate: "Available Anytime",
  },
  {
    category: "Personal Development",
    title: "Women in Leadership",
    description:
      "Empowering women with the confidence, influence and leadership skills to thrive.",
    duration: "6 Weeks",
    delivery: "Online",
    startDate: "October 5",
  },
  {
    category: "Coaching",
    title: "Leadership Mastermind",
    description:
      "A private community for ambitious leaders committed to continuous growth and accountability.",
    duration: "Ongoing",
    delivery: "Monthly Sessions",
    startDate: "Join Anytime",
  },
];

export default function ProgramsGrid({ activeCategory }) {
  const filteredPrograms =
    activeCategory === "All"
      ? programs
      : programs.filter(
          (program) => program.category === activeCategory
        );

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.title}
              category={program.category}
              title={program.title}
              description={program.description}
              duration={program.duration}
              delivery={program.delivery}
              startDate={program.startDate}
            />
          ))}

        </div>

      </div>
    </section>
  );
}