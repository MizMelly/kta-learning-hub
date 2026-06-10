import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 px-10 py-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;