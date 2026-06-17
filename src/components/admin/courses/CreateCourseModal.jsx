import { useState } from "react";
import { X, Plus, Trash2, Loader2, ChevronRight } from "lucide-react";
import { courses as coursesApi, modules as modulesApi, lessons as lessonsApi } from "../../../services/api";

const STEPS = ["Basic Info", "Modules", "Lessons"];

export default function CreateCourseModal({ onClose, onCreated }) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Step 1: Basic Info
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    instructor: "",
    duration: "",
    level: "Beginner",
    status: "Draft",
  });
  const [createdCourseId, setCreatedCourseId] = useState(null);

  // Step 2: Modules
  const [moduleList, setModuleList] = useState([{ title: "", description: "" }]);
  const [createdModules, setCreatedModules] = useState([]);

  // Step 3: Lessons
  const [lessonsByModule, setLessonsByModule] = useState({});

  const handleCourseChange = (field, value) =>
    setCourseData((prev) => ({ ...prev, [field]: value }));

  // ---- Step 1 submit ----
  const handleCreateCourse = async () => {
    if (!courseData.title.trim()) {
      setError("Course title is required");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      const res = await coursesApi.create({
        ...courseData,
        price: Number(courseData.price) || 0,
      });
      const created = res.data || res;
      setCreatedCourseId(created.id);
      setStep(1);
    } catch (err) {
      setError(err.message || "Failed to create course");
    } finally {
      setSaving(false);
    }
  };

  // ---- Step 2 submit ----
  const addModuleField = () =>
    setModuleList((prev) => [...prev, { title: "", description: "" }]);

  const removeModuleField = (idx) =>
    setModuleList((prev) => prev.filter((_, i) => i !== idx));

  const updateModuleField = (idx, field, value) =>
    setModuleList((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    );

  const handleCreateModules = async () => {
    const validModules = moduleList.filter((m) => m.title.trim());
    if (validModules.length === 0) {
      setError("Add at least one module");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      const created = [];
      for (let i = 0; i < validModules.length; i++) {
        const res = await modulesApi.create({
          courseId: createdCourseId,
          title: validModules[i].title,
          description: validModules[i].description,
          order: i + 1,
        });
        created.push(res.data || res);
      }
      setCreatedModules(created);
      // initialize lesson lists for each module
      const initialLessons = {};
      created.forEach((m) => {
        initialLessons[m.id] = [{ title: "", description: "", duration: "" }];
      });
      setLessonsByModule(initialLessons);
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to create modules");
    } finally {
      setSaving(false);
    }
  };

  // ---- Step 3 submit ----
  const addLessonField = (moduleId) =>
    setLessonsByModule((prev) => ({
      ...prev,
      [moduleId]: [...prev[moduleId], { title: "", description: "", duration: "" }],
    }));

  const removeLessonField = (moduleId, idx) =>
    setLessonsByModule((prev) => ({
      ...prev,
      [moduleId]: prev[moduleId].filter((_, i) => i !== idx),
    }));

  const updateLessonField = (moduleId, idx, field, value) =>
    setLessonsByModule((prev) => ({
      ...prev,
      [moduleId]: prev[moduleId].map((l, i) =>
        i === idx ? { ...l, [field]: value } : l
      ),
    }));

  const handleCreateLessons = async () => {
    try {
      setSaving(true);
      setError(null);
      for (const moduleId of Object.keys(lessonsByModule)) {
        const lessonsForModule = lessonsByModule[moduleId].filter((l) =>
          l.title.trim()
        );
        for (let i = 0; i < lessonsForModule.length; i++) {
          await lessonsApi.create({
            moduleId,
            title: lessonsForModule[i].title,
            description: lessonsForModule[i].description,
            duration: lessonsForModule[i].duration || "10 min",
            order: i + 1,
          });
        }
      }
      onCreated();
    } catch (err) {
      setError(err.message || "Failed to create lessons");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-7 py-5 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Create Course</h2>
            <div className="flex items-center gap-2 mt-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      i === step
                        ? "bg-primary text-primary-foreground"
                        : i < step
                        ? "bg-green-100 text-green-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}. {s}
                  </span>
                  {i < STEPS.length - 1 && (
                    <ChevronRight size={14} className="text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={22} />
          </button>
        </div>

        <div className="p-7">
          {error && (
            <div className="bg-red-50 text-red-600 rounded-2xl p-4 text-sm mb-5">
              {error}
            </div>
          )}

          {/* STEP 1: Basic Info */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => handleCourseChange("title", e.target.value)}
                  placeholder="e.g. Social Media Management Masterclass"
                  className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={courseData.description}
                  onChange={(e) => handleCourseChange("description", e.target.value)}
                  placeholder="What will students learn in this course?"
                  className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Price (₦)
                  </label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) => handleCourseChange("price", e.target.value)}
                    placeholder="25000"
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={courseData.category}
                    onChange={(e) => handleCourseChange("category", e.target.value)}
                    placeholder="Digital Marketing"
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Instructor
                  </label>
                  <input
                    type="text"
                    value={courseData.instructor}
                    onChange={(e) => handleCourseChange("instructor", e.target.value)}
                    placeholder="Dr. Amara Osei"
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={courseData.duration}
                    onChange={(e) => handleCourseChange("duration", e.target.value)}
                    placeholder="6 weeks"
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Level
                  </label>
                  <select
                    value={courseData.level}
                    onChange={(e) => handleCourseChange("level", e.target.value)}
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={courseData.status}
                    onChange={(e) => handleCourseChange("status", e.target.value)}
                    className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleCreateCourse}
                disabled={saving}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : null}
                Save & Continue
              </button>
            </div>
          )}

          {/* STEP 2: Modules */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add the modules that structure this course (e.g. Module 1, Module 2...).
              </p>

              {moduleList.map((mod, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-2xl p-4 space-y-3 relative"
                >
                  {moduleList.length > 1 && (
                    <button
                      onClick={() => removeModuleField(idx)}
                      className="absolute top-3 right-3 text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      Module {idx + 1} Title
                    </label>
                    <input
                      type="text"
                      value={mod.title}
                      onChange={(e) => updateModuleField(idx, "title", e.target.value)}
                      placeholder="e.g. Introduction to Social Media"
                      className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      Description (optional)
                    </label>
                    <input
                      type="text"
                      value={mod.description}
                      onChange={(e) => updateModuleField(idx, "description", e.target.value)}
                      placeholder="Brief description of this module"
                      className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addModuleField}
                className="flex items-center gap-2 text-primary font-semibold text-sm"
              >
                <Plus size={16} /> Add Module
              </button>

              <button
                onClick={handleCreateModules}
                disabled={saving}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : null}
                Continue
              </button>
            </div>
          )}

          {/* STEP 3: Lessons */}
          {step === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Add lessons for each module. You can add full lesson content (video, notes, assignments) afterward.
              </p>

              {createdModules.map((mod) => (
                <div key={mod.id} className="border border-border rounded-2xl p-4">
                  <h4 className="font-semibold text-foreground mb-3">{mod.title}</h4>

                  <div className="space-y-3">
                    {(lessonsByModule[mod.id] || []).map((lesson, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) =>
                              updateLessonField(mod.id, idx, "title", e.target.value)
                            }
                            placeholder={`Lesson ${idx + 1} title`}
                            className="col-span-2 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) =>
                              updateLessonField(mod.id, idx, "duration", e.target.value)
                            }
                            placeholder="14 min"
                            className="border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        {(lessonsByModule[mod.id] || []).length > 1 && (
                          <button
                            onClick={() => removeLessonField(mod.id, idx)}
                            className="text-muted-foreground hover:text-red-500 mt-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addLessonField(mod.id)}
                    className="flex items-center gap-2 text-primary font-semibold text-sm mt-3"
                  >
                    <Plus size={14} /> Add Lesson
                  </button>
                </div>
              ))}

              <button
                onClick={handleCreateLessons}
                disabled={saving}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : null}
                Finish & Create Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
