import { useState, useEffect } from "react";
import {
  Loader2,
  FileText,
  NotebookPen,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Send,
} from "lucide-react";
import { learning } from "../../services/api";

const TABS = [
  { id: "assignments", label: "Assignments", icon: FileText },
  { id: "reflections", label: "Reflections", icon: NotebookPen },
];

export default function Submissions() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviewing, setReviewing] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [reviewStatus, setReviewStatus] = useState("approved");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res =
        activeTab === "assignments"
          ? await learning.getAllAssignments("?status=Pending")
          : await learning.getAllReflections("?status=Pending");
      const data = res.data || res;
setItems(Array.isArray(data) ? data : data?.items || data?.submissions || []);
    } catch (err) {
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleReview = async () => {
    if (!reviewing) return;
    try {
      setSaving(true);
      if (activeTab === "assignments") {
        await learning.reviewAssignment(reviewing.id, {
          status: reviewStatus,
          feedback,
        });
      } else {
        await learning.reviewReflection(reviewing.id, {
          status: reviewStatus,
          feedback,
        });
      }
      setReviewing(null);
      setFeedback("");
      fetchData();
    } catch (err) {
      alert("Failed to submit review: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-amber-50 text-amber-600",
      Reviewed: "bg-blue-50 text-blue-600",
      Approved: "bg-green-50 text-green-600",
      "Needs Revision": "bg-red-50 text-red-600",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[status] || "bg-slate-100 text-slate-500"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0B1F3A]">Submissions</h1>
        <p className="text-slate-500 mt-1">
          Review and grade student assignments and reflections.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl border border-slate-200 p-1 w-fit">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
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

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#0F2D52]" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 rounded-2xl p-5 text-sm">{error}</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <CheckCircle2 size={40} className="mx-auto text-green-300 mb-4" />
          <p className="text-slate-500">
            No pending {activeTab}. All caught up!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Student</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Course</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Lesson</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Date</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Status</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-5 py-4 font-medium text-[#0B1F3A]">
                      {item.studentName || item.student?.fullName || "Unknown"}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {item.courseTitle || item.course?.title || "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {item.lessonTitle || item.lesson?.title || "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {item.submittedAt
                          ? new Date(item.submittedAt).toLocaleDateString()
                          : "—"}
                      </div>
                    </td>
                    <td className="px-5 py-4">{getStatusBadge(item.status)}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          setReviewing(item);
                          setFeedback(item.feedback || "");
                          setReviewStatus(item.status === "Pending" ? "approved" : item.status.toLowerCase());
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F2D52] text-white text-xs font-medium hover:bg-[#1E4A7A] transition"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#0B1F3A]">Review Submission</h2>
              <button
                onClick={() => setReviewing(null)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Student</p>
                <p className="font-medium text-[#0B1F3A]">
                  {reviewing.studentName || reviewing.student?.fullName}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Submission</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {reviewing.content || reviewing.textContent || reviewing.submissionText || "No content provided."}
                </p>
              </div>
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
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Status</label>
                <div className="flex gap-2">
                  {["approved", "needs revision", "reviewed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setReviewStatus(s)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        reviewStatus === s
                          ? "bg-[#0F2D52] text-white border-[#0F2D52]"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {s === "needs revision" ? "Needs Revision" : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] resize-none text-sm"
                  placeholder="Leave feedback for the student..."
                />
              </div>

              <button
                onClick={handleReview}
                disabled={saving}
                className="w-full bg-[#0F2D52] text-white py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {saving ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
