import { Routes, Route } from "react-router-dom";

// Admin (her side - don't touch)
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

// Student (your side)
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
