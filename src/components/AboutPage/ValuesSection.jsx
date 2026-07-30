export default function ValuesSection() {
  const values = [
    {
      letter: "T",
      title: "Transformation First",
      description:
        "Everything we design is focused on creating lasting internal change before external success.",
    },
    {
      letter: "H",
      title: "Human Potential",
      description:
        "We believe every individual possesses untapped capacity waiting to be awakened through intentional growth.",
    },
    {
      letter: "C",
      title: "Community",
      description:
        "Growth accelerates inside supportive environments where accountability and collaboration thrive.",
    },
    {
      letter: "P",
      title: "Purpose-Driven Impact",
      description:
        "Success becomes meaningful when your personal transformation creates value for others.",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#124A66] sm:text-4xl lg:text-5xl xl:text-6xl">
            What We Stand For
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg">
            Every experience inside Unleash Academy is guided by principles
            that shape leaders, inspire growth, and create meaningful impact.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#E46F21] hover:shadow-lg sm:p-7 lg:p-8"
            >
              {/* Large Letter */}

              <span className="font-serif text-5xl font-bold leading-none text-[#E46F21]/15 transition duration-300 group-hover:text-[#E46F21]/25 sm:text-6xl lg:text-7xl">
                {value.letter}
              </span>

              {/* Title */}

              <h3 className="mt-4 font-serif text-2xl leading-tight text-[#124A66] sm:mt-5 sm:text-3xl">
                {value.title}
              </h3>

              {/* Description */}

              <p className="mt-4 flex-1 text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}