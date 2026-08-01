import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import logo from "../../../assets/logo.png";
import { auth, saveAuth } from "../../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  setError("");

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    console.log("Register Payload:", {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });

    const response = await auth.register({
  fullName: `${form.firstName.trim()} ${form.lastName.trim()}`,
  email: form.email.trim().toLowerCase(),
  password: form.password,
  confirmPassword: form.confirmPassword,
});

    console.log("Register Response:", response);

    saveAuth(response);

    navigate("/dashboard");
  } catch (err) {
    console.error("Registration Error:", err);

    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Registration failed");
    }
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
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Start your transformation journey today.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#124A66]">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-[#124A66] focus:ring-2 focus:ring-[#124A66]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#124A66]">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-[#124A66] focus:ring-2 focus:ring-[#124A66]/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#124A66]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="name@example.com"
              className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-[#124A66] focus:ring-2 focus:ring-[#124A66]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#124A66]">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-[#124A66] focus:ring-2 focus:ring-[#124A66]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#124A66]">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-[#124A66] focus:ring-2 focus:ring-[#124A66]/10"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-[#124A66] font-semibold text-white transition hover:bg-[#0E3B52] disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="inline-flex items-center gap-1 font-semibold text-[#124A66] hover:text-[#E46F21]"
          >
            Sign In
            <ArrowRight size={16} />
          </Link>
        </p>
      </div>
    </section>
  );
}