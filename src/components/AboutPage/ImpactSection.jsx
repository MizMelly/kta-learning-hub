export default function ImpactSection() {
  const stats = [
    {
      value: "15K+",
      label: "Alumni Worldwide",
    },
    {
      value: "12",
      label: "Countries Present",
    },
    {
      value: "50+",
      label: "Programs Delivered",
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="bg-[#124A66] py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:gap-12 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center"
            >
              <h2 className="font-serif text-4xl font-semibold leading-none text-[#E46F21] sm:text-5xl md:text-6xl lg:text-7xl">
                {stat.value}
              </h2>

              <p className="mt-3 max-w-35 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 sm:mt-4 sm:max-w-none sm:text-sm lg:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}