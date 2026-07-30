import faculty1 from "../../assets/ceo.jpg";
import faculty2 from "../../assets/coach1.png";
import faculty3 from "../../assets/coach2.png";
import faculty4 from "../../assets/staff2.jpg";
import faculty5 from "../../assets/staff3.jpg";
import faculty6 from "../../assets/staff4.jpg";

const faculty = [
  {
    image: faculty1,
    name: "Dr. David Johnson",
    role: "Leadership Coach",
  },
  {
    image: faculty2,
    name: "Esther Williams",
    role: "Clinical Psychologist",
  },
  {
    image: faculty3,
    name: "James Brown",
    role: "Business Strategist",
  },
  {
    image: faculty4,
    name: "Dr. Diana Smith",
    role: "Executive Mentor",
  },
  {
    image: faculty5,
    name: "Michael Anderson",
    role: "Performance Coach",
  },
  {
    image: faculty6,
    name: "Sarah Thompson",
    role: "Executive Consultant",
  },
];

export default function FacultySection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-[#124A66] sm:text-4xl lg:text-6xl">
            Meet the Faculty
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            World-class facilitators committed to guiding your
            transformation.
          </p>
        </div>

        {/* Faculty Grid */}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {faculty.map((member) => (
            <div
              key={member.name}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#E46F21] hover:shadow-xl"
            >
              {/* Image */}

              <div className="overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72 md:h-80 lg:h-96"
                />
              </div>

              {/* Content */}

              <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-7 text-center">
                <h3 className="font-serif text-xl font-semibold text-[#124A66] sm:text-2xl">
                  {member.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-[#E46F21] sm:text-base">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}