import { Check, FileText } from "lucide-react";

export default function Submissions() {
  const submissions = [
    {
      id: 1,
      student: "Grace Adeyemi",
      assignment: "Understanding Your Audience",
      course: "Social Media Management Masterclass",
      excerpt:
        "I mapped three audience personas based on the framework...",
      file: "audience-personas.pdf",
      date: "2026-05-02",
      status: "pending",
    },
    {
      id: 2,
      student: "Tunde Bello",
      assignment: "Building a Content Pillar System",
      course: "Social Media Management Masterclass",
      excerpt:
        "My four content pillars are education, behind-the-scenes...",
      file: "content-pillars.docx",
      date: "2026-05-04",
      status: "reviewed",
    },
    {
      id: 3,
      student: "Lara Smith",
      assignment: "Reading the Right Metrics",
      course: "Social Media Management Masterclass",
      excerpt:
        "Attached is my analytics breakdown for the last 30 days.",
      file: "metrics-report.pdf",
      date: "2026-05-09",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Assignment Submissions</h1>
        <p className="mt-2 text-muted-foreground">
          Review assignments submitted by students.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white">
          All
        </button>

        <button className="rounded-full bg-muted px-5 py-2 text-sm font-medium">
          Pending
        </button>

        <button className="rounded-full bg-muted px-5 py-2 text-sm font-medium">
          Reviewed
        </button>
      </div>

      {/* Submission Cards */}
      <div className="space-y-5">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            {/* Top */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold">
                  {submission.student}
                </h3>

                <p className="text-lg text-muted-foreground">
                  {submission.assignment} • {submission.course}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-4 py-1 text-sm font-medium ${
                  submission.status === "reviewed"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {submission.status}
              </span>
            </div>

            {/* Excerpt */}
            <div className="mt-5 rounded-2xl bg-muted p-5 text-base">
              {submission.excerpt}
            </div>

            {/* Bottom */}
            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <button className="flex w-fit items-center gap-2 rounded-xl border border-border px-4 py-3 text-base hover:bg-muted">
                <FileText size={18} />
                {submission.file}
              </button>

              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {submission.date}
                </span>

                {submission.status === "pending" && (
                  <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground hover:opacity-90">
                    <Check size={18} />
                    Mark Reviewed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}