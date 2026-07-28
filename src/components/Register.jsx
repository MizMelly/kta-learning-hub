import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { auth } from "../services/api";
import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await auth.register({
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      localStorage.setItem("kta_token", response.token);
      localStorage.setItem(
        "kta_user",
        JSON.stringify(response.user)
      );

      navigate("/student/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F8F7F3] flex items-center justify-center px-6 py-16">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#f6efe1,transparent_45%),radial-gradient(circle_at_right,#eef5f9,transparent_45%)] opacity-80"></div>

      <div className="relative w-full max-w-xl">

        <div className="rounded-[30px] border border-gray-100 bg-white px-8 md:px-10 py-10 shadow-2xl">

          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="mb-5 flex items-center gap-2 font-medium text-[#174F73] transition hover:text-[#F47A20]"
          >
            <ArrowLeft size={18} />
            Back Home
          </button>

          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <img
              src={logo}
              alt="Unleash Academy"
              className="h-16 object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-center text-5xl font-bold font-serif text-[#174F73]">
            Create Account
          </h1>

          <p className="mt-3 text-center text-lg text-gray-500">
            Start your transformation journey today.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* Names */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="mb-2 block font-semibold text-[#174F73]">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-14 w-full rounded-2xl border border-[#D8E2EE] bg-[#EAF2FB] px-5 outline-none transition focus:ring-2 focus:ring-[#174F73]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#174F73]">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-14 w-full rounded-2xl border border-[#D8E2EE] bg-[#EAF2FB] px-5 outline-none transition focus:ring-2 focus:ring-[#174F73]"
                  required
                />
              </div>

            </div>

            {/* Email */}
            <div>

              <label className="mb-2 block font-semibold text-[#174F73]">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="h-14 w-full rounded-2xl border border-[#D8E2EE] bg-[#EAF2FB] px-5 outline-none transition focus:ring-2 focus:ring-[#174F73]"
                required
              />

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block font-semibold text-[#174F73]">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-[#D8E2EE] bg-[#EAF2FB] px-5 outline-none transition focus:ring-2 focus:ring-[#174F73]"
                required
              />

            </div>

            {/* Confirm Password */}
            <div>

              <label className="mb-2 block font-semibold text-[#174F73]">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-[#D8E2EE] bg-[#EAF2FB] px-5 outline-none transition focus:ring-2 focus:ring-[#174F73]"
                required
              />

            </div>

            {/* Create Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#174F73] text-lg font-semibold text-white transition hover:bg-[#123F5B]"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
                    
            <label className="block text-sm font-semibold text-[#1B4F72] mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full rounded-xl border border-[#D6DEE8] px-4 py-3.5 bg-white outline-none transition focus:border-[#1B4F72] focus:ring-4 focus:ring-[#1B4F72]/10"
              required
            />
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200"></div>

          <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Or Continue With
          </span>

          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full rounded-xl border border-[#D6DEE8] bg-white py-3.5 font-semibold text-[#184F6E] transition hover:bg-gray-50 flex items-center justify-center gap-3"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303C33.653 32.657 29.244 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.144 35.091 26.715 36 24 36c-5.223 0-9.618-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.06 12.06 0 0 1-4.084 5.571l.003-.002 6.19 5.238C36.971 38.481 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>

          Google
        </button>

        {/* Bottom */}
        <p className="mt-8 text-center text-[15px] text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="inline-flex items-center gap-1 font-semibold text-[#184F6E] hover:text-[#F47A20]"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
      </div>
    </section>
  );
}
