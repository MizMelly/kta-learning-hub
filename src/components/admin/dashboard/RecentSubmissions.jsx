import { ArrowUpRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { learning } from "../../services/api";
import SubmissionRow from "./SubmissionRow";

export default function RecentSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const [assignmentsData, reflectionsData] = await Promise.all([
          learning.getAllAssignments(),
          learning.getAllReflections(),
        ]);
        const assignments = Array.isArray(assignmentsData) ? assignmentsData.map(s => ({...s, type: "assignment"})) : [];
        const reflections = Array.isArray(reflectionsData) ? reflectionsData.map(s => ({...s, type: "reflection"})) : [];
        const all = [...assignments, ...reflections]
          .sort((a, b) => new Date(b.createdAt || b.submittedAt) - new Date(a.createdAt || a.submittedAt))
          .slice(0, 3);
        setSubmissions(all);
      } catch (err) {
        console.error("Failed to load submissions:", err);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-[#0F2D52]" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#0B1F3A]">
          Recent Submissions
        </h2>
        <button className="flex items-center gap-1 text-[#0F66B7] font-medium text-sm hover:underline">
          View all
          <ArrowUpRight size={18} />
        </button>
      </div>

      {submissions.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">No submissions yet.</p>
      ) : (
        submissions.map((sub, i) => (
          <SubmissionRow
            key={sub.id || i}
            name={sub.studentName || sub.student?.fullName || sub.user?.fullName || "Unknown"}
            lesson={sub.lessonTitle || sub.lesson?.title || "Unknown Lesson"}
            status={sub.status || "pending"}
            last={i === submissions.length - 1}
          />
        ))
      )}
    </div>
  );
}