import { FileText } from "lucide-react";

export default function LessonContent() {
  return (
    <section className="mx-auto mt-12 max-w-3xl px-6">

      {/* Heading */}

      <h2 className="font-serif text-[30px] font-semibold text-[#124A66]">
        The Anatomy of Resistance
      </h2>

      {/* Intro */}

      <p className="mt-8 text-[18px] leading-9 text-[#6D7E78]">
        When we approach the edge of our current capabilities, our
        psychological immune system kicks in. This is not a sign of
        failure; it is a sign of boundary expansion.
      </p>

      {/* Bullet List */}

      <ul className="mt-10 space-y-6 text-[18px] leading-9 text-[#6D7E78]">

        <li className="flex gap-5">
          <span className="mt-4 h-2 w-2 shrink-0 rounded-full bg-[#D7DCDD]" />
          <span>
            Resistance masquerades as procrastination or confusion.
          </span>
        </li>

        <li className="flex gap-5">
          <span className="mt-4 h-2 w-2 shrink-0 rounded-full bg-[#D7DCDD]" />
          <span>
            Flow requires the right balance of challenge and skill.
          </span>
        </li>

        <li className="flex gap-5">
          <span className="mt-4 h-2 w-2 shrink-0 rounded-full bg-[#D7DCDD]" />
          <span>
            Awareness is the first step to dismantling the barrier.
          </span>
        </li>

      </ul>

      {/* Transcript */}

      <button
        className="
          mt-12
          inline-flex
          items-center
          gap-3
          rounded-xl
          border
          border-gray-200
          bg-white
          px-6
          py-3
          text-[16px]
          font-medium
          text-[#6D7E78]
          shadow-sm
          transition
          hover:border-[#124A66]
          hover:text-[#124A66]
        "
      >
        <FileText size={18} />
        Download Full Transcript PDF
      </button>

      {/* Divider */}

      <div className="mt-14 border-t border-gray-200" />

    </section>
  );
}