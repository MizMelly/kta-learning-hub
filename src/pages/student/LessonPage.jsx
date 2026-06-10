import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLesson, getAllLessons, courses } from "../../data/mockData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
        {number}
      </span>
      <h3 className="text-lg font-bold text-text-primary">{title}</h3>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-border-light shadow-sm p-6 mb-6 ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Section: Video ────────────────────────────────────────────────────────────
function VideoSection({ lesson }) {
  return (
    <Card>
      <SectionHeader number="1" title="Video Lesson" />
      <div className="bg-primary-dark rounded-xl aspect-video flex flex-col items-center justify-center text-white gap-3">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-3xl ml-1">▶</span>
        </div>
        <p className="text-white/60 text-sm">{lesson.title}</p>
        <p className="text-white/40 text-xs">{lesson.duration}</p>
      </div>
      <p className="text-xs text-text-muted mt-3 text-center">
        Video player — upload a real video file to activate playback
      </p>
    </Card>
  );
}

// ─── Section: Lesson Notes ─────────────────────────────────────────────────────
function NotesSection({ notes }) {
  // Simple markdown-like renderer for the demo notes
  const renderNotes = (text) => {
    const lines = text.trim().split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## "))
        return (
          <h2
            key={i}
            className="text-xl font-bold text-text-primary mt-6 mb-3 first:mt-0"
          >
            {line.replace("## ", "")}
          </h2>
        );
      if (line.startsWith("### "))
        return (
          <h3 key={i} className="text-base font-bold text-text-primary mt-4 mb-2">
            {line.replace("### ", "")}
          </h3>
        );
      if (line.startsWith("> "))
        return (
          <blockquote
            key={i}
            className="border-l-4 border-secondary pl-4 py-1 my-3 text-text-secondary italic"
          >
            {line.replace("> ", "")}
          </blockquote>
        );
      if (line.startsWith("- "))
        return (
          <li key={i} className="ml-4 text-text-secondary mb-1 list-disc">
            {line
              .replace("- ", "")
              .split(/\*\*(.*?)\*\*/)
              .map((part, j) =>
                j % 2 === 1 ? (
                  <strong key={j} className="text-text-primary font-semibold">
                    {part}
                  </strong>
                ) : (
                  part
                )
              )}
          </li>
        );
      if (line.match(/^\d+\. /))
        return (
          <li key={i} className="ml-4 text-text-secondary mb-1 list-decimal">
            {line.replace(/^\d+\. /, "")}
          </li>
        );
      if (line.startsWith("| ")) {
        const cells = line
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        const isHeader = lines[i + 1]?.includes("---");
        if (line.includes("---")) return null;
        return isHeader ? (
          <tr key={i}>
            {cells.map((c, j) => (
              <th
                key={j}
                className="px-4 py-2 bg-border-light text-text-primary font-semibold text-sm border border-border"
              >
                {c}
              </th>
            ))}
          </tr>
        ) : (
          <tr key={i} className="even:bg-surface-hover">
            {cells.map((c, j) => (
              <td
                key={j}
                className="px-4 py-2 text-text-secondary text-sm border border-border"
              >
                {c}
              </td>
            ))}
          </tr>
        );
      }
      if (line.startsWith("**") && line.endsWith("**"))
        return (
          <p key={i} className="font-bold text-text-primary mt-4 mb-1">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-text-secondary leading-relaxed">
          {line
            .split(/\*\*(.*?)\*\*/)
            .map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="text-text-primary font-semibold">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
        </p>
      );
    });
  };

  return (
    <Card>
      <SectionHeader number="2" title="Lesson Notes" />
      <div className="prose-like space-y-1">
        <table className="w-full border-collapse hidden" />
        {renderNotes(notes)}
      </div>
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
      <p className="text-text-secondary text-sm mb-4">
        Listen to this lesson on the go — ideal for multitasking.
      </p>
      <div className="bg-background rounded-xl p-4 flex items-center gap-4">
        <button
          onClick={() => setPlaying(!playing)}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 hover:bg-primary-light transition-colors"
        >
          {playing ? "⏸" : "▶"}
        </button>
        <div className="flex-1">
          <div
            className="w-full bg-border rounded-full h-2 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <div
              className="bg-secondary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>0:00</span>
            <span>14:23</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-text-muted mt-3 text-center">
        Audio player — upload an audio file to activate playback
      </p>
    </Card>
  );
}

