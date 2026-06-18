import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Video,
  FileText,
  Headphones,
  ClipboardList,
  MessageCircle,
  Star,
  Settings,
  Upload,
  Loader2,
  CheckCircle2,
  Save,
  Eye,
  Globe,
  Lock,
  X,
  Check,
  Mic,
  FileUp,
  Type,
  ThumbsUp,
  Reply,
} from "lucide-react";
import { lessons, files } from "../../services/api";
import apiRequest from "../../services/api";

const TABS = [
  { id: "content", label: "Content", icon: FileText },
  { id: "audio", label: "Audio", icon: Headphones },
  { id: "assignment", label: "Assignment", icon: ClipboardList },
  { id: "reflection", label: "Reflection", icon: MessageCircle },
  { id: "community", label: "Community", icon: MessageCircle },
  { id: "rating", label: "Rating", icon: Star },
  { id: "publish", label: "Publish", icon: Settings },
];

export default function LessonBuilder() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  // Content state
  const [content, setContent] = useState({
    title: "",
    description: "",
    duration: "",
    videoUrl: "",
    notes: "",
    resources: [],
  });

  // Audio state
  const [audio, setAudio] = useState({
    audioUrl: "",
  });

  // Assignment state
  const [assignment, setAssignment] = useState({
    enabled: false,
    title: "",
    instructions: "",
    submissionType: "both", // text, document, both
  });

  // Reflection state
  const [reflection, setReflection] = useState({
    enabled: false,
    allowText: true,
    allowVoice: false,
    allowDocument: false,
  });

  // Community state
  const [community, setCommunity] = useState({
    enabled: true,
    allowReplies: true,
    allowLikes: true,
  });

  // Rating state
  const [rating, setRating] = useState({
    enabled: true,
    scale: 5,
  });

  // Publish state
  const [publishStatus, setPublishStatus] = useState("draft");

  // Upload refs
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const resourceInputRef = useRef(null);
  const [uploading, setUploading] = useState({ video: false, audio: false, resource: false });

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const res = await lessons.getById(lessonId);
      const data = res.data || res;
      setLesson(data);

      // Populate all form states from fetched data
      setContent({
        title: data.title || "",
        description: data.description || "",
        duration: data.duration || "",
        videoUrl: data.videoUrl || "",
        notes: data.notes || "",
        resources: data.resources || [],
      });
      setAudio({ audioUrl: data.audioUrl || "" });
      setAssignment({
        enabled: data.hasAssignment || false,
        title: data.assignmentTitle || "",
        instructions: data.assignmentInstructions || "",
        submissionType: data.assignmentSubmissionType || "both",
      });
      setReflection({
        enabled: data.hasReflection || false,
        allowText: data.allowTextReflection !== false,
        allowVoice: data.allowVoiceReflection || false,
        allowDocument: data.allowDocumentReflection || false,
      });
      setCommunity({
        enabled: data.hasDiscussion !== false,
        allowReplies: data.allowReplies !== false,
        allowLikes: data.allowLikes !== false,
      });
      setRating({
        enabled: data.hasRating !== false,
        scale: data.ratingScale || 5,
      });
      setPublishStatus(data.status || "draft");
    } catch (err) {
      setError(err.message || "Failed to load lesson");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return;
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiRequest(`/files/upload/${type === "resource" ? "document" : type}`, {
  method: "POST",
  body: formData,
});
      const url = res.data?.url || res.url || res.data;
      return url;
    } catch (err) {
      alert("Upload failed: " + (err.message || "Unknown error"));
      return null;
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const onVideoSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await handleFileUpload(file, "video");
    if (url) setContent((prev) => ({ ...prev, videoUrl: url }));
  };

  const onAudioSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await handleFileUpload(file, "audio");
    if (url) setAudio({ audioUrl: url });
  };

  const onResourceSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await handleFileUpload(file, "resource");
    if (url) setContent((prev) => ({ ...prev, resources: [...prev.resources, { name: file.name, url }] }));
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/content`, {
        method: "PUT",
        body: {
          title: content.title,
          description: content.description,
          duration: content.duration,
          videoUrl: content.videoUrl,
          notes: content.notes,
          resources: content.resources,
        },
      });
      showSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveAudio = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/audio`, {
        method: "PUT",
        body: { audioUrl: audio.audioUrl },
      });
      showSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveAssignment = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/assignment`, {
        method: "PUT",
        body: {
          hasAssignment: assignment.enabled,
          assignmentTitle: assignment.title,
          assignmentInstructions: assignment.instructions,
          assignmentSubmissionType: assignment.submissionType,
        },
      });
      showSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveReflection = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/reflection`, {
        method: "PUT",
        body: {
          hasReflection: reflection.enabled,
          allowTextReflection: reflection.allowText,
          allowVoiceReflection: reflection.allowVoice,
          allowDocumentReflection: reflection.allowDocument,
        },
      });
      showSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveCommunity = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/community`, {
        method: "PUT",
        body: {
          hasDiscussion: community.enabled,
          allowReplies: community.allowReplies,
          allowLikes: community.allowLikes,
        },
      });
      showSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveRating = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/rating-settings`, {
        method: "PUT",
        body: {
          hasRating: rating.enabled,
          ratingScale: rating.scale,
        },
      });
      showSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (status) => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/publish`, {
        method: "PUT",
        body: { status },
      });
      setPublishStatus(status);
      showSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const showSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0F2D52]" size={40} />
      </div>
    );
  }

  if (error && !lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchLesson}
            className="bg-[#0F2D52] text-white px-6 py-2 rounded-xl text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2">
          <CheckCircle2 size={18} />
          Saved successfully
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/admin/courses")}
              className="p-2 hover:bg-slate-100 rounded-xl transition"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#0B1F3A]">
                {content.title || "Untitled Lesson"}
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Lesson Builder — {publishStatus === "published" ? "Published" : publishStatus === "draft" ? "Draft" : "Preview"}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                publishStatus === "published"
                  ? "bg-green-50 text-green-600"
                  : publishStatus === "draft"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {publishStatus === "published" ? (
                <span className="flex items-center gap-1"><Globe size={12} /> Published</span>
              ) : publishStatus === "draft" ? (
                <span className="flex items-center gap-1"><Lock size={12} /> Draft</span>
              ) : (
                <span className="flex items-center gap-1"><Eye size={12} /> Preview</span>
              )}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-[#0F2D52] text-white"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Lesson Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">Lesson Information</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Lesson Title</label>
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52]"
                    placeholder="Enter lesson title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Description</label>
                  <textarea
                    value={content.description}
                    onChange={(e) => setContent({ ...content, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] resize-none"
                    placeholder="Brief description of this lesson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Estimated Duration</label>
                  <input
                    type="text"
                    value={content.duration}
                    onChange={(e) => setContent({ ...content, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52]"
                    placeholder="e.g. 15 min"
                  />
                </div>
              </div>
            </div>

            {/* Video Upload */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                <Video size={20} className="text-[#E79B23]" />
                Video Lesson
              </h2>
              <input
                type="file"
                accept="video/*"
                ref={videoInputRef}
                onChange={onVideoSelect}
                className="hidden"
              />
              {content.videoUrl ? (
                <div className="space-y-3">
                  <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center">
                    <video
                      src={content.videoUrl}
                      controls
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500 truncate max-w-md">{content.videoUrl}</p>
                    <button
                      onClick={() => setContent({ ...content, videoUrl: "" })}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => videoInputRef.current?.click()}
                  disabled={uploading.video}
                  className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-[#0F2D52] hover:bg-slate-50 transition disabled:opacity-50"
                >
                  {uploading.video ? (
                    <Loader2 className="animate-spin text-[#0F2D52]" size={32} />
                  ) : (
                    <Upload size={32} className="text-slate-400" />
                  )}
                  <span className="text-sm font-medium text-slate-600">
                    {uploading.video ? "Uploading video..." : "Click to upload video"}
                  </span>
                  <span className="text-xs text-slate-400">MP4, MOV up to 500MB</span>
                </button>
              )}
            </div>

            {/* Lesson Notes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                <FileText size={20} className="text-[#E79B23]" />
                Lesson Notes
              </h2>
              <textarea
                value={content.notes}
                onChange={(e) => setContent({ ...content, notes: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] resize-y font-mono text-sm"
                placeholder="Enter detailed lesson notes, key takeaways, frameworks, examples..."
              />
            </div>

            {/* Downloadable Resources */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">Downloadable Resources</h2>
              <input
                type="file"
                ref={resourceInputRef}
                onChange={onResourceSelect}
                className="hidden"
              />
              <div className="space-y-3">
                {content.resources.map((res, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <FileUp size={18} className="text-[#0F2D52]" />
                      <span className="text-sm font-medium text-slate-700">{res.name}</span>
                    </div>
                    <button
                      onClick={() => setContent({ ...content, resources: content.resources.filter((_, i) => i !== idx) })}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => resourceInputRef.current?.click()}
                  disabled={uploading.resource}
                  className="flex items-center gap-2 text-sm font-medium text-[#0F2D52] hover:underline disabled:opacity-50"
                >
                  {uploading.resource ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  {uploading.resource ? "Uploading..." : "Add resource"}
                </button>
              </div>
            </div>

            <button
              onClick={saveContent}
              disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Content"}
            </button>
          </div>
        )}

        {/* AUDIO TAB */}
        {activeTab === "audio" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                <Headphones size={20} className="text-[#E79B23]" />
                Audio Companion
              </h2>
              <input
                type="file"
                accept="audio/*"
                ref={audioInputRef}
                onChange={onAudioSelect}
                className="hidden"
              />
              {audio.audioUrl ? (
                <div className="space-y-3">
                  <audio src={audio.audioUrl} controls className="w-full" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500 truncate max-w-md">{audio.audioUrl}</p>
                    <button
                      onClick={() => setAudio({ audioUrl: "" })}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => audioInputRef.current?.click()}
                  disabled={uploading.audio}
                  className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-[#0F2D52] hover:bg-slate-50 transition disabled:opacity-50"
                >
                  {uploading.audio ? (
                    <Loader2 className="animate-spin text-[#0F2D52]" size={32} />
                  ) : (
                    <Upload size={32} className="text-slate-400" />
                  )}
                  <span className="text-sm font-medium text-slate-600">
                    {uploading.audio ? "Uploading audio..." : "Click to upload audio"}
                  </span>
                  <span className="text-xs text-slate-400">MP3, WAV up to 100MB</span>
                </button>
              )}
            </div>

            <button
              onClick={saveAudio}
              disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Audio"}
            </button>
          </div>
        )}

        {/* ASSIGNMENT TAB */}
        {activeTab === "assignment" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                  <ClipboardList size={20} className="text-[#E79B23]" />
                  Assignment
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assignment.enabled}
                    onChange={(e) => setAssignment({ ...assignment, enabled: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-[#0F2D52] focus:ring-[#0F2D52]"
                  />
                  <span className="text-sm font-medium text-slate-600">Enable Assignment</span>
                </label>
              </div>

              {assignment.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Assignment Title</label>
                    <input
                      type="text"
                      value={assignment.title}
                      onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52]"
                      placeholder="e.g. Create a content strategy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Instructions</label>
                    <textarea
                      value={assignment.instructions}
                      onChange={(e) => setAssignment({ ...assignment, instructions: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] resize-none"
                      placeholder="Detailed instructions for the student..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Submission Type</label>
                    <div className="flex gap-3">
                      {[
                        { value: "text", label: "Text Only", icon: Type },
                        { value: "document", label: "Document", icon: FileUp },
                        { value: "both", label: "Both", icon: Check },
                      ].map((opt) => {
                        const Icon = opt.icon;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setAssignment({ ...assignment, submissionType: opt.value })}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                              assignment.submissionType === opt.value
                                ? "bg-[#0F2D52] text-white border-[#0F2D52]"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <Icon size={16} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={saveAssignment}
              disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Assignment"}
            </button>
          </div>
        )}

        {/* REFLECTION TAB */}
        {activeTab === "reflection" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                  <MessageCircle size={20} className="text-[#E79B23]" />
                  Reflection
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reflection.enabled}
                    onChange={(e) => setReflection({ ...reflection, enabled: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-[#0F2D52] focus:ring-[#0F2D52]"
                  />
                  <span className="text-sm font-medium text-slate-600">Enable Reflection</span>
                </label>
              </div>

              {reflection.enabled && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">Allow students to submit reflection via:</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: "allowText", label: "Text", icon: Type },
                      { key: "allowVoice", label: "Voice Note", icon: Mic },
                      { key: "allowDocument", label: "Document", icon: FileUp },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const checked = reflection[opt.key];
                      return (
                        <label
                          key={opt.key}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border cursor-pointer transition-all ${
                            checked
                              ? "bg-[#0F2D52] text-white border-[#0F2D52]"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setReflection({ ...reflection, [opt.key]: e.target.checked })}
                            className="hidden"
                          />
                          <Icon size={16} />
                          {opt.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={saveReflection}
              disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Reflection"}
            </button>
          </div>
        )}

        {/* COMMUNITY TAB */}
        {activeTab === "community" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                  <MessageCircle size={20} className="text-[#E79B23]" />
                  Community Discussion
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={community.enabled}
                    onChange={(e) => setCommunity({ ...community, enabled: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-[#0F2D52] focus:ring-[#0F2D52]"
                  />
                  <span className="text-sm font-medium text-slate-600">Enable Discussion</span>
                </label>
              </div>

              {community.enabled && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">Discussion settings:</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: "allowReplies", label: "Allow Replies", icon: Reply },
                      { key: "allowLikes", label: "Allow Likes", icon: ThumbsUp },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const checked = community[opt.key];
                      return (
                        <label
                          key={opt.key}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border cursor-pointer transition-all ${
                            checked
                              ? "bg-[#0F2D52] text-white border-[#0F2D52]"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setCommunity({ ...community, [opt.key]: e.target.checked })}
                            className="hidden"
                          />
                          <Icon size={16} />
                          {opt.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={saveCommunity}
              disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Community Settings"}
            </button>
          </div>
        )}

        {/* RATING TAB */}
        {activeTab === "rating" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#0B1F3A] flex items-center gap-2">
                  <Star size={20} className="text-[#E79B23]" />
                  Lesson Rating
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rating.enabled}
                    onChange={(e) => setRating({ ...rating, enabled: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-[#0F2D52] focus:ring-[#0F2D52]"
                  />
                  <span className="text-sm font-medium text-slate-600">Enable Rating</span>
                </label>
              </div>

              {rating.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Rating Scale</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={28}
                          className={star <= rating.scale ? "text-[#E79B23] fill-[#E79B23]" : "text-slate-200"}
                        />
                      ))}
                      <span className="ml-2 text-sm text-slate-500">{rating.scale} Stars</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={rating.scale}
                      onChange={(e) => setRating({ ...rating, scale: parseInt(e.target.value) })}
                      className="w-full mt-3 accent-[#0F2D52]"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={saveRating}
              disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Rating Settings"}
            </button>
          </div>
        )}

        {/* PUBLISH TAB */}
        {activeTab === "publish" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">Publish Lesson</h2>
              <p className="text-sm text-slate-500 mb-6">
                Control the visibility of this lesson. Students can only see published lessons.
              </p>

              <div className="grid gap-4">
                {[
                  {
                    value: "draft",
                    label: "Draft",
                    desc: "Only admins can see this lesson. Continue editing.",
                    icon: Lock,
                    color: "amber",
                  },
                  {
                    value: "preview",
                    label: "Preview",
                    desc: "Visible to admins for preview. Not shown to students.",
                    icon: Eye,
                    color: "blue",
                  },
                  {
                    value: "published",
                    label: "Published",
                    desc: "Live and visible to all enrolled students.",
                    icon: Globe,
                    color: "green",
                  },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isActive = publishStatus === opt.value;
                  const colors = {
                    amber: isActive ? "bg-amber-50 border-amber-300" : "bg-white border-slate-200",
                    blue: isActive ? "bg-blue-50 border-blue-300" : "bg-white border-slate-200",
                    green: isActive ? "bg-green-50 border-green-300" : "bg-white border-slate-200",
                  };
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handlePublish(opt.value)}
                      disabled={saving}
                      className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${colors[opt.color]} ${
                        isActive ? "ring-2 ring-offset-2 ring-[#0F2D52]" : "hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl ${
                          opt.color === "amber"
                            ? "bg-amber-100 text-amber-600"
                            : opt.color === "blue"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900">{opt.label}</h3>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full bg-[#0F2D52] text-white text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
