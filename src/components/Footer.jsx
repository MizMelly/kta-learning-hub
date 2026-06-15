import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-neutral bg-white">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} KTA-HUB LMS. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>

          <Link to="/register" className="hover:text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
}