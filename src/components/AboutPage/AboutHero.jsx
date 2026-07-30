export default function AboutHero() {
  return (
    <section
      id="about"
      className="bg-white pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28"
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-8">

        {/* Heading */}

        <h1
          className="
            mx-auto max-w-4xl
            font-serif font-semibold
            leading-tight
            text-[#124A66]

            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-7xl
          "
        >
          Built to Transform Lives
        </h1>


        {/* Description */}

        <p
          className="
            mx-auto mt-5 max-w-3xl
            text-gray-500

            text-sm
            leading-6

            sm:mt-6
            sm:text-base
            sm:leading-7

            md:text-lg
            md:leading-8

            lg:text-xl
            lg:leading-9
          "
        >
          We are more than an academy. We are a crucible for human
          potential, designed to help you unlock your highest
          expression of leadership and life.
        </p>

      </div>
    </section>
  );
}