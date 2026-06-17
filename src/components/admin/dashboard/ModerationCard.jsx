import { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { discussions } from "../../../services/api";

export default function ModerationCard() {
  const [flaggedComments, setFlaggedComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await discussions.getAll("?pageSize=5");
        const all = res.data?.items || res.data || res || [];
        // Filter for comments that might need moderation (hidden or with reports)
        const flagged = all.filter(c => c.isHidden || c.isFlagged || c.reports > 0).slice(0, 2);
        setFlaggedComments(flagged);
      } catch (err) {
        console.error("Failed to load discussions:", err);
        setFlaggedComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#0B1F3A]">
          Needs Moderation
        </h2>
        <button className="flex items-center gap-1 text-[#0F66B7] font-medium text-sm hover:underline">
          Discussions
          <ArrowUpRight size={18} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="animate-spin text-[#0F66B7]" size={24} />
        </div>
      ) : flaggedComments.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">No flagged comments. All clear!</p>
      ) : (
        flaggedComments.map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-red-200 bg-red-50 p-4 mb-3">
            <p className="font-medium text-red-900 text-sm">
              {comment.text || comment.content || "Flagged comment"}
            </p>
            <p className="mt-1 text-sm text-red-600">
              {comment.studentName || comment.user?.fullName || "Unknown"} • {comment.lessonTitle || "Unknown Lesson"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
