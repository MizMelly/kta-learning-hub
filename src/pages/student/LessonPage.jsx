import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lessons, courses, learning, discussions } from "../../services/api";
import apiRequest from "../../services/api";
import {
  Play,
  CheckCircle2,
  Star,
  MessageCircle,
  Paperclip,
  Mic,
  FileText,
  BookOpen,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Home,
  Volume2,
  FileCheck,
  PenLine,
  ThumbsUp,
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getCurrentUser() {
  try {
    const userStr = localStorage.getItem("kta_user");
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

const STEPS = [
  { id: "video", label: "Video", icon: Play },
  { id: "notes", label: "Notes", icon: BookOpen },
  { id: "audio", label: "Audio", icon: Volume2 },
  { id: "assignment", label: "Assignment", icon: FileCheck },
  { id: "reflection", label: "Reflection", icon: PenLine },
  { id: "discussion", label: "Discussion", icon: MessageCircle },
  { id: "rating", label: "Rating", icon: ThumbsUp },
  { id: "complete", label: "Complete", icon: Trophy },
];

// ─── Step 1: Video ────────────────────────────────────────────────────────────
function VideoStep({ lesson, onComplete }) {
  const [watched, setWatched] = useState(false);

  if (!lesson.videoUrl) {
    return (
      <div className="text-center py-12">
        <Play size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-400">No video uploaded yet for this lesson.</p>
        <button
          onClick={onComplete}
          className="mt-4 bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition"
        >
          Skip to Notes →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl overflow-hidden aspect-video bg-black">
        <video
          src={lesson.videoUrl}
          controls
          className="w-full h-full"
          onEnded={() => setWatched(true)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {lesson.title} · {lesson.estimatedDurationMinutes} min
        </p>
        <button
          onClick={onComplete}
          className="bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition flex items-center gap-2"
        >
          {watched ? "Continue to Notes" : "Skip to Notes"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Notes ───────────────────────────────────────────────────────────
function NotesStep({ notes, onComplete }) {
  if (!notes) {
    return (
      <div className="text-center py-12">
        <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-400">No notes available for this lesson.</p>
        <button
          onClick={onComplete}
          className="mt-4 bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition"
        >
          Skip to Audio →
        </button>
      </div>
    );
  }

  const renderNotes = (text) => {
    const lines = text.trim().split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## "))
        return <h2 key={i} className="text-xl font-bold text-[#0B1F3A] mt-6 mb-3">{line.replace("## ", "")}</h2>;
      if (line.startsWith("### "))
        return <h3 key={i} className="text-base font-bold text-[#0B1F3A] mt-4 mb-2">{line.replace("### ", "")}</h3>;
      if (line.startsWith("> "))
        return (
          <blockquote key={i} className="border-l-4 border-[#E79B23] bg-amber-50 pl-4 pr-3 py-2 my-3 rounded-r-lg text-gray-600 text-sm italic">
            {line.replace("> ", "")}
          </blockquote>
        );
      if (line.startsWith("- "))
        return <li key={i} className="ml-5 text-gray-600 text-sm mb-1 list-disc">{line.replace("- ", "")}</li>;
      if (line.match(/^\d+\. /))
        return <li key={i} className="ml-5 text-gray-600 text-sm mb-1 list-decimal">{line.replace(/^\d+\. /, "")}</li>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-gray-600 text-sm leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="space-y-1">{renderNotes(notes)}</div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition flex items-center gap-2"
        >
          Continue to Audio
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Audio ───────────────────────────────────────────────────────────
function AudioStep({ audioUrl, onComplete }) {
  if (!audioUrl) {
    return (
      <div className="text-center py-12">
        <Volume2 size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-400">No audio uploaded yet for this lesson.</p>
        <button
          onClick={onComplete}
          className="mt-4 bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition"
        >
          Skip to Assignment →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-gray-500 text-sm mb-4">Listen to this lesson on the go.</p>
        <audio src={audioUrl} controls className="w-full" />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition flex items-center gap-2"
        >
          Continue to Assignment
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Assignment ────────────────────────────────────────────────────
function AssignmentStep({ lessonId, assignmentConfig, onComplete }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  if (!assignmentConfig?.enabled) {
    return (
      <div className="text-center py-12">
        <FileCheck size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-400">No assignment for this lesson.</p>
        <button
          onClick={onComplete}
          className="mt-4 bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition"
        >
          Skip to Reflection →
        </button>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!text.trim() && !file) return;
    try {
      setSubmitting(true);
      let fileUrl = null;
      let fileName = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await apiRequest("/files/upload/document", {
          method: "POST",
          body: formData,
          headers: {},
        });
        fileUrl = uploadRes?.fileUrl || uploadRes?.url || uploadRes?.data?.fileUrl || uploadRes?.data?.url;
        fileName = file.name;
      }
      await learning.submitAssignment({
        lessonId,
        textContent: text,
        documentUrl: fileUrl,
        documentFileName: fileName,
      });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-100">
          <CheckCircle2 size={48} className="mx-auto mb-3 text-green-500" />
          <p className="font-bold text-green-700 text-lg">Assignment Submitted!</p>
          <p className="text-sm text-gray-500 mt-1">Your instructor will review this shortly.</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onComplete}
            className="bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition flex items-center gap-2"
          >
            Continue to Reflection
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-blue-700 border border-blue-100">
          <span className="font-semibold">Instructions: </span>
          {assignmentConfig.instructions || "Complete the assignment for this lesson."}
        </div>

        <div className="space-y-4">
          {(assignmentConfig.submissionType === "text" || assignmentConfig.submissionType === "both") && (
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Your Response</label>
              <textarea
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your assignment response here..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-1 focus:ring-[#0F2D52]/10 resize-none transition"
              />
            </div>
          )}

          {(assignmentConfig.submissionType === "document" || assignmentConfig.submissionType === "both") && (
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Upload Document</label>
              <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              <label
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#0F2D52] hover:bg-slate-50 transition-colors"
              >
                <Paperclip size={18} className="text-gray-400" />
                <span className="text-sm text-gray-500">{file ? file.name : "Click to attach a file"}</span>
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
      </div>
    </div>
  );
}

// ─── Step 5: Reflection ──────────────────────────────────────────────────────
function ReflectionStep({ lessonId, reflectionConfig, onComplete }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [voice, setVoice] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const voiceInputRef = useRef(null);

  if (!reflectionConfig?.enabled) {
    return (
      <div className="text-center py-12">
        <PenLine size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-400">No reflection required for this lesson.</p>
        <button
          onClick={onComplete}
          className="mt-4 bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition"
        >
          Skip to Discussion →
        </button>
      </div>
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
        const uploadRes = await apiRequest("/files/upload/document", { method: "POST", body: formData, headers: {} });
        fileUrl = uploadRes?.fileUrl || uploadRes?.url || uploadRes?.data?.fileUrl || uploadRes?.data?.url;
      }
      if (voice) {
        const formData = new FormData();
        formData.append("file", voice);
        const uploadRes = await apiRequest("/files/upload/audio", { method: "POST", body: formData, headers: {} });
        voiceUrl = uploadRes?.fileUrl || uploadRes?.url || uploadRes?.data?.fileUrl || uploadRes?.data?.url;
      }
      await learning.submitReflection({ 
        lessonId, 
        textContent: text, 
        fileUrl, 
        voiceUrl,
        reflectionType: file ? "Document" : voice ? "Voice" : "Text"
      });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="bg-amber-50 rounded-2xl p-8 text-center border border-amber-100">
          <MessageCircle size={48} className="mx-auto mb-3 text-amber-500" />
          <p className="font-bold text-amber-700 text-lg">Reflection Submitted!</p>
          <p className="text-sm text-gray-500 mt-1">Thank you for taking time to reflect.</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onComplete}
            className="bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition flex items-center gap-2"
          >
            Continue to Discussion
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="bg-amber-50 rounded-xl p-4 mb-6 text-sm text-amber-800 border border-amber-100 italic">
          {reflectionConfig.prompt || "What is the most important insight you gained from this lesson?"}
        </div>

        <div className="space-y-4">
          {reflectionConfig.allowText && (
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Written Reflection</label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-1 focus:ring-[#0F2D52]/10 resize-none transition"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reflectionConfig.allowVoice && (
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Voice Note</label>
                <input type="file" accept="audio/*" ref={voiceInputRef} className="hidden" onChange={(e) => setVoice(e.target.files[0])} />
                <label
                  onClick={() => voiceInputRef.current?.click()}
                  className="flex items-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#0F2D52] hover:bg-slate-50 transition-colors"
                >
                  <Mic size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{voice ? voice.name : "Upload voice note"}</span>
                </label>
              </div>
            )}
            {reflectionConfig.allowDocument && (
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Document</label>
                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                <label
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#0F2D52] hover:bg-slate-50 transition-colors"
                >
                  <FileText size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{file ? file.name : "Upload document"}</span>
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
      </div>
    </div>
  );
}

// ─── Step 6: Discussion ──────────────────────────────────────────────────────
function DiscussionStep({ lessonId, onComplete }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  let ignore = false;

  async function loadComments() {
    try {
      const data = await discussions.getByLesson(lessonId);

      if (!ignore) {
        setComments(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      if (!ignore) {
        console.error(err);
        setComments([]);
      }
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }

  loadComments();

  return () => {
    ignore = true;
  };
}, [lessonId]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      // FIX: Use PascalCase field names matching backend DTO
      // Backend gets userId from JWT, don't send it
      const payload = { 
        LessonId: lessonId, 
        Content: newComment
      };
      console.log("Posting comment with payload:", payload);
      await discussions.postComment(payload);

setNewComment("");

const data = await discussions.getByLesson(lessonId);
setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Comment error:", err);
      alert("Failed to post comment: " + (err.message || "Unknown error. Check console."));
    }
  };

  const formatTime = (iso) =>
    iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-gray-400 text-sm mb-4">{comments.length} comment{comments.length !== 1 ? "s" : ""}</p>

        <div className="flex gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#0F2D52] flex items-center justify-center text-white text-sm font-bold shrink-0">
            {(getCurrentUser()?.fullName || "S").charAt(0)}
          </div>
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
              className="mt-2 bg-[#0F2D52] text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-40 shadow-sm"
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
                <div className="w-10 h-10 rounded-full bg-[#E79B23] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {(comment.studentName || comment.user?.fullName || comment.userName || "?").charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-[#0B1F3A]">
                        {comment.studentName || comment.user?.fullName || comment.userName || "Unknown"}
                      </span>
                      <span className="text-xs text-gray-400">{formatTime(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{comment.content || comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition flex items-center gap-2"
        >
          Continue to Rating
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 7: Rating ──────────────────────────────────────────────────────────
function RatingStep({ lessonId, existingRating, onComplete }) {
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
      await learning.submitRating({ lessonId, rating: selected, feedback });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit rating: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={28} className={s <= selected ? "text-[#E79B23] fill-[#E79B23]" : "text-gray-200"} />
            ))}
          </div>
          <p className="font-bold text-[#0B1F3A] text-lg">You rated this lesson {selected} star{selected !== 1 ? "s" : ""}</p>
          <p className="text-sm text-gray-500 mt-1">{labels[selected]} — thank you!</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onComplete}
            className="bg-[#0F66B7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#09539a] transition flex items-center gap-2"
          >
            Complete Lesson
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-gray-500 text-sm mb-4">How helpful was this lesson?</p>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setSelected(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={star <= (hovered || selected) ? "text-[#E79B23] fill-[#E79B23]" : "text-gray-200"}
              />
            </button>
          ))}
        </div>
        {(hovered || selected) > 0 && (
          <p className="text-sm text-[#E79B23] font-semibold mb-4">{labels[hovered || selected]}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Additional Feedback (optional)</label>
          <textarea
            rows={3}
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
      </div>
    </div>
  );
}

// ─── Step 8: Complete ────────────────────────────────────────────────────────
function CompleteStep({ lesson, onNextLesson, onDashboard }) {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <Trophy size={40} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-[#0B1F3A] mb-2">Congratulations!</h2>
      <p className="text-gray-500 mb-2">You have completed this lesson.</p>
      <p className="text-lg font-semibold text-[#0F66B7] mb-8">{lesson.title}</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onNextLesson}
          className="bg-[#0F66B7] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#09539a] transition flex items-center justify-center gap-2"
        >
          Proceed to Next Lesson
          <ArrowRight size={18} />
        </button>
        <button
          onClick={onDashboard}
          className="border border-slate-200 bg-white text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-2"
        >
          <Home size={18} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ currentStep, totalSteps }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Lesson Progress</span>
        <span>Step {currentStep + 1} of {totalSteps}</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#0F66B7] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

// ─── Main Lesson Page ────────────────────────────────────────────────────────
export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [, setProgress] = useState(null);

  // Fetch lesson and progress
  const fetchLesson = async () => {
    try {
      setLoading(true);
      const [lessonData, courseData, progressData] = await Promise.all([
        lessons.getStudentLesson(lessonId),
        courses.getById(courseId),
        learning.getProgress(lessonId),
      ]);
      setLesson(lessonData);
      setCourse(courseData);
      setProgress(progressData);
    } catch (err) {
      setError(err.message || "Failed to load lesson");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  let cancelled = false;

  async function loadLesson() {
    try {
      setLoading(true);

      const [lessonData, courseData, progressData] =
        await Promise.all([
          lessons.getStudentLesson(lessonId),
          courses.getById(courseId),
          learning.getProgress(lessonId),
        ]);

      if (!cancelled) {
        setLesson(lessonData);
        setCourse(courseData);
        setProgress(progressData);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message || "Failed to load lesson");
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  loadLesson();

  return () => {
    cancelled = true;
  };
}, [lessonId, courseId]);

  // Mark step complete and update progress
  const markStepComplete = async (step) => {
    try {
      await learning.complete(lessonId, { step });
      // Update local progress
      setProgress((prev) => ({
        ...prev,
        [`${step}Completed`]: true,
      }));
    } catch (err) {
      console.error("Failed to mark step complete:", err);
    }
  };

  const goToNextStep = () => {
    const step = STEPS[currentStep].id;
    markStepComplete(step);
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const allLessons = [];
  if (course?.modules) {
    course.modules.forEach((mod) => {
      if (mod.lessons) allLessons.push(...mod.lessons);
    });
  }
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const nextLesson = allLessons[currentIndex + 1];

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/student/courses/${courseId}/lessons/${nextLesson.id}`);
    } else {
      navigate("/student/dashboard");
    }
  };

  const handleDashboard = () => {
    navigate("/student/dashboard");
  };

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
          <button onClick={fetchLesson} className="bg-[#0F2D52] text-white px-6 py-2 rounded-xl text-sm font-medium">
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

  const step = STEPS[currentStep];
  const StepIcon = step.icon;

  // Build config objects from lesson data (matching backend field names)
  const assignmentConfig = lesson.hasAssignment ? {
    enabled: true,
    instructions: lesson.assignmentInstructions || lesson.assignment?.instructions,
    submissionType: lesson.assignmentSubmissionType?.toLowerCase() || "both"
  } : { enabled: false };

  const reflectionConfig = lesson.enableReflection ? {
    enabled: true,
    prompt: lesson.reflectionPrompt || "What is the most important insight you gained from this lesson?",
    allowText: lesson.allowTextReflection,
    allowVoice: lesson.allowVoiceReflection,
    allowDocument: lesson.allowDocumentReflection
  } : { enabled: false };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/student/courses/${courseId}`)}
            className="flex items-center gap-2 text-sm text-[#0F2D52] font-medium mb-4 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Course
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#0F2D52] flex items-center justify-center">
              <StepIcon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{step.label}</p>
              <h1 className="text-xl font-bold text-[#0B1F3A]">{lesson.title}</h1>
            </div>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />

        {/* Step Content */}
        <div className="mb-8">
          {step.id === "video" && (
            <VideoStep lesson={lesson} onComplete={goToNextStep} />
          )}
          {step.id === "notes" && (
            <NotesStep notes={lesson.lessonNotes} onComplete={goToNextStep} />
          )}
          {step.id === "audio" && (
            <AudioStep audioUrl={lesson.audioUrl} onComplete={goToNextStep} />
          )}
          {step.id === "assignment" && (
            <AssignmentStep lessonId={lessonId} assignmentConfig={assignmentConfig} onComplete={goToNextStep} />
          )}
          {step.id === "reflection" && (
            <ReflectionStep lessonId={lessonId} reflectionConfig={reflectionConfig} onComplete={goToNextStep} />
          )}
          {step.id === "discussion" && (
            <DiscussionStep lessonId={lessonId} onComplete={goToNextStep} />
          )}
          {step.id === "rating" && (
            <RatingStep lessonId={lessonId} existingRating={lesson.myRating?.rating} onComplete={goToNextStep} />
          )}
          {step.id === "complete" && (
            <CompleteStep lesson={lesson} courseId={courseId} lessonId={lessonId} onNextLesson={handleNextLesson} onDashboard={handleDashboard} />
          )}
        </div>

        {/* Navigation */}
        {currentStep < STEPS.length - 1 && (
          <div className="flex gap-3">
            <button
              onClick={goToPrevStep}
              disabled={currentStep === 0}
              className="flex-1 border border-slate-200 bg-white rounded-xl py-3 text-sm font-semibold text-gray-500 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} />
              Previous Step
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
