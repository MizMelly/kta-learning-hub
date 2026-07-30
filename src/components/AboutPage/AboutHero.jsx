export default function AboutHero() {
  return (
    <section
      id="about"
      className="bg-white pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-10 lg:pb-20"
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
            mx-auto mt-4 max-w-3xl
            text-gray-500

            text-sm
            leading-6

            sm:mt-5
            sm:text-base
            sm:leading-7

            md:text-lg
            md:leading-8

            lg:mt-6
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