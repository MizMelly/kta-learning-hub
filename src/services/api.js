const API_BASE = "https://kta-learning-hub-api.onrender.com/api";

const getToken = () => localStorage.getItem("kta_token");

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const isFormData = options.body instanceof FormData;

  const config = {
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === "object" && !isFormData) {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || data.Message || "Something went wrong");
  }

  // Unwrap { data: [...], success: true } responses
  if (data.data !== undefined) return data.data;
  return data;
}

// Auth — LOWERCASE (this works!)
export const auth = {
  register: (body) => apiRequest("/auth/register", { method: "POST", body }),
  login: (body) => apiRequest("/auth/login", { method: "POST", body }),
  getProfile: () => apiRequest("/auth/profile"),
  updateProfile: (body) => apiRequest("/auth/profile", { method: "PUT", body }),
  changePassword: (body) => apiRequest("/auth/change-password", { method: "POST", body }),
};

// Courses — PASCALCASE (from Swagger)
export const courses = {
  getAll: (params = "") => apiRequest(`/Courses${params}`),
  getById: (id) => apiRequest(`/Courses/${id}`),
  create: (body) => apiRequest("/Courses", { method: "POST", body }),
  update: (id, body) => apiRequest(`/Courses/${id}`, { method: "PUT", body }),
  delete: (id) => apiRequest(`/Courses/${id}`, { method: "DELETE" }),
};

// Modules — PASCALCASE
export const modules = {
  getByCourse: (courseId) => apiRequest(`/Modules/course/${courseId}`),
  create: (body) => apiRequest("/Modules", { method: "POST", body }),
  update: (id, body) => apiRequest(`/Modules/${id}`, { method: "PUT", body }),
  delete: (id) => apiRequest(`/Modules/${id}`, { method: "DELETE" }),
  reorder: (body) => apiRequest("/Modules/reorder", { method: "PUT", body }),
};

// Enrollments — PASCALCASE
export const enrollments = {
  getMyCourses: () => apiRequest("/Enrollments/my-courses"),
  check: (courseId) => apiRequest(`/Enrollments/course/${courseId}`),
  enroll: (body) => apiRequest("/Enrollments", { method: "POST", body }),
  pay: (body) => apiRequest("/Enrollments/payment", { method: "POST", body }),
};

// Lessons — PASCALCASE
export const lessons = {
  getById: (id) => apiRequest(`/Lessons/${id}`),
  getByModule: (moduleId) => apiRequest(`/Lessons/module/${moduleId}`),
  getStudentLesson: (id) => apiRequest(`/Lessons/${id}/student`),
  create: (body) => apiRequest("/Lessons", { method: "POST", body }),
  updateContent: (id, body) => apiRequest(`/Lessons/${id}/content`, { method: "PUT", body }),
  updateAssignment: (id, body) => apiRequest(`/Lessons/${id}/assignment`, { method: "PUT", body }),
  updateReflection: (id, body) => apiRequest(`/Lessons/${id}/reflection`, { method: "PUT", body }),
  updateCommunity: (id, body) => apiRequest(`/Lessons/${id}/community`, { method: "PUT", body }),
  updateRatingSettings: (id, body) => apiRequest(`/Lessons/${id}/rating-settings`, { method: "PUT", body }),
  publish: (id, body) => apiRequest(`/Lessons/${id}/publish`, { method: "PUT", body }),
};

// Learning — PASCALCASE
export const learning = {
  getProgress: (lessonId) => apiRequest(`/Learning/progress/${lessonId}`),
  complete: (lessonId, body) => apiRequest(`/Learning/progress/${lessonId}/complete`, { method: "POST", body }),
  submitAssignment: (body) => apiRequest("/Learning/assignments/submit", { method: "POST", body }),
  getAllAssignments: (params = "") => apiRequest(`/Learning/assignments${params}`),
  reviewAssignment: (submissionId, body) => apiRequest(`/Learning/assignments/${submissionId}/review`, { method: "PUT", body }),
  submitReflection: (body) => apiRequest("/Learning/reflections/submit", { method: "POST", body }),
  getAllReflections: (params = "") => apiRequest(`/Learning/reflections${params}`),
  reviewReflection: (submissionId, body) => apiRequest(`/Learning/reflections/${submissionId}/review`, { method: "PUT", body }),
  submitRating: (body) => apiRequest("/Learning/ratings/submit", { method: "POST", body }),
};

// Discussions — PASCALCASE
export const discussions = {
  getByLesson: (lessonId) => apiRequest(`/Discussions/lesson/${lessonId}`),
  getAll: (params = "") => apiRequest(`/Discussions${params}`),
  postComment: (body) => apiRequest("/Discussions", { method: "POST", body }),
  deleteComment: (commentId) => apiRequest(`/Discussions/${commentId}`, { method: "DELETE" }),
  likeComment: (commentId) => apiRequest(`/Discussions/${commentId}/like`, { method: "POST" }),
  toggleHide: (commentId) => apiRequest(`/Discussions/${commentId}/toggle-hide`, { method: "PUT" }),
  togglePin: (commentId) => apiRequest(`/Discussions/${commentId}/toggle-pin`, { method: "PUT" }),
};

// Files — PASCALCASE
export const files = {
  uploadVideo: (formData) => apiRequest("/Files/upload/video", { method: "POST", body: formData }),
  uploadAudio: (formData) => apiRequest("/Files/upload/audio", { method: "POST", body: formData }),
  uploadDocument: (formData) => apiRequest("/Files/upload/document", { method: "POST", body: formData }),
  uploadImage: (formData) => apiRequest("/Files/upload/image", { method: "POST", body: formData }),
};

// Admin — PASCALCASE
export const admin = {
  getDashboard: () => apiRequest("/Admin/dashboard"),
  getStudents: (params = "") => apiRequest(`/Admin/students${params}`),
  getStudent: (id) => apiRequest(`/Admin/students/${id}`),
  updateStudentStatus: (id, body) => apiRequest(`/Admin/students/${id}/status`, { method: "PUT", body }),
  getCourseAnalytics: (courseId) => apiRequest(`/Admin/analytics/course/${courseId}`),
  getPlatformAnalytics: () => apiRequest("/Admin/analytics/platform"),
};

export default apiRequest;
