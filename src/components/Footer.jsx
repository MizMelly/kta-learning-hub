import { ArrowRight } from "lucide-react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#134F73] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Logo & Description */}
          <div>
            <img
              src={logo}
              alt="Unleash Academy"
              className="h-12 w-auto md:h-14"
            />

            <p className="mt-6 md:mt-8 text-base leading-7 text-white/80 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              A premium transformation ecosystem for leaders,
              entrepreneurs and professionals committed to becoming
              their greatest selves.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex gap-3 md:mt-10 md:gap-4">
              {[
                { Icon: FaLinkedinIn, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaYoutube, href: "#" },
                { Icon: FaFacebookF, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-[#F47A20] md:h-14 md:w-14"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-3xl font-bold text-[#F47A20] md:mb-8 md:text-4xl">
              Quick Links
            </h3>

            <ul className="space-y-4 text-base text-white/80 sm:text-lg md:space-y-5 md:text-xl">
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="transition hover:text-white"
                >
                  About Us
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/events")}
                  className="transition hover:text-white"
                >
                  Upcoming Events
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/resources")}
                  className="transition hover:text-white"
                >
                  Insights & Resources
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="transition hover:text-white"
                >
                  Contact
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="transition hover:text-white"
                >
                  Member Login
                </button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-6 font-serif text-3xl font-bold text-[#F47A20] md:mb-8 md:text-4xl">
              Programs
            </h3>

            <ul className="space-y-4 text-base text-white/80 sm:text-lg md:space-y-5 md:text-xl">
              <li>Life Essence</li>
              <li>Ignite Business</li>
              <li>Executive Coaching</li>
              <li>Corporate Training</li>

              <li>
                <button
                  onClick={() => navigate("/programs")}
                  className="transition hover:text-white"
                >
                  View All Programs
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 font-serif text-3xl font-bold text-[#F47A20] md:mb-8 md:text-4xl">
              Weekly Insight
            </h3>

            <p className="text-base leading-7 text-white/80 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              Join 15,000+ leaders receiving weekly insights on leadership,
              business and personal transformation.
            </p>

            <div className="mt-8 flex gap-3 md:mt-10">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-[#F47A20] md:rounded-2xl md:px-5 md:py-4 md:text-base"
              />

              <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F47A20] transition-all duration-300 hover:bg-[#E06E13] md:h-auto md:w-16 md:rounded-2xl">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:mt-20 md:flex-row md:gap-6 md:pt-10">
          <p className="text-sm text-white/60">
            © 2026 Unleash Academy. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-white/60 md:gap-8">
            <button className="transition hover:text-white">
              Privacy Policy
            </button>

            <button className="transition hover:text-white">
              Terms of Service
            </button>

            <button className="transition hover:text-white">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}