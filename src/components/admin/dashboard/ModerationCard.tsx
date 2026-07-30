import { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import {
  discussions,
  type DiscussionComment,
} from "../../../services/api";

export default function ModerationCard() {
  const [flaggedComments, setFlaggedComments] = useState<DiscussionComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const all: DiscussionComment[] = await discussions.getAll("?pageSize=5");

        const flagged = all
          .filter(
            (c: DiscussionComment) =>
              c.isHidden ||
              c.isFlagged ||
              (c.reports ?? 0) > 0
          )
          .slice(0, 2);

        setFlaggedComments(flagged);
      } catch (err) {
        console.error("Failed to load discussions:", err);
        setFlaggedComments([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchComments();
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
          <Loader2
            className="animate-spin text-[#0F66B7]"
            size={24}
          />
        </div>
      ) : flaggedComments.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">
          No flagged comments. All clear!
        </p>
      ) : (
        flaggedComments.map((comment: DiscussionComment) => (
          <div
            key={comment.id}
            className="mb-3 rounded-2xl border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm font-medium text-red-900">
              {comment.content ?? comment.text ?? "Flagged comment"}
            </p>

            <p className="mt-1 text-sm text-red-600">
              {comment.studentName ??
                comment.user?.fullName ??
                "Unknown"}
              {" • "}
              {comment.lessonTitle ??
                comment.lesson?.title ??
                "Unknown Lesson"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}