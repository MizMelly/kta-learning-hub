import { Link } from "react-router-dom";

export default function Register() {
  return (
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
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:bg-[#0a376a]"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-[#0a376a] transition"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}