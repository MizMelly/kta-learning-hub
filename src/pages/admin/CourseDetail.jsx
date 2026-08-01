import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Loader2,
  Trash2,
  BookOpen,
  Clock,
  Wrench,
} from "lucide-react";
import { courses as coursesApi, modules as modulesApi, lessons as lessonsApi } from "../../services/api";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModule, setShowAddModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [courseRes, modulesRes] = await Promise.all([
        coursesApi.getById(courseId),
        modulesApi.getByCourse(courseId),
      ]);
      setCourse(courseRes.data || courseRes);
      setModules(modulesRes.data || modulesRes || []);
    } catch (err) {
      setError(err.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchData]);

  const handleAddModule = async () => {
    if (!newModuleTitle.trim()) return;
    try {
      setAdding(true);
      await modulesApi.create({
        courseId,
        title: newModuleTitle,
        order: modules.length + 1,
      });
      setNewModuleTitle("");
      setShowAddModule(false);
      fetchData();
    } catch (err) {
      alert("Failed to add module: " + err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!confirm("Delete this module and all its lessons?")) return;
    try {
      await modulesApi.delete(moduleId);
      fetchData();
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!confirm("Delete this lesson?")) return;
    try {
      await lessonsApi.delete(lessonId);
      fetchData();
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0F2D52]" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-[#0F2D52] text-white px-6 py-2 rounded-xl text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <button
            onClick={() => navigate("/admin/courses")}
            className="flex items-center gap-2 text-sm text-[#0F2D52] font-medium mb-4 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Courses
          </button>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#0B1F3A]">{course.title}</h1>
              <p className="text-slate-500 mt-1">{course.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {modules.length} modules
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  ₦{(course.price || 0).toLocaleString()}
                </span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                course.isPublished
                  ? "bg-green-50 text-green-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {course.isPublished ? "Published" : "Draft"}
            </span>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0B1F3A]">Modules & Lessons</h2>
            <button
              onClick={() => setShowAddModule(true)}
              className="flex items-center gap-2 bg-[#0F2D52] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1E4A7A] transition"
            >
              <Plus size={16} />
              Add Module
            </button>
          </div>

          {/* Add Module Input */}
          {showAddModule && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-3">
              <input
                type="text"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                placeholder="Module title..."
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleAddModule()}
              />
              <button
                onClick={handleAddModule}
                disabled={adding}
                className="bg-[#0F2D52] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50"
              >
                {adding ? <Loader2 size={16} className="animate-spin" /> : "Add"}
              </button>
              <button
                onClick={() => setShowAddModule(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Module List */}
          {modules.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <p className="text-slate-400">No modules yet. Add your first module above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map((mod, idx) => (
                <div
                  key={mod.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  {/* Module Header */}
                  <div className="p-5 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0F2D52] text-white flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <h3 className="font-semibold text-[#0B1F3A]">{mod.title}</h3>
                    </div>
                    <button
                      onClick={() => handleDeleteModule(mod.id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Lessons */}
                  <div className="p-5 pt-0">
                    {mod.lessons?.length === 0 ? (
                      <p className="text-sm text-slate-400 py-3">No lessons yet.</p>
                    ) : (
                      <div className="space-y-2 mt-3">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  lesson.status === "published"
                                    ? "bg-green-400"
                                    : "bg-amber-400"
                                }`}
                              />
                              <div>
                                <p className="text-sm font-medium text-[#0B1F3A]">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {lesson.duration || "No duration"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/admin/lessons/${lesson.id}/builder`)
                                }
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F2D52] text-white text-xs font-medium hover:bg-[#1E4A7A] transition"
                              >
                                <Wrench size={14} />
                                Build
                              </button>
                              <button
                                onClick={() => handleDeleteLesson(lesson.id)}
                                className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
