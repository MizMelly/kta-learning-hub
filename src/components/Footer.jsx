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
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

          {/* Logo & Description */}
          <div>
            <img
              src={logo}
              alt="Unleash Academy"
              className="h-14 w-auto"
            />

            <p className="mt-8 text-white/80 leading-9 text-lg">
              A premium transformation ecosystem for leaders,
              entrepreneurs and professionals committed to becoming
              their greatest selves.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-10">
              {[
                { Icon: FaLinkedinIn, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaYoutube, href: "#" },
                { Icon: FaFacebookF, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-14 h-14 rounded-full bg-white/10 hover:bg-[#F47A20] transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#F47A20] font-serif text-4xl font-bold mb-8">
              Quick Links
            </h3>

            <ul className="space-y-5 text-lg text-white/80">
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-white transition"
                >
                  About Us
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/events")}
                  className="hover:text-white transition"
                >
                  Upcoming Events
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/resources")}
                  className="hover:text-white transition"
                >
                  Insights & Resources
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-white transition"
                >
                  Contact
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-white transition"
                >
                  Member Login
                </button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-[#F47A20] font-serif text-4xl font-bold mb-8">
              Programs
            </h3>

            <ul className="space-y-5 text-lg text-white/80">
              <li>Life Essence</li>
              <li>Ignite Business</li>
              <li>Executive Coaching</li>
              <li>Corporate Training</li>

              <li>
                <button
                  onClick={() => navigate("/programs")}
                  className="hover:text-white transition"
                >
                  View All Programs
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#F47A20] font-serif text-4xl font-bold mb-8">
              Weekly Insight
            </h3>

            <p className="text-white/80 leading-9 text-lg">
              Join 15,000+ leaders receiving weekly insights on
              leadership, business and personal transformation.
            </p>

            <div className="flex mt-10 gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-2xl bg-white/10 border border-white/10 px-5 py-4 text-white placeholder:text-white/50 outline-none focus:border-[#F47A20]"
              />

              <button className="w-16 rounded-2xl bg-[#F47A20] hover:bg-[#E06E13] transition-all duration-300 flex items-center justify-center">
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/60 text-sm">
            © 2026 Unleash Academy. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            <button className="hover:text-white transition">
              Privacy Policy
            </button>

            <button className="hover:text-white transition">
              Terms of Service
            </button>

            <button className="hover:text-white transition">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}