import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { auth } from "../services/api";

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

<<<<<<< HEAD
    // Demo login
    if (email && password) {
      navigate("/student/dashboard");
=======
    try {
      const response = await auth.login({ email, password });
      // Store token and user data
      localStorage.setItem("kta_token", response.data.token);
      localStorage.setItem("kta_user", JSON.stringify(response.data.user));

      // Redirect based on role
      const user = response.data.user;
      if (user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
    }
  };

  return (
    <section
      id="login"
      className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-4 py-10"
    >
<<<<<<< HEAD
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
=======
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

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

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
            disabled={loading}
            className="w-full bg-[#0f66b7] text-white py-3 rounded-xl font-medium hover:bg-[#09539a] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
          </button>

<<<<<<< HEAD
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
=======
        <p className="text-sm text-center text-gray-500 mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#0f66b7] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
      </div>
    </section>
  );
};

export default Login;