import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

import StatsGrid from "../../admin/dashboard/StatsGrid";
import RecentSubmissions from "../../admin/dashboard/RecentSubmissions";
import ModerationCard from "../../admin/dashboard/ModerationCard";
import CoursesSection from "../../admin/dashboard/CoursesSection";
import { admin } from "../../../services/api";
import type { DashboardStats } from "../../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await admin.getDashboard();

      setStats(data);
    } catch (err: unknown) {
      console.error("Dashboard error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard"
      );

      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);

  return (
    <div className="min-h-screen space-y-8 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          A snapshot of activity across the KTA Learning Hub.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2
            className="animate-spin text-[#0F66B7]"
            size={32}
          />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <StatsGrid stats={stats} />
      )}

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentSubmissions />
        <ModerationCard />
      </div>

      <CoursesSection />
    </div>
  );
}