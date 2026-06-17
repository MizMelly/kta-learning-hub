import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lessons, courses, learning, discussions, files } from "../../services/api";
import apiRequest from "../../services/api";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Menu,
  X,
  Star,
  MessageCircle,
  Paperclip,
  Mic,
  FileText,
  Send,
  BookOpen,
  Clock,
  Loader2,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-7 h-7 rounded-full bg-[#0F2D52] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        {number}
      </span>
      <h3 className="text-base font-bold text-[#0B1F3A]">{title}</h3>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-4 ${className}`}>
      {children}
    </div>
  );
}

// ─── Section: Video ────────────────────────────────────────────────────────────
function VideoSection({ videoUrl, title, duration }) {
  if (!videoUrl) {
    return (
      <Card className="p-0 overflow-hidden">
        <div className="p-5 pb-0">
          <SectionHeader number="1" title="Video Lesson" />
        </div>
        <div className="mx-5 mb-5 bg-slate-100 rounded-xl aspect-video flex items-center justify-center">
          <p className="text-slate-400 text-sm">No video uploaded yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-5 pb-0">
        <SectionHeader number="1" title="Video Lesson" />
      </div>
      <div className="mx-5 mb-5 rounded-xl overflow-hidden aspect-video bg-black">
        <video
          src={videoUrl}
          controls
          className="w-full h-full"
          poster=""
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="text-[11px] text-gray-400 px-5 pb-5 text-center">{title} · {duration}</p>
    </Card>
  );
}

// ─── Section: Lesson Notes ─────────────────────────────────────────────────────
function NotesSection({ notes }) {
  if (!notes) {
    return (
      <Card>
        <SectionHeader number="2" title="Lesson Notes" />
        <p className="text-slate-400 text-sm">No notes available for this lesson.</p>
      </Card>
    );
  }

  const renderNotes = (text) => {
    const lines = text.trim().split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## "))
        return <h2 key={i} className="text-lg font-bold text-[#0B1F3A] mt-5 mb-2 first:mt-0">{line.replace("## ", "")}</h2>;
      if (line.startsWith("### "))
        return <h3 key={i} className="text-sm font-bold text-[#0B1F3A] mt-3 mb-1.5">{line.replace("### ", "")}</h3>;
      if (line.startsWith("> "))
        return (
          <blockquote key={i} className="border-l-3 border-[#E79B23] bg-amber-50 pl-3 pr-2 py-1.5 my-2 rounded-r-lg text-gray-600 text-sm italic">
            {line.replace("> ", "")}
          </blockquote>
        );
      if (line.startsWith("- "))
        return (
          <li key={i} className="ml-4 text-gray-600 text-sm mb-1 list-disc">
            {line.replace("- ", "").split(/\*\*(.*?)\*\*/).map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="text-[#0B1F3A] font-semibold">{part}</strong> : part
            )}
          </li>
        );
      if (line.match(/^\d+\. /))
        return <li key={i} className="ml-4 text-gray-600 text-sm mb-1 list-decimal">{line.replace(/^\d+\. /, "")}</li>;
      if (line.startsWith("**") && line.endsWith("**"))
        return <p key={i} className="font-bold text-[#0B1F3A] text-sm mt-3 mb-1">{line.replace(/\*\*/g, "")}</p>;
      if (line.trim() === "") return <div key={i} className="h-1.5" />;
      return (
        <p key={i} className="text-gray-600 text-sm leading-relaxed">
          {line.split(/\*\*(.*?)\*\*/).map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-[#0B1F3A] font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <Card>
      <SectionHeader number="2" title="Lesson Notes" />
      <div className="space-y-0.5">{renderNotes(notes)}</div>
    </Card>
  );
}

// ─── Section: Audio ────────────────────────────────────────────────────────────
function AudioSection({ audioUrl }) {
  if (!audioUrl) {
    return (
      <Card>
        <SectionHeader number="3" title="Audio Version" />
        <p className="text-slate-400 text-sm">No audio uploaded yet</p>
      </Card>
    );
  }

  return (
    <Card>
      <SectionHeader number="3" title="Audio Version" />
      <p className="text-gray-500 text-xs mb-3">Listen to this lesson on the go.</p>
      <audio src={audioUrl} controls className="w-full" />
    </Card>
  );
}

// ─── Section: Assignment ───────────────────────────────────────────────────────
function AssignmentSection({ lessonId, assignmentConfig }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  if (!assignmentConfig?.enabled) {
    return (
      <Card>
        <SectionHeader number="4" title="Assignment" />
        <p className="text-slate-400 text-sm">No assignment for this lesson.</p>
      </Card>
    );
  }

  const handleSubmit = async () => {
    if (!text.trim() && !file) return;
    try {
      setSubmitting(true);
      let fileUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await apiRequest("/files/upload/document", {
          method: "POST",
          body: formData,
          headers: {},
        });
        fileUrl = uploadRes.data?.url || uploadRes.url || uploadRes.data;
      }
      await learning.submitAssignment({
        lessonId,
        textContent: text,
        fileUrl,
      });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <SectionHeader number="4" title="Assignment" />
      {submitted ? (
        <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
          <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500" />
          <p className="font-bold text-green-700 text-sm">Assignment Submitted!</p>
          <p className="text-xs text-gray-500 mt-0.5">Your instructor will review this shortly.</p>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 rounded-xl p-3.5 mb-4 text-xs text-blue-700 leading-relaxed border border-blue-100">
            <span className="font-semibold">Instructions: </span>{assignmentConfig.instructions || "Complete the assignment for this lesson."}
          </div>
          <div className="space-y-3">
            {(assignmentConfig.submissionType === "text" || assignmentConfig.submissionType === "both") && (
              <div>
                <label className="block text-xs font-semibold text-[#0B1F3A] mb-1.5">Your Response</label>
                <textarea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your assignment response here..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-1 focus:ring-[#0F2D52]/10 resize-none transition"
                />
              </div>
            )}
            {(assignmentConfig.submissionType === "document" || assignmentConfig.submissionType === "both") && (
              <div>
                <label className="block text-xs font-semibold text-[#0B1F3A] mb-1.5">Upload Document</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-3.5 cursor-pointer hover:border-[#0F2D52] hover:bg-slate-50 transition-colors"
                >
                  <Paperclip size={16} className="text-gray-400" />
                  <span className="text-xs text-gray-500 truncate">{file ? file.name : "Click to attach a file"}</span>
                </label>
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting || (!text.trim() && !file)}
              className="bg-[#0F2D52] text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {submitting ? "Submitting..." : "Submit Assignment"}
            </button>
          </div>
        </>
      )}
    </Card>
  );
}

// ─── Section: Reflection ───────────────────────────────────────────────────────
function ReflectionSection({ lessonId, reflectionConfig }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [voice, setVoice] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const voiceInputRef = useRef(null);

  if (!reflectionConfig?.enabled) {
    return (
      <Card>
        <SectionHeader number="5" title="Reflection" />
        <p className="text-slate-400 text-sm">No reflection required for this lesson.</p>
      </Card>
    );
  }

  const handleSubmit = async () => {
    if (!text.trim() && !file && !voice) return;
    try {
      setSubmitting(true);
      let fileUrl = null;
      let voiceUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await apiRequest("/files/upload/document", {
          method: "POST",
          body: formData,
          headers: {},
        });
        fileUrl = uploadRes.data?.url || uploadRes.url || uploadRes.data;
      }
      if (voice) {
        const formData = new FormData();
        formData.append("file", voice);
        const uploadRes = await apiRequest("/files/upload/audio", {
          method: "POST",
          body: formData,
          headers: {},
        });
        voiceUrl = uploadRes.data?.url || uploadRes.url || uploadRes.data;
      }
      await learning.submitReflection({
        lessonId,
        textContent: text,
        fileUrl,
        voiceUrl,
      });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <SectionHeader number="5" title="Reflection" />
      {submitted ? (
        <div className="bg-amber-50 rounded-xl p-6 text-center border border-amber-100">
          <MessageCircle size={32} className="mx-auto mb-2 text-amber-500" />
          <p className="font-bold text-amber-700 text-sm">Reflection Submitted!</p>
          <p className="text-xs text-gray-500 mt-0.5">Thank you for taking time to reflect.</p>
        </div>
      ) : (
        <>
          <div className="bg-amber-50 rounded-xl p-3.5 mb-4 text-xs text-amber-800 leading-relaxed border border-amber-100 italic">
            {reflectionConfig.prompt || "What is the most important insight you gained from this lesson?"}
          </div>
          <div className="space-y-3">
            {reflectionConfig.allowText && (
              <div>
                <label className="block text-xs font-semibold text-[#0B1F3A] mb-1.5">Written Reflection</label>
                <textarea
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-1 focus:ring-[#0F2D52]/10 resize-none transition"
                />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reflectionConfig.allowVoice && (
                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3A] mb-1.5">Voice Note</label>
                  <input
                    type="file"
                    accept="audio/*"
                    ref={voiceInputRef}
                    className="hidden"
                    onChange={(e) => setVoice(e.target.files[0])}
                  />
                  <label
                    onClick={() => voiceInputRef.current?.click()}
                    className="flex items-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-3 cursor-pointer hover:border-[#0F2D52] hover:bg-slate-50 transition-colors"
                  >
                    <Mic size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500 truncate">{voice ? voice.name : "Upload voice note"}</span>
                  </label>
                </div>
              )}
              {reflectionConfig.allowDocument && (
                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3A] mb-1.5">Document</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-3 cursor-pointer hover:border-[#0F2D52] hover:bg-slate-50 transition-colors"
                  >
                    <FileText size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500 truncate">{file ? file.name : "Upload document"}</span>
                  </label>
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting || (!text.trim() && !file && !voice)}
              className="bg-[#0F2D52] text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {submitting ? "Submitting..." : "Submit Reflection"}
            </button>
          </div>
        </>
      )}
    </Card>
  );
}

// ─── Section: Discussion ───────────────────────────────────────────────────────
function DiscussionSection({ lessonId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await discussions.getByLesson(lessonId);
      const data = res.data || res;
      setComments(Array.isArray(data) ? data : data?.items || data?.comments || []);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [lessonId]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      await discussions.postComment({
        lessonId,
        text: newComment,
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      alert("Failed to post comment: " + err.message);
    }
  };

  const addReply = async (commentId) => {
    if (!replyText.trim()) return;
    try {
      await discussions.postComment({
        lessonId,
        text: replyText,
        parentCommentId: commentId,
      });
      setReplyText("");
      setReplyingTo(null);
      fetchComments();
    } catch (err) {
      alert("Failed to reply: " + err.message);
    }
  };

  const formatTime = (iso) =>
    iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";

  return (
    <Card>
      <SectionHeader number="6" title="Community Discussion" />
      <p className="text-gray-400 text-xs mb-4">{comments.length} comment{comments.length !== 1 ? "s" : ""}</p>

      <div className="flex gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#0F2D52] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">H</div>
        <div className="flex-1">
          <textarea
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share a thought..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-1 focus:ring-[#0F2D52]/10 resize-none transition"
          />
          <button
            onClick={addComment}
            disabled={!newComment.trim()}
            className="mt-2 bg-[#0F2D52] text-white rounded-xl px-5 py-2 text-xs font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-40 shadow-sm"
          >
            Post Comment
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-[#0F2D52]" size={24} />
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E79B23] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {(comment.studentName || comment.user?.fullName || "?").charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-xs text-[#0B1F3A]">
                      {comment.studentName || comment.user?.fullName || "Unknown"}
                    </span>
                    <span className="text-[10px] text-gray-400">{formatTime(comment.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{comment.text || comment.content}</p>
                </div>
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="text-[11px] text-[#0F2D52] mt-1.5 ml-1 hover:underline font-medium"
                >
                  Reply
                </button>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-2 ml-3 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#0F2D52] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {(reply.studentName || reply.user?.fullName || "?").charAt(0)}
                        </div>
                        <div className="bg-white rounded-xl px-3 py-2 border border-slate-100 flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="font-semibold text-[11px] text-[#0B1F3A]">
                              {reply.studentName || reply.user?.fullName || "Unknown"}
                            </span>
                            <span className="text-[10px] text-gray-400">{formatTime(reply.createdAt)}</span>
                          </div>
                          <p className="text-xs text-gray-600">{reply.text || reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {replyingTo === comment.id && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0F2D52] transition"
                    />
                    <button
                      onClick={() => addReply(comment.id)}
                      className="bg-[#0F2D52] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#1E4A7A] transition"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// ─── Section: Rating ───────────────────────────────────────────────────────────
function RatingSection({ lessonId, existingRating }) {
  const [selected, setSelected] = useState(existingRating || 0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(!!existingRating);
  const [submitting, setSubmitting] = useState(false);
  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleSubmit = async () => {
    if (!selected) return;
    try {
      setSubmitting(true);
      await learning.submitRating({
        lessonId,
        rating: selected,
        feedback,
      });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit rating: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <SectionHeader number="7" title="Rate This Lesson" />
      {submitted ? (
        <div className="text-center py-4">
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={24} className={s <= selected ? "text-[#E79B23] fill-[#E79B23]" : "text-gray-200"} />
            ))}
          </div>
          <p className="font-bold text-[#0B1F3A] text-sm">You rated this lesson {selected} star{selected !== 1 ? "s" : ""}</p>
          <p className="text-xs text-gray-500 mt-0.5">{labels[selected]} — thank you!</p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-xs mb-3">How helpful was this lesson?</p>
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelected(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  className={star <= (hovered || selected) ? "text-[#E79B23] fill-[#E79B23]" : "text-gray-200"}
                />
              </button>
            ))}
          </div>
          {(hovered || selected) > 0 && (
            <p className="text-xs text-[#E79B23] font-semibold mb-3">{labels[hovered || selected]}</p>
          )}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-[#0B1F3A] mb-1.5">Additional Feedback (optional)</label>
            <textarea
              rows={2}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you liked..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-1 focus:ring-[#0F2D52]/10 resize-none transition"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || !selected}
            className="bg-[#E79B23] text-white rounded-xl px-6 py-2.5 text-sm font-bold hover:bg-[#C87E08] transition-colors disabled:opacity-40 shadow-sm flex items-center gap-2"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
            {submitting ? "Submitting..." : "Submit Rating"}
          </button>
        </>
      )}
    </Card>
  );
}

// ─── Mobile Sidebar ────────────────────────────────────────────────────────────
function MobileSidebar({ course, courseId, lessonId, navigate, onClose }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-72 bg-[#0F2D52] flex flex-col h-full overflow-y-auto flex-shrink-0">
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <button
            onClick={() => navigate("/student/courses")}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors"
          >
            <ChevronLeft size={14} /> Back
          </button>
          <button onClick={onClose} className="text-white/50 hover:text-white lg:hidden">
            <X size={18} />
          </button>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E79B23] flex items-center justify-center flex-shrink-0">
              <BookOpen size={14} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/40 text-[10px]">KTA Hub</p>
              <p className="text-white text-xs font-semibold leading-tight truncate">{course.title}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-2 py-2 overflow-y-auto">
          {course.modules?.map((mod) => (
            <div key={mod.id} className="mb-3">
              <p className="text-white/30 text-[10px] font-semibold uppercase tracking-wider px-3 mb-1">
                {mod.title}
              </p>
              {mod.lessons?.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    navigate(`/student/courses/${courseId}/lessons/${l.id}`);
                    onClose();
                  }}
                  className={`w-full text-left flex items-start gap-2 px-3 py-2 rounded-lg mb-0.5 transition-all text-xs ${
                    l.id === lessonId
                      ? "bg-[#E79B23] text-white font-semibold"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="mt-0.5 flex-shrink-0">
                    {l.completed ? (
                      <CheckCircle2 size={12} className="text-green-400" />
                    ) : l.id === lessonId ? (
                      <Play size={12} fill="white" />
                    ) : (
                      <Circle size={12} />
                    )}
                  </span>
                  <span className="leading-snug">{l.title}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex justify-between text-[10px] text-white/40 mb-1.5">
            <span>Course Progress</span>
            <span>{course.progressPercentage || 0}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-[#E79B23] h-1.5 rounded-full" style={{ width: `${course.progressPercentage || 0}%` }} />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black/50" onClick={onClose} />
    </div>
  );
}

// ─── Main Lesson Page ──────────────────────────────────────────────────────────
export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marked, setMarked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const [lessonRes, courseRes] = await Promise.all([
        lessons.getStudentLesson(lessonId),
        courses.getById(courseId),
      ]);
      setLesson(lessonRes.data || lessonRes);
      setCourse(courseRes.data || courseRes);
    } catch (err) {
      setError(err.message || "Failed to load lesson");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonId, courseId]);

  const handleMarkComplete = async () => {
    try {
      await learning.complete(lessonId, { step: "lesson" });
      setMarked(true);
    } catch (err) {
      alert("Failed to mark complete: " + err.message);
    }
  };

  const allLessons = [];
  if (course?.modules) {
    course.modules.forEach((mod) => {
      if (mod.lessons) allLessons.push(...mod.lessons);
    });
  }
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];
  const isCompleted = lesson?.completed || marked;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <Loader2 className="animate-spin text-[#0F2D52]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchLesson}
            className="bg-[#0F2D52] text-white px-6 py-2 rounded-xl text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <p className="text-gray-400 text-sm">Lesson not found.</p>
      </div>
    );
  }

  const currentModule = course?.modules?.find((m) =>
    m.lessons?.some((l) => l.id === lessonId)
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {sidebarOpen && (
        <MobileSidebar
          course={course}
          courseId={courseId}
          lessonId={lessonId}
          navigate={navigate}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0F2D52] flex-col h-full overflow-y-auto flex-shrink-0">
        <div className="px-4 py-4 border-b border-white/10">
          <button
            onClick={() => navigate("/student/courses")}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs mb-3 transition-colors"
          >
            <ChevronLeft size={14} /> Back to My Courses
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E79B23] flex items-center justify-center flex-shrink-0">
              <BookOpen size={14} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/40 text-[10px]">KTA Hub</p>
              <p className="text-white text-xs font-semibold leading-tight truncate">{course?.title}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-2 py-3 overflow-y-auto">
          {course?.modules?.map((mod) => (
            <div key={mod.id} className="mb-4">
              <p className="text-white/30 text-[10px] font-semibold uppercase tracking-wider px-3 mb-1.5">
                {mod.title}
              </p>
              {mod.lessons?.map((l) => (
                <button
                  key={l.id}
                  onClick={() => navigate(`/student/courses/${courseId}/lessons/${l.id}`)}
                  className={`w-full text-left flex items-start gap-2 px-3 py-2 rounded-lg mb-0.5 transition-all text-xs ${
                    l.id === lessonId
                      ? "bg-[#E79B23] text-white font-semibold"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="mt-0.5 flex-shrink-0">
                    {l.completed ? (
                      <CheckCircle2 size={12} className="text-green-400" />
                    ) : l.id === lessonId ? (
                      <Play size={12} fill="white" />
                    ) : (
                      <Circle size={12} />
                    )}
                  </span>
                  <span className="leading-snug">{l.title}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex justify-between text-[10px] text-white/40 mb-1.5">
            <span>Course Progress</span>
            <span>{course?.progressPercentage || 0}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-[#E79B23] h-1.5 rounded-full" style={{ width: `${course?.progressPercentage || 0}%` }} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-slate-100 px-4 py-3 lg:px-6 lg:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-[#0F2D52] transition"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-400 flex items-center gap-1 truncate">
                <span className="hidden sm:inline">{currentModule?.title}</span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-0.5">
                  <Clock size={10} /> {lesson.duration}
                </span>
              </p>
              <h1 className="text-base lg:text-lg font-bold text-[#0B1F3A] truncate">{lesson.title}</h1>
            </div>
          </div>
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-shrink-0 ml-2 ${
              isCompleted
                ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                : "border border-slate-200 text-gray-500 hover:border-green-400 hover:text-green-600 hover:bg-green-50"
            }`}
          >
            {isCompleted ? <CheckCircle2 size={14} /> : <Circle size={14} />}
            <span className="hidden sm:inline">{isCompleted ? "Completed" : "Mark Complete"}</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-8 lg:py-6">
          <div className="max-w-2xl mx-auto">
            <VideoSection videoUrl={lesson.videoUrl} title={lesson.title} duration={lesson.duration} />
            <NotesSection notes={lesson.notes} />
            <AudioSection audioUrl={lesson.audioUrl} />
            <AssignmentSection lessonId={lessonId} assignmentConfig={lesson.assignment} />
            <ReflectionSection lessonId={lessonId} reflectionConfig={lesson.reflection} />
            <DiscussionSection lessonId={lessonId} />
            <RatingSection lessonId={lessonId} existingRating={lesson.myRating} />

            <div className="flex gap-3 mt-2 mb-10">
              <button
                onClick={() => prevLesson && navigate(`/student/courses/${courseId}/lessons/${prevLesson.id}`)}
                disabled={!prevLesson}
                className="flex-1 border border-slate-200 bg-white rounded-xl py-3 text-xs font-semibold text-gray-500 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1"
              >
                <ChevronLeft size={14} />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                onClick={() => nextLesson && navigate(`/student/courses/${courseId}/lessons/${nextLesson.id}`)}
                disabled={!nextLesson}
                className="flex-1 bg-[#0F2D52] text-white rounded-xl py-3 text-xs font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
