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
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-5">
          Don't have an account?{" "}
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