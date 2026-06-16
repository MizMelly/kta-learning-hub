import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo login (no backend yet)
    if (email && password) {
      navigate("/student/dashboard");
    }
  };

  return (
    <section
      id="login"
      className="min-h-screen flex items-center justify-center bg-[#f4f7fa] px-4"
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-100">

        {/* Back Home Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-[#0f66b7] font-medium mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </button>

        <h2 className="text-2xl font-bold text-center text-[#1d2939] mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f66b7]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f66b7]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0f66b7] text-white py-3 rounded-xl font-medium hover:bg-[#09539a] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#0f66b7] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;