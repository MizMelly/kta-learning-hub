import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LessonFooter() {
  const navigate = useNavigate();

  return (
    <section className="mt-16 w-full">
  <div className="w-full border-t border-gray-200 bg-white p-6 shadow-sm lg:p-8">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Previous */}

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-3px-7 py-3 font-semibold text-[#124A66] transition"
          >
            <ArrowLeft size={20} />
            Previous Lesson
          </button>


          {/* Complete */}

          <button
            onClick={() => navigate("/lesson/module-3/lesson-2")}
            className="inline-flex items-center justify-center gap-3 rounded-md bg-[#124A66] px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#0F3E55]"
          >
            Complete & Continue

            <ArrowRight size={20} />
          </button>

        </div>

      </div>

    </section>
  );
}