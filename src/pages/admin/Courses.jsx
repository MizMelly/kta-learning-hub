import { useState, useEffect } from "react";
import { Plus, Loader2, Pencil, Trash2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { courses as coursesApi } from "../../services/api";
import CreateCourseModal from "../../components/admin/courses/CreateCourseModal";


export default function Courses() {
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const fetchCourses = async () => {
  try {
    setLoading(true);
    setError(null);
    const res = await coursesApi.getAllAdmin();
    setCourseList(Array.isArray(res) ? res : []);
  } catch (err) {
    console.error("Fetch courses error:", err);
    setError(err.message || "Failed to load courses");
    setCourseList([]); // Always set to empty array, never undefined
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    try {
      await coursesApi.delete(id);
      setCourseList((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            Courses
          </h1>
          <p className="mt-2 text-gray-500">
            Manage all courses on the platform.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#0F66B7] text-[#0F66B7]-foreground px-5 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
        >
          <Plus size={18} />
          Create Course
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#0F66B7]" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 rounded-2xl p-5 text-sm">
          {error}
        </div>
      ) : courseList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No courses yet.</p>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-[#0F66B7] text-[#0F66B7]-foreground px-6 py-2.5 rounded-2xl font-semibold"
          >
            Create your first course
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courseList.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-[#0B1F3A] leading-snug">
                  {course.title}
                </h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
                    course.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                {course.totalModules || 0} modules · {course.totalLessons || 0} lessons
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                <span className="text-lg font-bold text-[#0B1F3A]">
                  ₦{(course.price || 0).toLocaleString()}
                </span>
                <div className="flex gap-2">
  <button
    onClick={() => navigate(`/admin/courses/${course.id}`)}
    className="p-2 rounded-xl hover:bg-blue-50 text-[#0F2D52] transition"
    title="View modules & lessons"
  >
    <ChevronRight size={16} />
  </button>
  <button
    onClick={() => handleDelete(course.id)}
    className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition"
  >
    <Trash2 size={16} />
  </button>
</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <CreateCourseModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            fetchCourses();
          }}
        />
      )}
    </div>
  );
}
