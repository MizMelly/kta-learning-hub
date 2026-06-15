import { Link } from "react-router-dom";


export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-muted-foreground">
            Join KTA Hub today
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-3 text-primary-foreground font-medium hover:opacity-90"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}