// ─── Section: Assignment ───────────────────────────────────────────────────────
function AssignmentSection({ assignment }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!text.trim() && !file) return;
    setSubmitted(true);
  };

  return (
    <Card>
      <SectionHeader number="4" title="Assignment" />
      {submitted ? (
        <div className="bg-success-bg rounded-xl p-5 text-center">
          <p className="text-3xl mb-2">✅</p>
          <p className="font-semibold text-success">Assignment submitted!</p>
          <p className="text-sm text-text-secondary mt-1">
            Your instructor will review this shortly.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-info-bg rounded-xl p-4 mb-5 text-sm text-info leading-relaxed">
            📋 {assignment.instructions}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Your Response
              </label>
              <textarea
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your assignment response here..."
                className="w-full border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Upload Document (optional)
              </label>
              <label className="flex items-center gap-3 border-2 border-dashed border-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors">
                <span className="text-2xl">📎</span>
                <span className="text-sm text-text-secondary">
                  {file ? file.name : "Click to attach a file"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!text.trim() && !file}
              className="bg-primary text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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

  const handleSubmit = () => {
    if (!text.trim() && !file && !voice) return;
    setSubmitted(true);
  };

  return (
    <Card>
      <SectionHeader number="5" title="Reflection" />
      {submitted ? (
        <div className="bg-success-bg rounded-xl p-5 text-center">
          <p className="text-3xl mb-2">💭</p>
          <p className="font-semibold text-success">Reflection submitted!</p>
          <p className="text-sm text-text-secondary mt-1">
            Thank you for taking time to reflect.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-secondary/10 rounded-xl p-4 mb-5 text-sm text-text-secondary leading-relaxed">
            💭 <span className="italic">{reflection.prompt}</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Written Reflection
              </label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts, feelings, and takeaways..."
                className="w-full border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Voice Note (optional)
                </label>
                <label className="flex items-center gap-2 border-2 border-dashed border-border rounded-xl p-3 cursor-pointer hover:border-primary transition-colors">
                  <span>🎙</span>
                  <span className="text-sm text-text-secondary truncate">
                    {voice ? voice.name : "Upload voice note"}
                  </span>
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => setVoice(e.target.files[0])}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Document (optional)
                </label>
                <label className="flex items-center gap-2 border-2 border-dashed border-border rounded-xl p-3 cursor-pointer hover:border-primary transition-colors">
                  <span>📄</span>
                  <span className="text-sm text-text-secondary truncate">
                    {file ? file.name : "Upload document"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!text.trim() && !file && !voice}
              className="bg-primary text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
    const comment = {
      id: `cmt-${Date.now()}`,
      author: "Hakeem Bello",
      text: newComment,
      timestamp: new Date().toISOString(),
      replies: [],
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const addReply = (commentId) => {
    if (!replyText.trim()) return;
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: `r-${Date.now()}`,
                  author: "Hakeem Bello",
                  text: replyText,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : c
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <SectionHeader number="6" title="Community Discussion" />
      <p className="text-text-secondary text-sm mb-5">
        {comments.length} comment{comments.length !== 1 ? "s" : ""}
      </p>

      {/* New comment */}
      <div className="flex gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          H
        </div>
        <div className="flex-1">
          <textarea
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share a thought or question with your classmates..."
            className="w-full border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
          />
          <button
            onClick={addComment}
            disabled={!newComment.trim()}
            className="mt-2 bg-primary text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-40"
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                {comment.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-text-primary">
                    {comment.author}
                  </span>
                  <span className="text-xs text-text-muted">
                    {formatTime(comment.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {comment.text}
                </p>
                <button
                  onClick={() =>
                    setReplyingTo(
                      replyingTo === comment.id ? null : comment.id
                    )
                  }
                  className="text-xs text-info mt-1 hover:underline"
                >
                  Reply
                </button>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-border-light space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {reply.author.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-xs text-text-primary">
                              {reply.author}
                            </span>
                            <span className="text-xs text-text-muted">
                              {formatTime(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary">
                            {reply.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply input */}
                {replyingTo === comment.id && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => addReply(comment.id)}
                      className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-light"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
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
        <div className="text-center py-4">
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`text-3xl ${s <= selected ? "text-secondary" : "text-border"}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="font-semibold text-text-primary">
            You rated this lesson {selected} star{selected !== 1 ? "s" : ""}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {labels[selected]} — thank you for your feedback!
          </p>
        </div>
      ) : (
        <>
          <p className="text-text-secondary text-sm mb-5">
            How helpful was this lesson?
          </p>
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelected(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="text-4xl transition-transform hover:scale-110"
              >
                <span
                  className={
                    star <= (hovered || selected)
                      ? "text-secondary"
                      : "text-border"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
          {(hovered || selected) > 0 && (
            <p className="text-sm text-secondary font-medium mb-4">
              {labels[hovered || selected]}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Additional Feedback (optional)
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you liked or how we can improve..."
              className="w-full border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <button
            onClick={() => selected > 0 && setSubmitted(true)}
            disabled={!selected}
            className="bg-secondary text-primary-dark rounded-xl px-6 py-2.5 text-sm font-bold hover:bg-secondary-light transition-colors disabled:opacity-40"
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
      <div className="flex items-center justify-center h-screen">
        <p className="text-text-secondary">Lesson not found.</p>
      </div>
    );

  const { lesson, course, module } = result;
  const allLessons = getAllLessons(courseId);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];
  const isCompleted = lesson.completed || marked;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Lesson Sidebar */}
      <aside className="w-72 bg-white border-r border-border-light flex flex-col h-full overflow-y-auto flex-shrink-0">
        <div className="p-4 border-b border-border-light">
          <button
            onClick={() => navigate("/student/courses")}
            className="text-xs text-text-muted hover:text-primary flex items-center gap-1 mb-3"
          >
            ← Back to My Courses
          </button>
          <h2 className="text-sm font-bold text-text-primary leading-snug">
            {course.title}
          </h2>
        </div>

        <div className="flex-1 p-3">
          {course.modules.map((mod) => (
            <div key={mod.id} className="mb-4">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide px-2 mb-2">
                {mod.title}
              </p>
              {mod.lessons.map((l) => (
                <button
                  key={l.id}
                  onClick={() =>
                    navigate(`/student/courses/${courseId}/lessons/${l.id}`)
                  }
                  className={`w-full text-left flex items-start gap-2.5 px-3 py-2.5 rounded-xl mb-1 transition-colors text-sm ${
                    l.id === lessonId
                      ? "bg-primary text-white"
                      : "hover:bg-background text-text-secondary"
                  }`}
                >
                  <span className="mt-0.5 flex-shrink-0">
                    {l.completed
                      ? "✅"
                      : l.id === lessonId
                      ? "▶"
                      : "○"}
                  </span>
                  <span className="leading-snug">{l.title}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Lesson content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Breadcrumb + header */}
          <div className="mb-6">
            <p className="text-xs text-text-muted mb-1">
              {module.title} · {lesson.duration}
            </p>
            <h1 className="text-2xl font-bold text-text-primary">
              {lesson.title}
            </h1>

            {/* Mark complete */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setMarked(true)}
                disabled={isCompleted}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isCompleted
                    ? "bg-success-bg text-success cursor-default"
                    : "border border-border text-text-secondary hover:border-success hover:text-success"
                }`}
              >
                {isCompleted ? "✅ Lesson Completed" : "○ Mark as Complete"}
              </button>
            </div>
          </div>

          <VideoSection lesson={lesson} />
          <NotesSection notes={lesson.notes} />
          <AudioSection />
          <AssignmentSection assignment={lesson.assignment} />
          <ReflectionSection reflection={lesson.reflection} />
          <DiscussionSection comments={lesson.comments} />
          <RatingSection existingRating={lesson.rating} />

          {/* Prev / Next navigation */}
          <div className="flex justify-between gap-4 mt-2 mb-10">
            <button
              onClick={() =>
                prevLesson &&
                navigate(
                  `/student/courses/${courseId}/lessons/${prevLesson.id}`
                )
              }
              disabled={!prevLesson}
              className="flex-1 border border-border rounded-xl py-3 text-sm font-semibold text-text-secondary hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous Lesson
            </button>
            <button
              onClick={() =>
                nextLesson &&
                navigate(
                  `/student/courses/${courseId}/lessons/${nextLesson.id}`
                )
              }
              disabled={!nextLesson}
              className="flex-1 bg-primary text-white rounded-xl py-3 text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next Lesson →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
