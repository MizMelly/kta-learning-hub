import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import Students from "./pages/admin/Students";
import Submissions from "./pages/admin/Submissions";
import Reflections from "./pages/admin/Reflections";
import Discussions from "./pages/admin/Discussions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="admin/courses" element={<Courses />} />
        <Route path="admin/students" element={<Students />} />
        <Route path="admin/submissions" element={<Submissions />} />
        <Route path="admin/reflections" element={<Reflections />} />
        <Route path="admin/discussions" element={<Discussions />} />
      </Route>
    </Routes>
  );
}

export default App;