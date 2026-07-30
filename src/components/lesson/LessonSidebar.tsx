import {
  ArrowLeft,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "MODULE 1: THE FOUNDATION",
    lessons: [
      { title: "Welcome & Intentions", completed: true },
      { title: "The Current Reality", completed: true },
    ],
  },
  {
    title: "MODULE 2: INNER ARCHITECTURE",
    lessons: [
      { title: "Identifying Beliefs", completed: true },
      { title: "Cognitive Restructuring", completed: false },
    ],
  },
  {
    title: "MODULE 3: THE PSYCHOLOGY OF CHANGE",
    lessons: [
      {
        title: "Resistance & Flow",
        active: true,
      },
      {
        title: "Integration",
        completed: false,
      },
    ],
  },
];

export default function LessonSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-75 border-r border-gray-200 bg-white xl:block">

      {/* Header */}

      <div className="border-b border-gray-200 px-6 py-5">

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#124A66]"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <h2 className="mt-5 font-serif text-[2rem] font-semibold leading-none text-[#124A66]">
          Life Essence
        </h2>

        <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
          <span>60% Complete</span>
          <span>12/20 Lessons</span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-[60%] rounded-full bg-[#E46F21]" />
        </div>

      </div>

      {/* Modules */}

      <div className="space-y-6 px-6 py-5">

        {modules.map((module) => (
          <div key={module.title}>

            <h3 className="text-[15px] font-bold uppercase tracking-wide leading-6 text-[#124A66]">
              {module.title}
            </h3>

            <div className="mt-3 space-y-1">

              {module.lessons.map((lesson) => {

                if (lesson.active) {
                  return (
                    <div
                      key={lesson.title}
                      className="flex items-center gap-3 rounded-xl bg-[#124A66] px-3 py-3 text-white shadow-md"
                    >
                      <Circle
                        size={16}
                        strokeWidth={2.5}
                        className="text-[#E46F21]"
                      />

                      <span className="text-[15px] font-medium">
                        {lesson.title}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={lesson.title}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50"
                  >
                    {lesson.completed ? (
                      <CheckCircle2
                        size={16}
                        className="text-[#124A66]"
                      />
                    ) : (
                      <Circle
                        size={16}
                        className="text-gray-400"
                      />
                    )}

                    <span
                      className={`text-[15px] font-medium ${
                        lesson.completed
                          ? "text-gray-800"
                          : "text-gray-500"
                      }`}
                    >
                      {lesson.title}
                    </span>

                  </div>
                );

              })}

            </div>

          </div>
        ))}

      </div>

    </aside>
  );
}