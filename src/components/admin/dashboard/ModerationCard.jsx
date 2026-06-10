import { ArrowUpRight } from "lucide-react";

export default function ModerationCard() {
  return (
    <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Needs Moderation
        </h2>

        <button className="flex items-center gap-1 text-primary font-medium">
          Discussions
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-900">
          Buy followers cheap at spammy-link-dot-com!!!
        </p>

        <p className="mt-1 text-sm text-red-600">
          Anon User • Reading the Right Metrics
        </p>
      </div>
    </div>
  );
}