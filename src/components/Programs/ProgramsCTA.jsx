export default function ProgramsCTA() {
  return (
    <section className="mx-auto my-16 max-w-7xl px-4 sm:my-20 sm:px-6 lg:my-24 lg:px-8">
      <div className="rounded-3xl lg:rounded-4xl bg-[#124A66] px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20">

        {/* Heading */}
        <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
          Not sure where to begin?
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
          Book a complimentary discovery call with an Unleash advisor
          to find the perfect pathway for your current goals.
        </p>

        {/* Button */}
        <button className="mt-8 w-full rounded-full bg-[#E46F21] px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-[#cf611d] hover:shadow-xl sm:mt-10 sm:w-auto sm:px-10 sm:py-4 sm:text-lg">
          Book Discovery Call
        </button>

      </div>
    </section>
  );
}