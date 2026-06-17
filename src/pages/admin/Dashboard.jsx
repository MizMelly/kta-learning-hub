import { useState, useEffect } from "react";
import StatsGrid from "../../components/admin/dashboard/StatsGrid";
import RecentSubmissions from "../../components/admin/dashboard/RecentSubmissions";
import ModerationCard from "../../components/admin/dashboard/ModerationCard";
import CoursesSection from "../../components/admin/dashboard/CoursesSection";
import { admin } from "../../services/api";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await admin.getDashboard();
        // Handle various response formats
        const data = res?.data || res;
        setStats(data || null);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message || "Failed to load dashboard");
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          A snapshot of activity across the KTA Learning Hub.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-[#0F66B7]" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 rounded-2xl p-5 text-sm border border-red-100">
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
