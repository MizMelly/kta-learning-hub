import { ArrowRight, Users, Globe, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#0B4F6C] via-[#1D6388] to-[#E9EEF3] min-h-screen pt-6 md:pt-10">
      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-60 w-60 md:h-225 md:w-225 rounded-full bg-[#4F8CB3]/10 blur-[120px] md:blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Hero Content */}
        <div className="mx-auto max-w-5xl text-center pt-6 md:pt-10">
          <h1 className="font-serif font-bold leading-none text-white">
            <span className="block text-4xl sm:text-5xl md:text-7xl">
              Unleash Your
            </span>

            <span className="mt-1 md:mt-2 block text-4xl sm:text-5xl md:text-7xl">
              <span className="font-normal italic text-[#F47A20]">
                Greatest
              </span>{" "}
              <span className="font-bold text-white">
                Self
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-6 md:mt-10 max-w-3xl px-2 text-base leading-7 text-white/90 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            A world-class transformation ecosystem designed to help leaders,
            entrepreneurs and professionals unlock their fullest potential and
            create lasting impact.
          </p>

          <div className="mt-8 md:mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <button
              onClick={() => navigate("/login")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F47A20] px-6 py-4 text-base font-semibold text-white shadow-xl transition hover:bg-[#E3680B] sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
            >
              Start Your Journey
              <ArrowRight size={20} />
            </button>

            <button
              onClick={() => navigate("/programs")}
              className="w-full rounded-full border border-white/30 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
            >
              Explore Programs
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="relative mt-14 md:mt-24">
          <div className="mx-auto max-w-6xl rounded-3xl md:rounded-4xl bg-white px-6 py-6 shadow-2xl sm:px-8 md:px-12 md:py-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
              {/* Item */}
              <div className="flex items-center justify-center gap-4 md:justify-start md:gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 md:h-16 md:w-16">
                  <Users
                    className="text-[#F47A20]"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#0B4F6C] sm:text-3xl md:text-4xl">
                    15,000+
                  </h3>

                  <p className="text-sm text-gray-500 md:text-base">
                    Alumni Worldwide
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="absolute left-1/3 top-10 bottom-10 hidden w-px bg-gray-200 md:block"></div>
              <div className="absolute left-2/3 top-10 bottom-10 hidden w-px bg-gray-200 md:block"></div>

              {/* Item */}
              <div className="flex items-center justify-center gap-4 md:justify-center md:gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 md:h-16 md:w-16">
                  <Globe
                    className="text-[#F47A20]"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#0B4F6C] sm:text-3xl md:text-4xl">
                    12+
                  </h3>

                  <p className="text-sm text-gray-500 md:text-base">
                    Countries Reached
                  </p>
                </div>
              </div>

              {/* Item */}
              <div className="flex items-center justify-center gap-4 md:justify-center md:gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 md:h-16 md:w-16">
                  <Star
                    className="text-[#F47A20]"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#0B4F6C] sm:text-3xl md:text-4xl">
                    98%
                  </h3>

                  <p className="text-sm text-gray-500 md:text-base">
                    Transformation Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;