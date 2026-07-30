import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Loader2,
  Plus,
  Trash2,
  Wrench,
} from "lucide-react";

import {
  courses as coursesApi,
  modules as modulesApi,
  lessons as lessonsApi,
} from "../../../services/api";

import type {
  Course,
  CourseModule,
} from "../../../services/api";

/* ============================================================
   Component
============================================================ */

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  /* ============================================================
     State
  ============================================================ */

  const [loading, setLoading] = useState(true);
  const [addingModule, setAddingModule] = useState(false);

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [showAddModule, setShowAddModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");

  /* ============================================================
     Fetch Course
  ============================================================ */

 const fetchCourse = useCallback(async () => {
  if (!courseId) return;

  try {
    setLoading(true);
    setError(null);

    const [courseResponse, moduleResponse] = await Promise.all([
      coursesApi.getById(courseId),
      modulesApi.getByCourse(courseId),
    ]);

    setCourse(courseResponse);
    setModules(moduleResponse);
  } catch (err) {
    console.error(err);

    setError(
      err instanceof Error
        ? err.message
        : "Unable to load course."
    );
  } finally {
    setLoading(false);
  }
}, [courseId]);

  /* ============================================================
     Add Module
  ============================================================ */

  const handleAddModule = async () => {
    if (!courseId) return;

    if (!newModuleTitle.trim()) return;

    try {
      setAddingModule(true);

      await modulesApi.create({
        courseId,
        title: newModuleTitle.trim(),
        order: modules.length + 1,
      });

      setNewModuleTitle("");
      setShowAddModule(false);

      await fetchCourse();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to create module."
      );
    } finally {
      setAddingModule(false);
    }
  };

  /* ============================================================
     Delete Module
  ============================================================ */

  const handleDeleteModule = async (moduleId: number) => {
    const confirmed = window.confirm(
      "Delete this module and all lessons?"
    );

    if (!confirmed) return;

    try {
      await modulesApi.delete(moduleId);

      await fetchCourse();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to delete module."
      );
    }
  };

  /* ============================================================
     Delete Lesson
  ============================================================ */

  const handleDeleteLesson = async (lessonId: number) => {
    const confirmed = window.confirm(
      "Delete this lesson?"
    );

    if (!confirmed) return;

    try {
      await lessonsApi.delete(lessonId);

      await fetchCourse();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to delete lesson."
      );
    }
  };

  /* ============================================================
     Loading
  ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2
          size={42}
          className="animate-spin text-[#0F2D52]"
        />
      </div>
    );
  }

  /* ============================================================
     Error
  ============================================================ */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white p-10 shadow">
          <h2 className="mb-3 text-xl font-bold text-red-600">
            Something went wrong
          </h2>

          <p className="mb-6 text-slate-500">
            {error}
          </p>

          <button
            onClick={fetchCourse}
            className="rounded-xl bg-[#0F2D52] px-6 py-3 font-medium text-white transition hover:bg-[#1E4A7A]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ============================================================
     Course Not Found
  ============================================================ */

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">

          <BookOpen
            size={48}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="text-2xl font-bold text-[#0F2D52]">
            Course Not Found
          </h2>

          <p className="mt-2 text-slate-500">
            The requested course could not be found.
          </p>

          <button
            onClick={() => navigate("/admin/courses")}
            className="mt-8 rounded-xl bg-[#0F2D52] px-6 py-3 text-white transition hover:bg-[#1E4A7A]"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ======================================================
            Header
        ======================================================= */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <button
              onClick={() => navigate("/admin/courses")}
              className="mb-5 flex items-center gap-2 text-sm font-medium text-[#0F2D52] hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Courses
            </button>

            <h1 className="text-3xl font-bold text-[#0B1F3A]">
              {course.title}
            </h1>

            <p className="mt-2 max-w-3xl text-slate-500">
              {course.description || "No course description available."}
            </p>

          </div>

          <div>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                course.status?.toLowerCase() === "published" ||
                course.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {course.status?.toLowerCase() === "published" ||
              course.isPublished
                ? "Published"
                : "Draft"}
            </span>

          </div>

        </div>

        {/* ======================================================
            Course Statistics
        ======================================================= */}

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-3 flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-3">
                <BookOpen
                  className="text-blue-700"
                  size={20}
                />
              </div>

              <span className="text-sm text-slate-500">
                Modules
              </span>

            </div>

            <h3 className="text-3xl font-bold text-[#0F2D52]">
              {modules.length}
            </h3>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-3 flex items-center gap-3">

              <div className="rounded-xl bg-green-100 p-3">
                <Clock
                  className="text-green-700"
                  size={20}
                />
              </div>

              <span className="text-sm text-slate-500">
                Duration
              </span>

            </div>

            <h3 className="text-xl font-semibold text-[#0F2D52]">
              {course.duration || "N/A"}
            </h3>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-3 flex items-center gap-3">

              <div className="rounded-xl bg-purple-100 p-3">
                <BookOpen
                  className="text-purple-700"
                  size={20}
                />
              </div>

              <span className="text-sm text-slate-500">
                Price
              </span>

            </div>

            <h3 className="text-xl font-semibold text-[#0F2D52]">
              ₦{(course.price ?? 0).toLocaleString()}
            </h3>

          </div>

        </div>

        {/* ======================================================
            Modules Header
        ======================================================= */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-2xl font-bold text-[#0B1F3A]">
              Course Modules
            </h2>

            <p className="mt-1 text-slate-500">
              Manage modules and lessons.
            </p>

          </div>

          <button
            onClick={() => setShowAddModule(true)}
            className="flex items-center gap-2 rounded-xl bg-[#0F2D52] px-5 py-3 font-medium text-white transition hover:bg-[#1E4A7A]"
          >
            <Plus size={18} />
            Add Module
          </button>

        </div>

        {/* ======================================================
            Add Module Form
        ======================================================= */}

        {showAddModule && (

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 md:flex-row">

              <input
                type="text"
                placeholder="Module title..."
                value={newModuleTitle}
                onChange={(e) =>
                  setNewModuleTitle(e.target.value)
                }
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 focus:border-[#0F2D52] focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddModule();
                  }
                }}
              />

              <button
                onClick={handleAddModule}
                disabled={addingModule}
                className="rounded-xl bg-[#0F2D52] px-6 py-3 font-medium text-white disabled:opacity-50"
              >
                {addingModule ? (
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                ) : (
                  "Save Module"
                )}
              </button>

              <button
                onClick={() => {
                  setShowAddModule(false);
                  setNewModuleTitle("");
                }}
                className="rounded-xl border border-slate-200 px-6 py-3 hover:bg-slate-50"
              >
                Cancel
              </button>

            </div>

          </div>

        )}
                {/* ======================================================
            Modules List
        ======================================================= */}

        {modules.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <BookOpen
              size={48}
              className="mx-auto mb-4 text-slate-300"
            />

            <h3 className="text-xl font-semibold text-[#0B1F3A]">
              No Modules Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Start building this course by creating your first module.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                {/* ==========================================
                    Module Header
                =========================================== */}

                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F2D52] font-bold text-white">
                      {index + 1}
                    </div>

                    <div>

                      <h3 className="text-lg font-semibold text-[#0B1F3A]">
                        {module.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {module.lessons.length} Lesson
                        {module.lessons.length !== 1 && "s"}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="rounded-xl p-2 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                {/* ==========================================
                    Lessons
                =========================================== */}

                <div className="p-6">

                  {module.lessons.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-slate-400">
                      No lessons in this module.
                    </div>
                  ) : (
                    <div className="space-y-3">

                      {module.lessons.map((lesson) => (

                        <div
                          key={lesson.id}
                          className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-slate-300 md:flex-row md:items-center md:justify-between"
                        >

                          <div className="flex items-center gap-4">

                            <span
                              className={`h-3 w-3 rounded-full ${
                                lesson.status?.toLowerCase() === "published"
                                  ? "bg-green-500"
                                  : "bg-amber-500"
                              }`}
                            />

                            <div>

                              <h4 className="font-semibold text-[#0B1F3A]">
                                {lesson.title}
                              </h4>

                              <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500">

                                <span className="flex items-center gap-1">
                                  <Clock size={13} />
                                  {lesson.duration || "No duration"}
                                </span>

                                <span>
                                  {lesson.status || "Draft"}
                                </span>

                              </div>

                            </div>

                          </div>

                          <div className="flex items-center gap-2">

                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/lessons/${lesson.id}/builder`
                                )
                              }
                              className="flex items-center gap-2 rounded-xl bg-[#0F2D52] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1E4A7A]"
                            >
                              <Wrench size={16} />
                              Build
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteLesson(lesson.id)
                              }
                              className="rounded-xl p-2 text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 size={16} />
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
  );
}