import { Routes, Route } from "react-router-dom";

import Landing from "./components/Landing";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import Students from "./pages/admin/Students";
import Submissions from "./pages/admin/Submissions";
import Reflections from "./pages/admin/Reflections";
import Discussions from "./pages/admin/Discussions";

// Student (your side)
import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyCourses from "./pages/student/MyCourses";
import LessonPage from "./pages/student/LessonPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="students" element={<Students />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="reflections" element={<Reflections />} />
        <Route path="discussions" element={<Discussions />} />
      </Route>


      {/* Student routes with sidebar */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<MyCourses />} />
      </Route>

      {/* Lesson page — full screen */}
      <Route
        path="/student/courses/:courseId/lessons/:lessonId"
        element={<LessonPage />}
      />
    </Routes>
  );
}

export default App;
