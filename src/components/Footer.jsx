import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <section className="bg-[#0f66b7] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
          Ready To Experience Learning
          <br />
          Differently?
        </h2>

        <p className="text-blue-100 mt-6 text-lg">
          Join the platform and start your learning journey today.
        </p>

        <button className="mt-8 inline-flex items-center gap-2 bg-white text-[#0f66b7] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">
          Create Free Account
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}