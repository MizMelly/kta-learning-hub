import { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { learning } from "../../../services/api";
import SubmissionRow from "./SubmissionRow";

export default function RecentSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const [assignmentsRes, reflectionsRes] = await Promise.all([
          learning.getAllAssignments("?pageSize=3"),
          learning.getAllReflections("?pageSize=3"),
        ]);
        const assignments = assignmentsRes.data?.items || assignmentsRes.data || assignmentsRes || [];
        const reflections = reflectionsRes.data?.items || reflectionsRes.data || reflectionsRes || [];

        const all = [
          ...assignments.map(a => ({ ...a, type: "assignment" })),
          ...reflections.map(r => ({ ...r, type: "reflection" })),
        ]
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

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="animate-spin text-[#0F66B7]" size={24} />
        </div>
      ) : submissions.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">No submissions yet.</p>
      ) : (
        submissions.map((sub, idx) => (
          <SubmissionRow
            key={sub.id}
            name={sub.studentName || sub.user?.fullName || "Unknown"}
            lesson={sub.lessonTitle || sub.lesson?.title || "Unknown Lesson"}
            status={sub.status?.toLowerCase() || "pending"}
            last={idx === submissions.length - 1}
          />
        ))
      )}
    </div>
  );
}
