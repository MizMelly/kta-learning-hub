import {
  Download,
  Mic,
  Play,
  FileText,
} from "lucide-react";

export default function Reflections() {
  const reflections = [
    {
      id: 1,
      student: "Grace Adeyemi",
      lesson: "Understanding Your Audience",
      reflection:
        "This shifted how I think about who I'm creating for.",
      date: "2026-05-02",
      file: "reflection-notes.pdf",
      type: "pdf",
    },
    {
      id: 2,
      student: "Mei Lin",
      lesson: "Designing Scroll-Stopping Posts",
      reflection:
        "Recorded a quick voice note with my thoughts.",
      date: "2026-05-06",
      file: "voice-note-01.m4a",
      type: "audio",
    },
    {
      id: 3,
      student: "Lara Smith",
      lesson: "Scaling with Paid Promotion",
      reflection:
        "I realised I was scared of paid ads — not anymore.",
      date: "2026-05-10",
      type: "text",
    },
  ];

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Reflection Management
        </h1>

        <p className="mt-2 text-muted-foreground text-lg">
          View student reflections, download files and listen to voice notes.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {reflections.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold">
                  {item.student}
                </h3>

                <p className="text-lg text-muted-foreground">
                  {item.lesson}
                </p>
              </div>

              <span className="text-muted-foreground text-lg">
                {item.date}
              </span>
            </div>

            {/* Reflection */}
            <div className="mt-5 rounded-2xl bg-muted px-5 py-4">
              <p className="text-xl italic">
                "{item.reflection}"
              </p>
            </div>

            {/* Footer */}
            <div className="mt-5">
              {item.type === "pdf" && (
                <button className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3 text-lg hover:bg-muted transition-colors">
                  <Download size={18} />
                  {item.file}
                </button>
              )}

              {item.type === "audio" && (
                <div className="space-y-3">
                  <button className="flex items-center gap-3 rounded-2xl bg-amber-100 px-5 py-3 text-lg text-amber-950 hover:bg-amber-200 transition-colors">
                    <Play size={18} />
                    Play voice note
                  </button>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mic size={16} />
                    <span>{item.file}</span>
                  </div>
                </div>
              )}

              {item.type === "text" && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText size={18} />
                  <span>Text reflection only</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}