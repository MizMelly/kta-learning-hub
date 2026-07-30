import { useState, useEffect } from "react";
import {
  Loader2,
  FileText,
  NotebookPen,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Send,
} from "lucide-react";

interface Student {
  fullName?: string;
}

interface Course {
  title?: string;
}

interface Lesson {
  title?: string;
}

type AssignmentStatus =
  | "Pending"
  | "Approved"
  | "NeedsRevision"
  | "Rejected";

interface Submission {
  id: string | number;
  studentName?: string;
  student?: Student;
  courseName?: string;
  course?: Course;
  lessonTitle?: string;
  lesson?: Lesson;
  submittedAt?: string;
  status?: AssignmentStatus;
  isReviewed?: boolean;
  feedback?: string;
  adminComment?: string;
  textSubmission?: string;
  textContent?: string;
  content?: string;
  documentUrl?: string;
  fileUrl?: string;
}

const TABS = [
  { id: "assignments", label: "Assignments", icon: FileText },
  { id: "reflections", label: "Reflections", icon: NotebookPen },
];

const ASSIGNMENT_STATUSES = [
  { value: "Approved", label: "Approved" },
  { value: "NeedsRevision", label: "Needs Revision" },
];

export default function Submissions() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [reviewing, setReviewing] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState("");
  const [reviewStatus, setReviewStatus] =
    useState<AssignmentStatus>("Approved");
  const [saving, setSaving] = useState(false);

const fetchData = async (): Promise<void> => {
  try {
    setLoading(true);
    setError(null);

    // Temporary until backend is connected
    setItems([]);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to load submissions";

    setError(message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const loadData = async () => {
    await fetchData();
  };

  loadData();
}, []);

  const handleReview = async () => {
    if (!reviewing) return;

    try {
      setSaving(true);

      setReviewing(null);
      setFeedback("");

      await fetchData();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to submit review";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (
    status: AssignmentStatus | boolean | undefined,
    isReflection = false
  ) => {
    if (isReflection) {
     const isReviewed = status === true;

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isReviewed
              ? "bg-blue-50 text-blue-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {isReviewed ? "Reviewed" : "Pending"}
        </span>
      );
    }

    const styles: Record<string, string> = {
      Pending: "bg-amber-50 text-amber-600",
      Approved: "bg-green-50 text-green-600",
      NeedsRevision: "bg-red-50 text-red-600",
      Rejected: "bg-red-50 text-red-600",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[String(status)] ||
          "bg-slate-100 text-slate-500"
        }`}
      >
        {status === "NeedsRevision"
          ? "Needs Revision"
          : String(status)}
      </span>
    );
  };

  const isReflectionTab =
    activeTab === "reflections";

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0B1F3A]">
          Submissions
        </h1>

        <p className="mt-1 text-slate-500">
          Review and grade student assignments and
          reflections.
        </p>
      </div>

      <div className="flex w-fit rounded-xl border border-slate-200 bg-white p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#0F2D52] text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2
            className="animate-spin text-[#0F2D52]"
            size={32}
          />
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <CheckCircle2
            size={40}
            className="mx-auto mb-4 text-green-300"
          />

          <p className="text-slate-500">
            No pending {activeTab}. All caught up!
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-3.5 text-left font-semibold text-slate-600">
                    Student
                  </th>

                  <th className="px-5 py-3.5 text-left font-semibold text-slate-600">
                    Course
                  </th>

                  <th className="px-5 py-3.5 text-left font-semibold text-slate-600">
                    Lesson
                  </th>

                  <th className="px-5 py-3.5 text-left font-semibold text-slate-600">
                    Date
                  </th>

                  <th className="px-5 py-3.5 text-left font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50/50"
                  >
                    <td className="px-5 py-4 font-medium text-[#0B1F3A]">
                      {item.studentName ??
                        item.student?.fullName ??
                        "Unknown"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.courseName ??
                        item.course?.title ??
                        "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.lessonTitle ??
                        item.lesson?.title ??
                        "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {item.submittedAt
                          ? new Date(
                              item.submittedAt
                            ).toLocaleDateString()
                          : "—"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {getStatusBadge(
                        isReflectionTab
                          ? item.isReviewed
                          : item.status,
                        isReflectionTab
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          setReviewing(item);
                          setFeedback(
                            item.feedback ??
                              item.adminComment ??
                              ""
                          );

                          if (!isReflectionTab) {
                            setReviewStatus(
                              item.status === "Pending"
                                ? "Approved"
                                : item.status ??
                                    "Approved"
                            );
                          }
                        }}
                        className="flex items-center gap-1.5 rounded-xl bg-[#0F2D52] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#1E4A7A]"
                      >
                        <Eye size={14} />
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B1F3A]">
                Review{" "}
                {isReflectionTab
                  ? "Reflection"
                  : "Assignment"}
              </h2>

              <button
                onClick={() => setReviewing(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="mb-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase text-slate-400">
                  Student
                </p>

                <p className="font-medium text-[#0B1F3A]">
                  {reviewing.studentName ??
                    reviewing.student?.fullName}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase text-slate-400">
                  Submission
                </p>

                <p className="whitespace-pre-wrap text-sm text-slate-700">
                  {reviewing.textSubmission ??
                    reviewing.textContent ??
                    reviewing.content ??
                    "No content provided."}
                </p>
              </div>

              {reviewing.documentUrl && (
                <a
                  href={reviewing.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#0F2D52] hover:underline"
                >
                  <FileText size={16} />
                  View attached document
                </a>
              )}

              {reviewing.fileUrl && (
                <a
                  href={reviewing.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#0F2D52] hover:underline"
                >
                  <FileText size={16} />
                  View attached file
                </a>
              )}
            </div>

            <div className="space-y-4">
              {!isReflectionTab && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Status
                  </label>

                  <div className="flex gap-2">
                    {ASSIGNMENT_STATUSES.map((status) => (
                      <button
                        key={status.value}
                        onClick={() =>
                          setReviewStatus(
                            status.value as AssignmentStatus
                          )
                        }
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                          reviewStatus === status.value
                            ? "border-[#0F2D52] bg-[#0F2D52] text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  {isReflectionTab
                    ? "Admin Comment"
                    : "Feedback"}
                </label>

                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) =>
                    setFeedback(e.target.value)
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2D52]"
                  placeholder={
                    isReflectionTab
                      ? "Leave a comment for the student..."
                      : "Leave feedback for the student..."
                  }
                />
              </div>

              <button
                onClick={handleReview}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F2D52] py-3 font-semibold text-white transition hover:bg-[#1E4A7A] disabled:opacity-50"
              >
                {saving ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={18} />
                )}

                {saving
                  ? "Submitting..."
                  : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}