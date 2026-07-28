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
    <section className="min-h-screen bg-[#F8F7F3] flex items-center justify-center px-6 py-16">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#f6efe1,transparent_45%),radial-gradient(circle_at_right,#eef5f9,transparent_45%)] opacity-80"></div>

      <div className="relative w-full max-w-xl">

        <div className="bg-white rounded-[30px] shadow-2xl border border-gray-100 px-8 md:px-10 py-10">

          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#174F73] font-medium hover:text-[#F47A20] transition mb-5"
          >
            <ArrowLeft size={18} />
            Back Home
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img
              src={logo}
              alt="Unleash Academy"
              className="h-16 object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-center text-5xl font-serif font-bold text-[#174F73]">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mt-3 text-lg">
            Log in to continue your transformation journey.
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="mt-8">

            {/* Email */}
            <div className="mb-6">
              <label className="block text-[#174F73] font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full h-14 rounded-2xl bg-[#EAF2FB] border border-[#D8E2EE] px-5 outline-none focus:ring-2 focus:ring-[#174F73]"
              />
            </div>

            {/* Password */}
            <div>

              <div className="flex justify-between mb-2">

                <label className="font-semibold text-[#174F73]">
                  Password
                </label>

                <button
                  type="button"
                  className="text-[#174F73] hover:text-[#F47A20] font-medium"
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
                className="w-full h-14 rounded-2xl bg-[#EAF2FB] border border-[#D8E2EE] px-5 outline-none focus:ring-2 focus:ring-[#174F73]"
              />

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full h-14 rounded-2xl bg-[#174F73] hover:bg-[#123F5B] text-white font-semibold text-lg transition flex items-center justify-center gap-2"
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

          <div className="flex items-center my-8">

            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="mx-5 text-gray-400 uppercase tracking-widest text-sm">
              Or Continue With
            </span>

            <div className="flex-1 h-px bg-gray-300"></div>

          </div>

          {/* Google */}

          <button
            className="w-full h-14 rounded-2xl border border-gray-300 hover:border-[#174F73] hover:bg-gray-50 transition flex items-center justify-center gap-3 font-semibold text-[#174F73]"
          >
            <FcGoogle size={24} />
            Google
          </button>

          {/* Bottom */}

          <div className="mt-8 text-center text-gray-500">

            New here?{" "}

            <Link
              to="/register"
              className="font-semibold text-[#174F73] hover:text-[#F47A20] inline-flex items-center gap-1"
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