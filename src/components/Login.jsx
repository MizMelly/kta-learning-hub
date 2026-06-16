import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo login
    if (email && password) {
      navigate("/student/dashboard");
    }
  };

  return (
    <section
      id="login"
      className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-4 py-10"
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl shadow-lg p-8">
          
          {/* Back Home */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-[#0B4F97] hover:text-[#0A376A] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </button>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="bg-[#EAF2FB] text-[#0B4F97] px-4 py-2 rounded-full text-sm font-semibold">
              Welcome Back
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-[#0A376A]">
            Sign In
          </h2>

          <p className="text-center text-[#6B7280] mt-2 mb-8">
            Continue your learning journey.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4F97] focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4F97] focus:border-transparent transition"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#0B4F97] hover:text-[#E88B1A] transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#0B4F97] hover:bg-[#0A376A] text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-[#6B7280] mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#E88B1A] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;