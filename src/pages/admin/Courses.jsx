import { useState, useEffect } from "react";
import { Plus, Loader2, Pencil, Trash2 } from "lucide-react";
import { courses as coursesApi } from "../../services/api";
import CreateCourseModal from "../../components/admin/courses/CreateCourseModal";

export default function Courses() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await coursesApi.getAll();
      setCourseList(res.data || res || []);
    } catch (err) {
      setError(err.message || "Failed to load courses");
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
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Courses
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage all courses on the platform.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
        >
          <Plus size={18} />
          Create Course
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 rounded-2xl p-5 text-sm">
          {error}
        </div>
      ) : courseList.length === 0 ? (
        <div className="bg-card rounded-3xl border border-border p-12 text-center">
          <p className="text-muted-foreground mb-4">No courses yet.</p>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-2xl font-semibold"
          >
            Create your first course
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courseList.map((course) => (
            <div
              key={course.id}
              className="bg-card rounded-3xl border border-border p-6 shadow-sm flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground leading-snug">
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

              <p className="text-sm text-muted-foreground mb-4">
                {course.totalModules || 0} modules · {course.totalLessons || 0} lessons
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="text-lg font-bold text-foreground">
                  ₦{(course.price || 0).toLocaleString()}
                </span>
                <div className="flex gap-2">
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
