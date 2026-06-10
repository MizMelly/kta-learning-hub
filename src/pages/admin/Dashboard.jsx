import StatsGrid from "../../components/admin/dashboard/StatsGrid";
import RecentSubmissions from "../../components/admin/dashboard/RecentSubmissions";
import ModerationCard from "../../components/admin/dashboard/ModerationCard";
import CoursesSection from "../../components/admin/dashboard/CoursesSection";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          A snapshot of activity across the KTA Learning Hub.
        </p>
      </div>

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentSubmissions />
        <ModerationCard />
      </div>

      <CoursesSection />
    </div>
  );
}