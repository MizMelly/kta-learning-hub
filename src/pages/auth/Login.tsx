import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import logo from "../../../assets/logo.png";
import { auth, saveAuth } from "../../../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await auth.login(form);

      saveAuth(response);

      // Redirect
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F9F9F6] px-5 py-20 sm:px-6 lg:px-8">

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#E46F21]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#124A66]/10 blur-[120px]" />

      <div className="relative w-full max-w-lg rounded-3xl border border-gray-200 bg-white px-6 py-8 shadow-xl sm:px-8">

        <div className="flex justify-center">
          <Link to="/">
            <img
              src={logo}
              alt="Unleash Academy"
              className="h-10 w-auto transition hover:scale-105 sm:h-12"
            />
          </Link>
        </div>

        <div className="mt-6 text-center">
          <h1 className="font-serif text-2xl font-semibold text-[#124A66] sm:text-3xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Log in to continue your transformation journey.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#124A66]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-[#124A66] focus:ring-2 focus:ring-[#124A66]/10"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-[#124A66]">
                Password
              </label>

              <button
                type="button"
                className="text-sm font-medium text-[#124A66] hover:text-[#E46F21]"
              >
                Forgot password?
              </button>
            </div>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-[#124A66] focus:ring-2 focus:ring-[#124A66]/10"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-[#124A66] font-semibold text-white transition hover:bg-[#0E3B52] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="mx-4 text-xs uppercase tracking-widest text-gray-500">
            Or Continue With
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 font-semibold text-[#124A66] transition hover:border-[#124A66] hover:bg-gray-50">
          <FcGoogle size={22} />
          Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          New here?{" "}
          <Link
            to="/register"
            className="inline-flex items-center gap-1 font-semibold text-[#124A66] hover:text-[#E46F21]"
          >
            Start Your Journey
            <ArrowRight size={16} />
          </Link>
        </p>

      </div>
    </section>
  );
}