import { useState, useEffect } from "react";
import {
  Loader2,
  MessageSquare,
  Trash2,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  Send,
  Search,
  X,
} from "lucide-react";
import { discussions, courses } from "../../services/api";

export default function Discussions() {
  const [comments, setComments] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [commentsRes, coursesRes] = await Promise.all([
        discussions.getAll(),
        courses.getAllAdmin(),
      ]);
      const data = commentsRes.data || commentsRes;
      setComments(Array.isArray(data) ? data : data?.items || data?.comments || []);
      const courseData = coursesRes.data || coursesRes;
      setCourseList(Array.isArray(courseData) ? courseData : courseData?.items || []);
    } catch (err) {
      setError(err.message || "Failed to load discussions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FIX: Filter using correct backend field names
  const filteredComments = comments.filter((c) => {
    const text = c.content || c.text || "";
    const name = c.userName || c.studentName || c.user?.fullName || "";
    const matchesSearch =
      text.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (id) => {
    if (!confirm("Delete this comment permanently?")) return;
    try {
      await discussions.deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  const handleToggleHide = async (comment) => {
    try {
      await discussions.toggleHide(comment.id);
      setComments((prev) =>
        prev.map((c) =>
          c.id === comment.id ? { ...c, isHidden: !c.isHidden } : c
        )
      );
    } catch (err) {
      alert("Failed to toggle visibility: " + err.message);
    }
  };

  const handleTogglePin = async (comment) => {
    try {
      await discussions.togglePin(comment.id);
      setComments((prev) =>
        prev.map((c) =>
          c.id === comment.id ? { ...c, isPinned: !c.isPinned } : c
        )
      );
    } catch (err) {
      alert("Failed to toggle pin: " + err.message);
    }
  };

  // FIX: Use PascalCase field names matching backend DTO
  const handleReply = async () => {
    if (!replyText.trim() || !replyingTo) return;
    try {
      setSaving(true);
      await discussions.postComment({
        LessonId: replyingTo.lessonId || replyingTo.lesson?.id,
        Content: replyText,           // ← FIX: was "text", now "Content"
        ParentCommentId: replyingTo.id,
      });
      setReplyText("");
      setReplyingTo(null);
      fetchData();
    } catch (err) {
      alert("Failed to reply: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0B1F3A]">Discussions</h1>
        <p className="text-slate-500 mt-1">
          Moderate student comments and replies across all lessons.
        </p>
      </div>

      {/* Search only — course filter removed since CommentResponse has no CourseId */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search comments or student names..."
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] text-sm"
          />
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#0F2D52]" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 rounded-2xl p-5 text-sm">{error}</div>
      ) : filteredComments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <MessageSquare size={40} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">No comments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`bg-white rounded-2xl border p-5 transition ${
                comment.isHidden
                  ? "border-slate-200 opacity-60"
                  : comment.isPinned
                  ? "border-[#E79B23] ring-1 ring-[#E79B23]/20"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-full bg-[#0F2D52] text-white flex items-center justify-center font-semibold text-sm">
                      {(comment.userName || comment.studentName || comment.user?.fullName || "?")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div>
                      {/* FIX: Use userName from backend CommentResponse */}
                      <p className="font-medium text-[#0B1F3A] text-sm">
                        {comment.userName || comment.studentName || comment.user?.fullName || "Unknown"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {comment.lessonTitle || comment.lesson?.title || "—"} ·{" "}
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                    {comment.isPinned && (
                      <span className="px-2 py-0.5 rounded-full bg-[#E79B23]/10 text-[#E79B23] text-xs font-semibold flex items-center gap-1">
                        <Pin size={12} />
                        Pinned
                      </span>
                    )}
                    {comment.isHidden && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">
                        Hidden
                      </span>
                    )}
                  </div>
                  {/* FIX: Use content from backend CommentResponse */}
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {comment.content || comment.text}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleTogglePin(comment)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    comment.isPinned
                      ? "bg-[#E79B23]/10 text-[#E79B23]"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {comment.isPinned ? <PinOff size={14} /> : <Pin size={14} />}
                  {comment.isPinned ? "Unpin" : "Pin"}
                </button>
                <button
                  onClick={() => handleToggleHide(comment)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    comment.isHidden
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {comment.isHidden ? <Eye size={14} /> : <EyeOff size={14} />}
                  {comment.isHidden ? "Show" : "Hide"}
                </button>
                <button
                  onClick={() => setReplyingTo(comment)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-500 hover:bg-slate-100 transition"
                >
                  <MessageSquare size={14} />
                  Reply
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition ml-auto"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-3 pl-6 border-l-2 border-slate-100">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-7 w-7 rounded-full bg-[#0F2D52] text-white flex items-center justify-center font-semibold text-xs">
                          {(reply.userName || reply.studentName || reply.user?.fullName || "?")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        <p className="text-xs font-medium text-[#0B1F3A]">
                          {reply.userName || reply.studentName || reply.user?.fullName || "Unknown"}
                        </p>
                        <span className="text-xs text-slate-400">
                          {reply.createdAt
                            ? new Date(reply.createdAt).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>
                      {/* FIX: Use content from backend */}
                      <p className="text-sm text-slate-600">{reply.content || reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {replyingTo && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0B1F3A]">Reply as Admin</h3>
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setReplyText("");
                }}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Replying to{" "}
              <span className="font-medium text-[#0B1F3A]">
                {replyingTo.userName || replyingTo.studentName || replyingTo.user?.fullName}
              </span>
            </p>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] resize-none text-sm mb-4"
              placeholder="Write your reply..."
            />
            <button
              onClick={handleReply}
              disabled={saving || !replyText.trim()}
              className="w-full bg-[#0F2D52] text-white py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {saving ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}