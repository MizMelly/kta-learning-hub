import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../services/api";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await auth.login({
        email,
        password,
      });

      localStorage.setItem("kta_token", response.token);
      localStorage.setItem("kta_user", JSON.stringify(response.user));

      if (response.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] px-5 py-10 sm:px-6 md:py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#f6efe1,transparent_45%),radial-gradient(circle_at_right,#eef5f9,transparent_45%)] opacity-80"></div>

      <div className="relative w-full max-w-xl">
        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-8 shadow-2xl md:rounded-[30px] md:px-10 md:py-10">
          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-[#174F73] transition hover:text-[#F47A20] md:text-base"
          >
            <ArrowLeft size={18} />
            Back Home
          </button>

          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <img
              src={logo}
              alt="Unleash Academy"
              className="h-12 object-contain md:h-16"
            />
          </div>

          {/* Heading */}
          <h1 className="text-center font-serif text-4xl font-bold text-[#174F73] sm:text-5xl md:text-6xl">
            Welcome Back
          </h1>

          <p className="mt-3 text-center text-base leading-7 text-gray-500 sm:text-lg">
            Log in to continue your transformation journey.
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="mt-6 space-y-5 md:mt-8 md:space-y-6">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#174F73] md:text-base">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="h-12 w-full rounded-xl border border-[#D8E2EE] bg-[#EAF2FB] px-4 text-sm outline-none transition focus:ring-2 focus:ring-[#174F73] md:h-14 md:rounded-2xl md:px-5 md:text-base"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-[#174F73] md:text-base">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-[#174F73] transition hover:text-[#F47A20]"
                >
                  Forgot password?
                </button>
              </div>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="h-12 w-full rounded-xl border border-[#D8E2EE] bg-[#EAF2FB] px-4 text-sm outline-none transition focus:ring-2 focus:ring-[#174F73] md:h-14 md:rounded-2xl md:px-5 md:text-base"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#174F73] text-base font-semibold text-white transition hover:bg-[#123F5B] md:h-14 md:rounded-2xl md:text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3 md:my-8 md:gap-4">
            <div className="h-px flex-1 bg-gray-300"></div>

            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Or Continue With
            </span>

            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 font-semibold text-[#174F73] transition hover:border-[#174F73] hover:bg-gray-50 md:h-14 md:rounded-2xl"
          >
            <FcGoogle size={22} />
            Google
          </button>

          {/* Bottom */}
          <div className="mt-6 text-center text-sm text-gray-500 md:mt-8 md:text-[15px]">
            New here?{" "}

            <Link
              to="/register"
              className="inline-flex items-center gap-1 font-semibold text-[#174F73] hover:text-[#F47A20]"
            >
              Start Your Journey
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;