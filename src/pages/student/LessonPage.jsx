import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLesson, getAllLessons } from "../../data/mockData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-9 h-9 rounded-full bg-[#0F2D52] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
        {number}
      </span>
      <h3 className="text-xl font-bold text-[#0B1F3A]">{title}</h3>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6 ${className}`}>
      {children}
    </div>
  );
}

// ─── Section: Video ────────────────────────────────────────────────────────────
function VideoSection({ lesson }) {
  return (
    <Card>
      <SectionHeader number="1" title="Video Lesson" />
      <div className="bg-[#0F2D52] rounded-2xl aspect-video flex flex-col items-center justify-center text-white gap-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E4A7A] to-[#0A1E36] opacity-80" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition cursor-pointer">
            <span className="text-4xl ml-1">▶</span>
          </div>
          <p className="text-white/80 text-base font-medium">{lesson.title}</p>
          <p className="text-white/50 text-sm">{lesson.duration}</p>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        Upload a video file to activate playback
      </p>
    </Card>
  );
}

// ─── Section: Lesson Notes ─────────────────────────────────────────────────────
function NotesSection({ notes }) {
  const renderNotes = (text) => {
    const lines = text.trim().split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## "))
        return <h2 key={i} className="text-xl font-bold text-[#0B1F3A] mt-6 mb-3 first:mt-0">{line.replace("## ", "")}</h2>;
      if (line.startsWith("### "))
        return <h3 key={i} className="text-base font-bold text-[#0B1F3A] mt-4 mb-2">{line.replace("### ", "")}</h3>;
      if (line.startsWith("> "))
        return (
          <blockquote key={i} className="border-l-4 border-[#E79B23] bg-amber-50 pl-4 pr-3 py-2 my-3 rounded-r-xl text-gray-600 italic">
            {line.replace("> ", "")}
          </blockquote>
        );
      if (line.startsWith("- "))
        return (
          <li key={i} className="ml-5 text-gray-600 mb-1.5 list-disc">
            {line.replace("- ", "").split(/\*\*(.*?)\*\*/).map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="text-[#0B1F3A] font-semibold">{part}</strong> : part
            )}
          </li>
        );
      if (line.match(/^\d+\. /))
        return <li key={i} className="ml-5 text-gray-600 mb-1.5 list-decimal">{line.replace(/^\d+\. /, "")}</li>;
      if (line.startsWith("| ")) {
        const cells = line.split("|").slice(1, -1).map((c) => c.trim());
        const isHeader = lines[i + 1]?.includes("---");
        if (line.includes("---")) return null;
        return isHeader ? (
          <tr key={i}>
            {cells.map((c, j) => (
              <th key={j} className="px-4 py-3 bg-[#0F2D52] text-white font-semibold text-sm text-left">{c}</th>
            ))}
          </tr>
        ) : (
          <tr key={i} className="even:bg-gray-50">
            {cells.map((c, j) => (
              <td key={j} className="px-4 py-3 text-gray-600 text-sm border-b border-gray-100">{c}</td>
            ))}
          </tr>
        );
      }
      if (line.startsWith("**") && line.endsWith("**"))
        return <p key={i} className="font-bold text-[#0B1F3A] mt-4 mb-1">{line.replace(/\*\*/g, "")}</p>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-gray-600 leading-relaxed">
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
      <div className="space-y-1">{renderNotes(notes)}</div>
    </Card>
  );
}

// ─── Section: Audio ────────────────────────────────────────────────────────────
function AudioSection() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <Card>
      <SectionHeader number="3" title="Audio Version" />
      <p className="text-gray-500 text-sm mb-5">Listen to this lesson on the go — ideal for multitasking.</p>
      <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-5 border border-gray-100">
        <button
          onClick={() => setPlaying(!playing)}
          className="w-14 h-14 rounded-full bg-[#0F2D52] flex items-center justify-center text-white flex-shrink-0 hover:bg-[#1E4A7A] transition-colors shadow-md"
        >
          <span className="text-xl">{playing ? "⏸" : "▶"}</span>
        </button>
        <div className="flex-1">
          <div
            className="w-full bg-gray-200 rounded-full h-2.5 cursor-pointer mb-2"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <div className="bg-[#E79B23] h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0:00</span>
            <span>14:23</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">Upload an audio file to activate playback</p>
    </Card>
  );
}

// ─── Section: Assignment ───────────────────────────────────────────────────────
function AssignmentSection({ assignment }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card>
      <SectionHeader number="4" title="Assignment" />
      {submitted ? (
        <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-100">
          <p className="text-4xl mb-3">✅</p>
          <p className="font-bold text-green-700 text-lg">Assignment Submitted!</p>
          <p className="text-sm text-gray-500 mt-1">Your instructor will review this shortly.</p>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 rounded-2xl p-5 mb-6 text-sm text-blue-700 leading-relaxed border border-blue-100">
            <span className="font-semibold">📋 Instructions: </span>{assignment.instructions}
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Your Response</label>
              <textarea
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your assignment response here..."
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/10 resize-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Upload Document (optional)</label>
              <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-[#0F2D52] hover:bg-gray-50 transition-colors">
                <span className="text-2xl">📎</span>
                <span className="text-sm text-gray-500">{file ? file.name : "Click to attach a file"}</span>
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>
            <button
              onClick={() => (text.trim() || file) && setSubmitted(true)}
              disabled={!text.trim() && !file}
              className="bg-[#0F2D52] text-white rounded-2xl px-8 py-3 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              Submit Assignment
            </button>
          </div>
        </>
      )}
    </Card>
  );
}

// ─── Section: Reflection ───────────────────────────────────────────────────────
function ReflectionSection({ reflection }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [voice, setVoice] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card>
      <SectionHeader number="5" title="Reflection" />
      {submitted ? (
        <div className="bg-amber-50 rounded-2xl p-8 text-center border border-amber-100">
          <p className="text-4xl mb-3">💭</p>
          <p className="font-bold text-amber-700 text-lg">Reflection Submitted!</p>
          <p className="text-sm text-gray-500 mt-1">Thank you for taking time to reflect.</p>
        </div>
      ) : (
        <>
          <div className="bg-amber-50 rounded-2xl p-5 mb-6 text-sm text-amber-800 leading-relaxed border border-amber-100 italic">
            💭 {reflection.prompt}
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Written Reflection</label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts, feelings, and takeaways..."
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/10 resize-none transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Voice Note (optional)</label>
                <label className="flex items-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#0F2D52] hover:bg-gray-50 transition-colors">
                  <span>🎙</span>
                  <span className="text-sm text-gray-500 truncate">{voice ? voice.name : "Upload voice note"}</span>
                  <input type="file" accept="audio/*" className="hidden" onChange={(e) => setVoice(e.target.files[0])} />
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Document (optional)</label>
                <label className="flex items-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#0F2D52] hover:bg-gray-50 transition-colors">
                  <span>📄</span>
                  <span className="text-sm text-gray-500 truncate">{file ? file.name : "Upload document"}</span>
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                </label>
              </div>
            </div>
            <button
              onClick={() => (text.trim() || file || voice) && setSubmitted(true)}
              disabled={!text.trim() && !file && !voice}
              className="bg-[#0F2D52] text-white rounded-2xl px-8 py-3 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              Submit Reflection
            </button>
          </div>
        </>
      )}
    </Card>
  );
}

// ─── Section: Discussion ───────────────────────────────────────────────────────
function DiscussionSection({ comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, {
      id: `cmt-${Date.now()}`,
      author: "Hakeem Bello",
      text: newComment,
      timestamp: new Date().toISOString(),
      replies: [],
    }]);
    setNewComment("");
  };

  const addReply = (commentId) => {
    if (!replyText.trim()) return;
    setComments(comments.map((c) =>
      c.id === commentId
        ? { ...c, replies: [...c.replies, { id: `r-${Date.now()}`, author: "Hakeem Bello", text: replyText, timestamp: new Date().toISOString() }] }
        : c
    ));
    setReplyText("");
    setReplyingTo(null);
  };

  const formatTime = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <Card>
      <SectionHeader number="6" title="Community Discussion" />
      <p className="text-gray-400 text-sm mb-6">{comments.length} comment{comments.length !== 1 ? "s" : ""}</p>

      <div className="flex gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#0F2D52] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">H</div>
        <div className="flex-1">
          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share a thought or question with your classmates..."
            className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/10 resize-none transition"
          />
          <button
            onClick={addComment}
            disabled={!newComment.trim()}
            className="mt-3 bg-[#0F2D52] text-white rounded-2xl px-6 py-2.5 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-40 shadow-sm"
          >
            Post Comment
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E79B23] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {comment.author.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-[#0B1F3A]">{comment.author}</span>
                  <span className="text-xs text-gray-400">{formatTime(comment.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{comment.text}</p>
              </div>
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-xs text-[#0F2D52] mt-2 ml-1 hover:underline font-medium"
              >
                Reply
              </button>

              {comment.replies.length > 0 && (
                <div className="mt-3 ml-4 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0F2D52] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {reply.author.charAt(0)}
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-xs text-[#0B1F3A]">{reply.author}</span>
                          <span className="text-xs text-gray-400">{formatTime(reply.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{reply.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {replyingTo === comment.id && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0F2D52] transition"
                  />
                  <button
                    onClick={() => addReply(comment.id)}
                    className="bg-[#0F2D52] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-[#1E4A7A] transition"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Section: Rating ───────────────────────────────────────────────────────────
function RatingSection({ existingRating }) {
  const [selected, setSelected] = useState(existingRating || 0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(!!existingRating);
  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <Card>
      <SectionHeader number="7" title="Rate This Lesson" />
      {submitted ? (
        <div className="text-center py-6">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className={`text-4xl ${s <= selected ? "text-[#E79B23]" : "text-gray-200"}`}>★</span>
            ))}
          </div>
          <p className="font-bold text-[#0B1F3A] text-lg">You rated this lesson {selected} star{selected !== 1 ? "s" : ""}</p>
          <p className="text-sm text-gray-500 mt-1">{labels[selected]} — thank you for your feedback!</p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-6">How helpful was this lesson?</p>
          <div className="flex gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelected(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="text-5xl transition-transform hover:scale-110 leading-none"
              >
                <span className={star <= (hovered || selected) ? "text-[#E79B23]" : "text-gray-200"}>★</span>
              </button>
            ))}
          </div>
          {(hovered || selected) > 0 && (
            <p className="text-sm text-[#E79B23] font-semibold mb-5">{labels[hovered || selected]}</p>
          )}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">Additional Feedback (optional)</label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you liked or how we can improve..."
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/10 resize-none transition"
            />
          </div>
          <button
            onClick={() => selected > 0 && setSubmitted(true)}
            disabled={!selected}
            className="bg-[#E79B23] text-white rounded-2xl px-8 py-3 text-sm font-bold hover:bg-[#C87E08] transition-colors disabled:opacity-40 shadow-sm"
          >
            Submit Rating
          </button>
        </>
      )}
    </Card>
  );
}

// ─── Main Lesson Page ──────────────────────────────────────────────────────────
export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const result = getLesson(courseId, lessonId);
  const [marked, setMarked] = useState(false);

  if (!result)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-400">Lesson not found.</p>
      </div>
    );

  const { lesson, course, module } = result;
  const allLessons = getAllLessons(courseId);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];
  const isCompleted = lesson.completed || marked;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* ── Lesson Sidebar ── */}
      <aside className="w-72 bg-[#0F2D52] flex flex-col h-full overflow-y-auto flex-shrink-0">
        {/* Back + course title */}
        <div className="px-5 py-5 border-b border-white/10">
          <button
            onClick={() => navigate("/student/courses")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-xs mb-4 transition-colors"
          >
            ← Back to My Courses
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E79B23] flex items-center justify-center text-lg flex-shrink-0">🎓</div>
            <div>
              <p className="text-white/40 text-xs">KTA Hub</p>
              <p className="text-white text-sm font-semibold leading-tight line-clamp-1">{course.title}</p>
            </div>
          </div>
        </div>

        {/* Modules + lessons */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          {course.modules.map((mod) => (
            <div key={mod.id} className="mb-5">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
                {mod.title}
              </p>
              {mod.lessons.map((l) => (
                <button
                  key={l.id}
                  onClick={() => navigate(`/student/courses/${courseId}/lessons/${l.id}`)}
                  className={`w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl mb-1 transition-all text-sm ${
                    l.id === lessonId
                      ? "bg-[#E79B23] text-white font-semibold"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="mt-0.5 flex-shrink-0 text-xs">
                    {l.completed ? "✅" : l.id === lessonId ? "▶" : "○"}
                  </span>
                  <span className="leading-snug">{l.title}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Progress footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Course Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-[#E79B23] h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{module.title} · {lesson.duration}</p>
            <h1 className="text-xl font-bold text-[#0B1F3A]">{lesson.title}</h1>
          </div>
          <button
            onClick={() => setMarked(true)}
            disabled={isCompleted}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isCompleted
                ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                : "border border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600 hover:bg-green-50"
            }`}
          >
            {isCompleted ? "✅ Completed" : "○ Mark Complete"}
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <VideoSection lesson={lesson} />
            <NotesSection notes={lesson.notes} />
            <AudioSection />
            <AssignmentSection assignment={lesson.assignment} />
            <ReflectionSection reflection={lesson.reflection} />
            <DiscussionSection comments={lesson.comments} />
            <RatingSection existingRating={lesson.rating} />

            {/* Prev / Next */}
            <div className="flex gap-4 mt-2 mb-12">
              <button
                onClick={() => prevLesson && navigate(`/student/courses/${courseId}/lessons/${prevLesson.id}`)}
                disabled={!prevLesson}
                className="flex-1 border border-gray-200 bg-white rounded-2xl py-3.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous Lesson
              </button>
              <button
                onClick={() => nextLesson && navigate(`/student/courses/${courseId}/lessons/${nextLesson.id}`)}
                disabled={!nextLesson}
                className="flex-1 bg-[#0F2D52] text-white rounded-2xl py-3.5 text-sm font-semibold hover:bg-[#1E4A7A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                Next Lesson →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
