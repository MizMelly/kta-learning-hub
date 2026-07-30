import Sidebar from "../../dashboard/Sidebar";
import Header from "../../dashboard/Header";
import ProgressCard from "../../dashboard/ProgressCard";
import DashboardContent from "../../dashboard/DashboardContent";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Sidebar />

      <main className="lg:ml-62.5">
        <div className="mx-auto max-w-305 px-8 py-8">
          <Header />

          <div className="mt-8">
            <ProgressCard />
          </div>

          <div className="mt-10">
            <DashboardContent />
          </div>
        </div>
      </main>
    </div>
  );
}