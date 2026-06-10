import { Routes, Route } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";

// import Dashboard from "./pages/admin/Dashboard";
// import Courses from "./pages/admin/Courses";
// import Students from "./pages/admin/Students";
// import Submissions from "./pages/admin/Submissions";

function App() {
  return (
    <Routes>
       <Route path="/" element={<AdminLayout />} />

      
        {/* <Route index element={<Dashboard />} /> */}
        {/* <Route path="courses" element={<Courses />} /> */}
        {/* <Route path="students" element={<Students />} /> */}
        {/* <Route path="submissions" element={<Submissions />} /> */}
      
    </Routes>
  );
}

export default App;