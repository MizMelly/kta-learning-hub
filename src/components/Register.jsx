<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { auth } from "../services/api";
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await auth.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      // Auto-login after register
      localStorage.setItem("kta_token", response.data.token);
      localStorage.setItem("kta_user", JSON.stringify(response.data.user));

      navigate("/student/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Create Account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Join KTA Hub today
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
=======
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa] px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-[#0f66b7] font-medium mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1d2939]">Create Account</h1>
          <p className="mt-2 text-gray-500">Join KTA Hub today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
<<<<<<< HEAD
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary"
=======
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f66b7]"
              required
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="mb-2 block text-sm font-medium text-foreground">
=======
            <label className="mb-2 block text-sm font-medium text-gray-700">
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
<<<<<<< HEAD
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary"
=======
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f66b7]"
              required
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="mb-2 block text-sm font-medium text-foreground">
=======
            <label className="mb-2 block text-sm font-medium text-gray-700">
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
<<<<<<< HEAD
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary"
=======
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f66b7]"
              required
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="mb-2 block text-sm font-medium text-foreground">
=======
            <label className="mb-2 block text-sm font-medium text-gray-700">
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
<<<<<<< HEAD
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary"
=======
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f66b7]"
              required
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
            />
          </div>

          {/* Button */}
          <button
            type="submit"
<<<<<<< HEAD
            className="w-full rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:bg-[#0a376a]"
=======
            disabled={loading}
            className="w-full rounded-xl bg-[#0f66b7] px-4 py-3 text-white font-medium hover:bg-[#09539a] transition disabled:opacity-50 flex items-center justify-center gap-2"
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

<<<<<<< HEAD
        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-[#0a376a] transition"
          >
=======
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[#0f66b7] hover:underline">
>>>>>>> a361ba55878fb8d6733c7972ba0a944cde00b38f
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}