import { ArrowUpRight } from "lucide-react";
import SubmissionRow from "./SubmissionRow";

export default function RecentSubmissions() {
  return (
    <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Recent Submissions
        </h2>

        <button className="flex items-center gap-1 text-primary font-medium">
          View all
          <ArrowUpRight size={18} />
        </button>
      </div>

      <SubmissionRow
        name="Grace Adeyemi"
        lesson="Understanding Your Audience"
        status="pending"
      />

      <SubmissionRow
        name="Tunde Bello"
        lesson="Building a Content Pillar System"
        status="reviewed"
      />

      <SubmissionRow
        name="Lara Smith"
        lesson="Reading the Right Metrics"
        status="pending"
        last
      />
    </div>
  );
}