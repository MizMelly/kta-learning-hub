import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import Students from "./pages/admin/Students";
import Submissions from "./pages/admin/Submissions";
import Discussions from "./pages/admin/Discussions";
import LessonBuilder from "./pages/admin/LessonBuilder";
import CourseDetail from "./pages/admin/CourseDetail";
// Student (your side)
import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyCourses from "./pages/student/MyCourses";
import LessonPage from "./pages/student/LessonPage";
import CourseDetails from "./pages/student/CourseDetails";
import About from "./pages/About";
import Programs from './pages/Programs';
import Events  from './pages/Events';
import Resources from './pages/Resources';
import Contact from './pages/Contact';



function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/programs" element={<Programs />} />
         <Route path="/events" element={<Events />} />
         <Route path="/resources" element={<Resources />} />
         <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="students" element={<Students />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="discussions" element={<Discussions />} />
        <Route path="/admin/lessons/:lessonId/builder" element={<LessonBuilder />} />
        <Route path="/admin/courses/:courseId" element={<CourseDetail />} />
      </Route>


      {/* Student routes with sidebar */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
      </Route>

      {/* Lesson page — full screen */}
     <Route path="/student/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
    </Routes>
  );
}

export default App;
