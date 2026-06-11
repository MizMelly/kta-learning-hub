import { MessageSquare, Flag, Trash2 } from "lucide-react";

export default function Discussions() {
  const discussions = [
    {
      id: 1,
      initials: "TB",
      student: "Tunde Bello",
      lesson: "Understanding Your Audience",
      message: "Great breakdown — the persona template is gold!",
      date: "2026-05-03",
      flagged: false,
    },
    {
      id: 2,
      initials: "KA",
      student: "Kofi Asante",
      lesson: "Batch Creation & Calendars",
      message: "Does anyone have a recommended scheduling tool?",
      date: "2026-05-05",
      flagged: false,
    },
    {
      id: 3,
      initials: "AU",
      student: "Anon User",
      lesson: "Reading the Right Metrics",
      message: "Buy followers cheap at spammy-link-dot-com!!!",
      date: "2026-05-07",
      flagged: true,
    },
  ];

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Discussion Management
        </h1>

        <p className="mt-2 text-lg text-muted-foreground">
          Moderate lesson comments and remove inappropriate content.
        </p>
      </div>

      {/* Discussions */}
      <div className="space-y-5">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className={`rounded-3xl border p-6 shadow-sm bg-card transition
              ${
                discussion.flagged
                  ? "border-red-200 bg-red-50/30"
                  : "border-border"
              }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left */}
              <div className="flex flex-1 gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-primary">
                  {discussion.initials}
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Top */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold">
                      {discussion.student}
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MessageSquare size={16} />
                      <span>{discussion.lesson}</span>
                    </div>

                    {discussion.flagged && (
                      <div className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                        <Flag size={14} />
                        Flagged
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <p className="mt-3 text-lg">
                    {discussion.message}
                  </p>

                  {/* Date */}
                  <p className="mt-3 text-muted-foreground">
                    {discussion.date}
                  </p>
                </div>
              </div>

              {/* Delete */}
              <button className="text-red-500 transition hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}