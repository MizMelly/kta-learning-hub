import { useState } from "react";
import { Star } from "lucide-react";

export default function LessonRating() {
  const [rating, setRating] = useState(4);

  return (
    <section className="mx-auto mt-16 max-w-4xl px-6">

      <div className="rounded-4xl border border-gray-200 bg-white p-8 shadow-sm lg:p-10">

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E46F21]">
          Lesson Feedback
        </p>

        <h2 className="mt-3 font-serif text-4xl text-[#124A66]">
          How was this lesson?
        </h2>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          Your feedback helps us improve future learning experiences.
        </p>

        {/* Stars */}

        <div className="mt-10 flex flex-wrap items-center gap-4">

          {[1, 2, 3, 4, 5].map((star) => (

            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition hover:scale-110"
            >
              <Star
                size={42}
                strokeWidth={1.8}
                fill={star <= rating ? "#E46F21" : "transparent"}
                className={
                  star <= rating
                    ? "text-[#E46F21]"
                    : "text-gray-300"
                }
              />
            </button>

          ))}

        </div>

        <textarea
          rows={4}
          placeholder="Tell us what you enjoyed or what could be improved..."
          className="mt-8 w-full rounded-3xl border border-gray-200 bg-[#FAFAF8] p-5 outline-none transition focus:border-[#124A66]"
        />

        <button className="mt-8 rounded-full bg-[#124A66] px-8 py-3 font-semibold text-white transition hover:bg-[#0E3D53]">
          Submit Feedback
        </button>

      </div>

    </section>
  );
}