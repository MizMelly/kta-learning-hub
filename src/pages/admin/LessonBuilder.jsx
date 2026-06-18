import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Video, FileText, Headphones, ClipboardList, MessageCircle, Star,
  Settings, Upload, Loader2, CheckCircle2, Save, Eye, Globe, Lock, X, Check,
  Mic, FileUp, Type, ThumbsUp, Reply,
} from "lucide-react";
import apiRequest, { API_BASE, getToken } from "../../services/api";

const TABS = [
  { id: "info", label: "Info", icon: FileText },
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
  const [activeTab, setActiveTab] = useState("info");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  // Info tab (UpdateLessonRequest)
  const [info, setInfo] = useState({ title: "", description: "", estimatedDurationMinutes: 0, orderIndex: 1 });

  // Content tab (UpdateLessonContentRequest)
  const [content, setContent] = useState({ videoUrl: "", lessonNotes: "", downloadableResourceUrls: "" });
  const [resourcesList, setResourcesList] = useState([]); // For UI only

  // Audio tab (UpdateLessonAudioRequest)
  const [audio, setAudio] = useState({ audioUrl: "" });

  // Assignment tab (UpdateLessonAssignmentRequest)
  const [assignment, setAssignment] = useState({
    hasAssignment: false, assignmentTitle: "", assignmentInstructions: "", submissionType: "Both",
  });

  // Reflection tab (UpdateLessonReflectionRequest)
  const [reflection, setReflection] = useState({
    enableReflection: false, allowTextReflection: true, allowVoiceReflection: true, allowDocumentReflection: true,
  });

  // Community tab (UpdateLessonCommunityRequest)
  const [community, setCommunity] = useState({
    enableDiscussion: true, allowReplies: true, allowLikes: true,
  });

  // Rating tab (UpdateLessonRatingSettingsRequest)
  const [rating, setRating] = useState({ enableRating: true });

  // Publish status
  const [publishStatus, setPublishStatus] = useState("draft");

  // Upload
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const resourceInputRef = useRef(null);
  const [uploading, setUploading] = useState({ video: false, audio: false, resource: false });
  const [uploadProgress, setUploadProgress] = useState({ video: 0, audio: 0, resource: 0 });

  useEffect(() => { fetchLesson(); }, [lessonId]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const data = await apiRequest(`/lessons/${lessonId}`);
      setLesson(data);

      // Info
      setInfo({
        title: data.title || "",
        description: data.description || "",
        estimatedDurationMinutes: data.estimatedDurationMinutes || 0,
        orderIndex: data.orderIndex || 1,
      });

      // Content
      setContent({
        videoUrl: data.videoUrl || "",
        lessonNotes: data.lessonNotes || "",
        downloadableResourceUrls: data.downloadableResourceUrls || "",
      });
      // Parse resources from JSON string
      try {
        const parsed = data.downloadableResourceUrls ? JSON.parse(data.downloadableResourceUrls) : [];
        setResourcesList(Array.isArray(parsed) ? parsed : []);
      } catch { setResourcesList([]); }

      // Audio
      setAudio({ audioUrl: data.audioUrl || "" });

      // Assignment
      setAssignment({
        hasAssignment: data.hasAssignment || false,
        assignmentTitle: data.assignmentTitle || "",
        assignmentInstructions: data.assignmentInstructions || "",
        submissionType: data.assignmentSubmissionType || "Both",
      });

      // Reflection
      setReflection({
        enableReflection: data.enableReflection || false,
        allowTextReflection: data.allowTextReflection !== false,
        allowVoiceReflection: data.allowVoiceReflection || false,
        allowDocumentReflection: data.allowDocumentReflection || false,
      });

      // Community
      setCommunity({
        enableDiscussion: data.enableDiscussion !== false,
        allowReplies: data.allowReplies !== false,
        allowLikes: data.allowLikes !== false,
      });

      // Rating
      setRating({ enableRating: data.enableRating !== false });

      // Publish
      setPublishStatus(data.status || "draft");
    } catch (err) {
      setError(err.message || "Failed to load lesson");
    } finally {
      setLoading(false);
    }
  };

  // ─── Upload with progress ────────────────────────────────────────────────
  const handleFileUpload = async (file, type) => {
    if (!file) return null;
    const uploadType = type === "resource" ? "document" : type;
    const baseUrl = API_BASE || "https://kta-learning-hub-api.onrender.com/api";
    setUploading((prev) => ({ ...prev, [type]: true }));
    setUploadProgress((prev) => ({ ...prev, [type]: 0 }));

    try {
      const token = getToken();
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress((prev) => ({ ...prev, [type]: percent }));
          }
        });
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText);
              const unwrapped = res.data !== undefined ? res.data : res;
              let url = unwrapped?.fileUrl || unwrapped?.url || unwrapped;
              if (url && typeof url === "object") url = url.fileUrl || url.url;
              if (url && typeof url === "string" && url.startsWith("/")) {
                url = baseUrl.replace("/api", "") + url;
              }
              resolve(url);
            } catch { resolve(xhr.responseText); }
          } else { reject(new Error(`Upload failed (${xhr.status})`)); }
        });
        xhr.addEventListener("error", () => reject(new Error("Network error")));
        xhr.open("POST", baseUrl + "/files/upload/" + uploadType);
        if (token) xhr.setRequestHeader("Authorization", "Bearer " + token);
        const formData = new FormData();
        formData.append("file", file);
        xhr.send(formData);
      });
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
    if (url) {
      const newRes = { name: file.name, url };
      const updatedList = [...resourcesList, newRes];
      setResourcesList(updatedList);
      setContent((prev) => ({
        ...prev,
        downloadableResourceUrls: JSON.stringify(updatedList),
      }));
    }
  };

  // ─── Save functions matching backend DTOs exactly ────────────────────────
  const saveInfo = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}`, {
        method: "PUT",
        body: {
          title: info.title,
          description: info.description,
          estimatedDurationMinutes: parseInt(info.estimatedDurationMinutes) || 0,
          orderIndex: parseInt(info.orderIndex) || 1,
        },
      });
      showSuccess();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/content`, {
        method: "PUT",
        body: {
          videoUrl: content.videoUrl || "",
          lessonNotes: content.lessonNotes || "",
          downloadableResourceUrls: content.downloadableResourceUrls || "",
        },
      });
      showSuccess();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const saveAudio = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/audio`, {
        method: "PUT",
        body: { audioUrl: audio.audioUrl || "" },
      });
      showSuccess();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const saveAssignment = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/assignment`, {
        method: "PUT",
        body: {
          hasAssignment: assignment.hasAssignment,
          assignmentTitle: assignment.assignmentTitle || "",
          assignmentInstructions: assignment.assignmentInstructions || "",
          submissionType: assignment.submissionType,
        },
      });
      showSuccess();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const saveReflection = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/reflection`, {
        method: "PUT",
        body: {
          enableReflection: reflection.enableReflection,
          allowTextReflection: reflection.allowTextReflection,
          allowVoiceReflection: reflection.allowVoiceReflection,
          allowDocumentReflection: reflection.allowDocumentReflection,
        },
      });
      showSuccess();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const saveCommunity = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/community`, {
        method: "PUT",
        body: {
          enableDiscussion: community.enableDiscussion,
          allowReplies: community.allowReplies,
          allowLikes: community.allowLikes,
        },
      });
      showSuccess();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const saveRating = async () => {
    setSaving(true);
    try {
      await apiRequest(`/lessons/${lessonId}/rating-settings`, {
        method: "PUT",
        body: { enableRating: rating.enableRating },
      });
      showSuccess();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handlePublish = async (status) => {
  setSaving(true);
  try {
    // Capitalize first letter to match backend enum
    const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    
    await apiRequest(`/lessons/${lessonId}/publish`, {
      method: "PUT",
      body: { Status: capitalizedStatus },  // ← PascalCase: Status, not status
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

  return (
    <div className="min-h-screen bg-slate-50">
      {saveSuccess && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2">
          <CheckCircle2 size={18} /> Saved successfully
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/admin/courses")} className="p-2 hover:bg-slate-100 rounded-xl transition">
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#0B1F3A]">{info.title || "Untitled Lesson"}</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Lesson Builder — {publishStatus === "published" ? "Published" : publishStatus === "draft" ? "Draft" : "Preview"}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              publishStatus === "published" ? "bg-green-50 text-green-600" :
              publishStatus === "draft" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
            }`}>
              {publishStatus === "published" ? <span className="flex items-center gap-1"><Globe size={12} /> Published</span> :
               publishStatus === "draft" ? <span className="flex items-center gap-1"><Lock size={12} /> Draft</span> :
               <span className="flex items-center gap-1"><Eye size={12} /> Preview</span>}
            </span>
          </div>

          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id ? "bg-[#0F2D52] text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`}>
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">{error}</div>}

        {/* INFO TAB */}
        {activeTab === "info" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">Lesson Information</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Title</label>
                  <input type="text" value={info.title}
                    onChange={(e) => setInfo({ ...info, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52]"
                    placeholder="Lesson title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Description</label>
                  <textarea value={info.description}
                    onChange={(e) => setInfo({ ...info, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] resize-none"
                    placeholder="Brief description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Duration (minutes)</label>
                    <input type="number" value={info.estimatedDurationMinutes}
                      onChange={(e) => setInfo({ ...info, estimatedDurationMinutes: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52]"
                      placeholder="15" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Order</label>
                    <input type="number" value={info.orderIndex}
                      onChange={(e) => setInfo({ ...info, orderIndex: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52]"
                      placeholder="1" />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={saveInfo} disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Info"}
            </button>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Video */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                <Video size={20} className="text-[#E79B23]" /> Video Lesson
              </h2>
              <input type="file" accept="video/*" ref={videoInputRef} onChange={onVideoSelect} className="hidden" />
              {content.videoUrl ? (
                <div className="space-y-3">
                  <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center">
                    <video src={content.videoUrl} controls className="w-full h-full rounded-xl" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500 truncate max-w-md">{content.videoUrl}</p>
                    <button onClick={() => setContent({ ...content, videoUrl: "" })} className="text-red-500 text-sm hover:underline">Remove</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => videoInputRef.current?.click()} disabled={uploading.video}
                  className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-[#0F2D52] hover:bg-slate-50 transition disabled:opacity-50">
                  {uploading.video ? (
                    <>
                      <Loader2 className="animate-spin text-[#0F2D52]" size={32} />
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Uploading...</span><span>{uploadProgress.video}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0F66B7] rounded-full transition-all" style={{ width: `${uploadProgress.video}%` }} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={32} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-600">Click to upload video</span>
                      <span className="text-xs text-slate-400">MP4, MOV up to 500MB</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                <FileText size={20} className="text-[#E79B23]" /> Lesson Notes
              </h2>
              <textarea value={content.lessonNotes}
                onChange={(e) => setContent({ ...content, lessonNotes: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] resize-y font-mono text-sm"
                placeholder="Enter detailed lesson notes..." />
            </div>

            {/* Resources */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">Downloadable Resources</h2>
              <input type="file" ref={resourceInputRef} onChange={onResourceSelect} className="hidden" />
              <div className="space-y-3">
                {resourcesList.map((res, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <FileUp size={18} className="text-[#0F2D52]" />
                      <span className="text-sm font-medium text-slate-700">{res.name}</span>
                    </div>
                    <button onClick={() => {
                      const newList = resourcesList.filter((_, i) => i !== idx);
                      setResourcesList(newList);
                      setContent({ ...content, downloadableResourceUrls: JSON.stringify(newList) });
                    }} className="text-red-500 hover:text-red-600"><X size={16} /></button>
                  </div>
                ))}
                <button onClick={() => resourceInputRef.current?.click()} disabled={uploading.resource}
                  className="flex items-center gap-2 text-sm font-medium text-[#0F2D52] hover:underline disabled:opacity-50">
                  {uploading.resource ? (
                    <><Loader2 size={16} className="animate-spin" /><span>Uploading... {uploadProgress.resource}%</span></>
                  ) : (
                    <><Upload size={16} /><span>Add resource</span></>
                  )}
                </button>
              </div>
            </div>

            <button onClick={saveContent} disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2">
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
                <Headphones size={20} className="text-[#E79B23]" /> Audio Companion
              </h2>
              <input type="file" accept="audio/*" ref={audioInputRef} onChange={onAudioSelect} className="hidden" />
              {audio.audioUrl ? (
                <div className="space-y-3">
                  <audio src={audio.audioUrl} controls className="w-full" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500 truncate max-w-md">{audio.audioUrl}</p>
                    <button onClick={() => setAudio({ audioUrl: "" })} className="text-red-500 text-sm hover:underline">Remove</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => audioInputRef.current?.click()} disabled={uploading.audio}
                  className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-[#0F2D52] hover:bg-slate-50 transition disabled:opacity-50">
                  {uploading.audio ? (
                    <>
                      <Loader2 className="animate-spin text-[#0F2D52]" size={32} />
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Uploading...</span><span>{uploadProgress.audio}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0F66B7] rounded-full transition-all" style={{ width: `${uploadProgress.audio}%` }} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={32} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-600">Click to upload audio</span>
                      <span className="text-xs text-slate-400">MP3, WAV up to 100MB</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <button onClick={saveAudio} disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2">
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
                  <ClipboardList size={20} className="text-[#E79B23]" /> Assignment
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={assignment.hasAssignment}
                    onChange={(e) => setAssignment({ ...assignment, hasAssignment: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-[#0F2D52] focus:ring-[#0F2D52]" />
                  <span className="text-sm font-medium text-slate-600">Enable Assignment</span>
                </label>
              </div>
              {assignment.hasAssignment && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Title</label>
                    <input type="text" value={assignment.assignmentTitle}
                      onChange={(e) => setAssignment({ ...assignment, assignmentTitle: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52]"
                      placeholder="e.g. Create a content strategy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Instructions</label>
                    <textarea value={assignment.assignmentInstructions}
                      onChange={(e) => setAssignment({ ...assignment, assignmentInstructions: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] resize-none"
                      placeholder="Detailed instructions..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Submission Type</label>
                    <div className="flex gap-3">
                      {[{value:"Text",label:"Text Only",icon:Type},{value:"Document",label:"Document",icon:FileUp},{value:"Both",label:"Both",icon:Check}].map((opt)=>{
                        const Icon=opt.icon;
                        return (
                          <button key={opt.value} onClick={()=>setAssignment({...assignment,submissionType:opt.value})}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                              assignment.submissionType===opt.value?"bg-[#0F2D52] text-white border-[#0F2D52]":"bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}>
                            <Icon size={16} />{opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button onClick={saveAssignment} disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2">
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
                  <MessageCircle size={20} className="text-[#E79B23]" /> Reflection
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={reflection.enableReflection}
                    onChange={(e) => setReflection({ ...reflection, enableReflection: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-[#0F2D52] focus:ring-[#0F2D52]" />
                  <span className="text-sm font-medium text-slate-600">Enable Reflection</span>
                </label>
              </div>
              {reflection.enableReflection && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">Allow students to submit reflection via:</p>
                  <div className="flex flex-wrap gap-3">
                    {[{key:"allowTextReflection",label:"Text",icon:Type},{key:"allowVoiceReflection",label:"Voice Note",icon:Mic},{key:"allowDocumentReflection",label:"Document",icon:FileUp}].map((opt)=>{
                      const Icon=opt.icon;
                      const checked=reflection[opt.key];
                      return (
                        <label key={opt.key}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border cursor-pointer transition-all ${
                            checked?"bg-[#0F2D52] text-white border-[#0F2D52]":"bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}>
                          <input type="checkbox" checked={checked}
                            onChange={(e)=>setReflection({...reflection,[opt.key]:e.target.checked})} className="hidden" />
                          <Icon size={16} />{opt.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <button onClick={saveReflection} disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2">
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
                  <MessageCircle size={20} className="text-[#E79B23]" /> Community Discussion
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={community.enableDiscussion}
                    onChange={(e) => setCommunity({ ...community, enableDiscussion: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-[#0F2D52] focus:ring-[#0F2D52]" />
                  <span className="text-sm font-medium text-slate-600">Enable Discussion</span>
                </label>
              </div>
              {community.enableDiscussion && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">Discussion settings:</p>
                  <div className="flex flex-wrap gap-3">
                    {[{key:"allowReplies",label:"Allow Replies",icon:Reply},{key:"allowLikes",label:"Allow Likes",icon:ThumbsUp}].map((opt)=>{
                      const Icon=opt.icon;
                      const checked=community[opt.key];
                      return (
                        <label key={opt.key}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border cursor-pointer transition-all ${
                            checked?"bg-[#0F2D52] text-white border-[#0F2D52]":"bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}>
                          <input type="checkbox" checked={checked}
                            onChange={(e)=>setCommunity({...community,[opt.key]:e.target.checked})} className="hidden" />
                          <Icon size={16} />{opt.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <button onClick={saveCommunity} disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2">
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
                  <Star size={20} className="text-[#E79B23]" /> Lesson Rating
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={rating.enableRating}
                    onChange={(e) => setRating({ ...rating, enableRating: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-[#0F2D52] focus:ring-[#0F2D52]" />
                  <span className="text-sm font-medium text-slate-600">Enable Rating</span>
                </label>
              </div>
              <p className="text-sm text-slate-500">Students can rate this lesson from 1-5 stars.</p>
            </div>
            <button onClick={saveRating} disabled={saving}
              className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1E4A7A] transition disabled:opacity-50 flex items-center gap-2">
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
              <p className="text-sm text-slate-500 mb-6">Control visibility. Students only see published lessons.</p>
              <div className="grid gap-4">
                {[{value:"draft",label:"Draft",desc:"Only admins can see. Continue editing.",icon:Lock,color:"amber"},
                  {value:"preview",label:"Preview",desc:"Visible to admins for preview.",icon:Eye,color:"blue"},
                  {value:"published",label:"Published",desc:"Live and visible to enrolled students.",icon:Globe,color:"green"}].map((opt)=>{
                  const Icon=opt.icon;
                  const isActive=publishStatus===opt.value;
                  const colors={amber:isActive?"bg-amber-50 border-amber-300":"bg-white border-slate-200",blue:isActive?"bg-blue-50 border-blue-300":"bg-white border-slate-200",green:isActive?"bg-green-50 border-green-300":"bg-white border-slate-200"};
                  return (
                    <button key={opt.value} onClick={()=>handlePublish(opt.value)} disabled={saving}
                      className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${colors[opt.color]} ${isActive?"ring-2 ring-offset-2 ring-[#0F2D52]":"hover:border-slate-300"}`}>
                      <div className={`p-2 rounded-xl ${opt.color==="amber"?"bg-amber-100 text-amber-600":opt.color==="blue"?"bg-blue-100 text-blue-600":"bg-green-100 text-green-600"}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900">{opt.label}</h3>
                          {isActive && <span className="px-2 py-0.5 rounded-full bg-[#0F2D52] text-white text-xs font-medium">Current</span>}
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
