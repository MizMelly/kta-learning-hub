import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import Students from "./pages/admin/Students";
import Submissions from "./pages/admin/Submissions";
import Reflections from "./pages/admin/Reflections";
import Discussions from "./pages/admin/Discussions";


import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyCourses from "./pages/student/MyCourses";
import LessonPage from "./pages/student/LessonPage";

function App() {
  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="admin/courses" element={<Courses />} />
        <Route path="admin/students" element={<Students />} />
        <Route path="admin/submissions" element={<Submissions />} />
        <Route path="admin/reflections" element={<Reflections />} />
        <Route path="admin/discussions" element={<Discussions />} />
      </Route>

      {/* Student routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<MyCourses />} />
        <Route
          path="courses/:courseId/lessons/:lessonId"
          element={<LessonPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
