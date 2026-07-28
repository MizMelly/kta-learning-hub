import { ArrowRight, Users, Globe, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#0B4F6C] via-[#1D6388] to-[#E9EEF3] min-h-screen pt-10">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-225 rounded-full bg-[#4F8CB3]/10 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center pt-10">

          <h1 className="text-white font-serif font-bold leading-none">
            <span className="block text-5xl md:text-7xl">
              Unleash Your
            </span>

            <span className="block mt-2 text-5xl md:text-7xl">
              <span className="italic text-[#F47A20] font-normal">
                Greatest
              </span>{" "}
              <span className="text-white font-bold">
                Self
              </span>
            </span>
          </h1>

          <p className="mt-10 max-w-3xl mx-auto text-xl leading-9 text-white/90">
            A world-class transformation ecosystem designed to help
            leaders, entrepreneurs and professionals unlock their fullest
            potential and create lasting impact.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">

            <button
              onClick={() => navigate("/login")}
              className="bg-[#F47A20] hover:bg-[#E3680B] transition px-10 py-5 rounded-full font-semibold text-lg text-white flex items-center justify-center gap-2 shadow-xl"
            >
              Start Your Journey
              <ArrowRight size={22} />
            </button>

            <button
              onClick={() => navigate("/programs")}
              className="border border-white/30 text-white hover:bg-white/10 transition px-10 py-5 rounded-full font-semibold text-lg"
            >
              Explore Programs
            </button>

          </div>

        </div>

        {/* Floating Statistics Card */}
        <div className="relative mt-24">

          <div className="bg-white rounded-4xl shadow-2xl px-12 py-10 max-w-6xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-3">

              {/* Item */}
              <div className="flex items-center gap-6 justify-center md:justify-start">

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="text-[#F47A20]" size={28} />
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-[#0B4F6C]">
                    15,000+
                  </h3>

                  <p className="text-gray-500">
                    Alumni Worldwide
                  </p>
                </div>

              </div>

              {/* Divider */}
              <div className="hidden md:block absolute left-1/3 top-10 bottom-10 w-px bg-gray-200"></div>

              <div className="hidden md:block absolute left-2/3 top-10 bottom-10 w-px bg-gray-200"></div>

              {/* Item */}
              <div className="flex items-center gap-6 justify-center mt-10 md:mt-0">

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Globe className="text-[#F47A20]" size={28} />
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-[#0B4F6C]">
                    12+
                  </h3>

                  <p className="text-gray-500">
                    Countries Reached
                  </p>
                </div>

              </div>

              {/* Item */}
              <div className="flex items-center gap-6 justify-center mt-10 md:mt-0">

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Star className="text-[#F47A20]" size={28} />
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-[#0B4F6C]">
                    98%
                  </h3>

                  <p className="text-gray-500">
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