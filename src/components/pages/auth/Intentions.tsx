import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const intentions = [
  "Leadership",
  "Entrepreneurship",
  "Mindset",
  "Wellness",
  "Career Growth",
  "Relationships",
];

export default function Intentions() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

const toggleSelection = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

 const handleSubmit = () => {
  console.log(selected);

  navigate("/dashboard");
};

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAFAF8] px-4 py-10">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#E46F21]/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#124A66]/10 blur-[140px]" />

      <div className="relative w-full max-w-2xl">

        {/* Progress */}

        <div className="mb-10 flex items-center justify-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#124A66]" />

          <div className="h-1 w-12 rounded-full bg-[#124A66]" />

          <div className="h-4 w-4 rounded-full bg-[#124A66]" />
        </div>

        {/* Card */}

        <div className="rounded-4xl border border-gray-200 bg-white p-8 shadow-xl sm:p-10">

          {/* Heading */}

          <div className="text-center">

            <h1 className="font-serif text-3xl font-semibold text-[#124A66] sm:text-5xl">
              Your Intentions
            </h1>

            <p className="mt-4 text-base text-gray-500 sm:text-lg">
              What areas are you focusing on transforming?
            </p>

          </div>

          {/* Tags */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            {intentions.map((item) => (
              <button
                key={item}
                onClick={() => toggleSelection(item)}
                className={`rounded-2xl border px-6 py-4 text-lg font-medium transition-all duration-300 ${
                  selected.includes(item)
                    ? "border-[#124A66] bg-[#124A66] text-white"
                    : "border-gray-200 bg-white text-[#124A66] hover:border-[#124A66]"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
                    {/* Buttons */}

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Back */}

            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex h-14 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white font-semibold text-[#124A66] transition hover:border-[#124A66] hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            {/* Complete Setup */}

            <button
              type="button"
              onClick={handleSubmit}
              className="h-14 rounded-xl bg-[#124A66] text-lg font-semibold text-white transition duration-300 hover:bg-[#0E3B52]"
            >
              Complete Setup
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}