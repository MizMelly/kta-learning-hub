const API_BASE = "https://kta-learning-hub-api.onrender.com/api";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("kta_token");

// Generic fetch wrapper
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
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// Auth
export const auth = {
  register: (body) => apiRequest("/auth/register", { method: "POST", body }),
  login: (body) => apiRequest("/auth/login", { method: "POST", body }),
  getProfile: () => apiRequest("/auth/profile"),
  updateProfile: (body) => apiRequest("/auth/profile", { method: "PUT", body }),
  changePassword: (body) => apiRequest("/auth/change-password", { method: "POST", body }),
};

// Courses
export const courses = {
  getAll: () => apiRequest("/courses/published"),
  getById: (id) => apiRequest(`/courses/${id}`),
  create: (body) => apiRequest("/courses", { method: "POST", body }),
  update: (id, body) => apiRequest(`/courses/${id}`, { method: "PUT", body }),
  delete: (id) => apiRequest(`/courses/${id}`, { method: "DELETE" }),
};

// Modules
export const modules = {
  getByCourse: (courseId) => apiRequest(`/modules/course/${courseId}`),
  create: (body) => apiRequest("/modules", { method: "POST", body }),
  update: (id, body) => apiRequest(`/modules/${id}`, { method: "PUT", body }),
  delete: (id) => apiRequest(`/modules/${id}`, { method: "DELETE" }),
  reorder: (body) => apiRequest("/modules/reorder", { method: "PUT", body }),
};

// Enrollments
export const enrollments = {
  getMyCourses: () => apiRequest("/enrollments/my-courses"),
  check: (courseId) => apiRequest(`/enrollments/course/${courseId}`),
  enroll: (body) => apiRequest("/enrollments", { method: "POST", body }),
  pay: (body) => apiRequest("/enrollments/payment", { method: "POST", body }),
};

// Lessons
export const lessons = {
  getById: (id) => apiRequest(`/lessons/${id}`),
  getByModule: (moduleId) => apiRequest(`/lessons/module/${moduleId}`),
  getStudentLesson: (id) => apiRequest(`/lessons/${id}/student`),
  create: (body) => apiRequest("/lessons", { method: "POST", body }),
  updateContent: (id, body) => apiRequest(`/lessons/${id}/content`, { method: "PUT", body }),
  updateAssignment: (id, body) => apiRequest(`/lessons/${id}/assignment`, { method: "PUT", body }),
  updateReflection: (id, body) => apiRequest(`/lessons/${id}/reflection`, { method: "PUT", body }),
  updateCommunity: (id, body) => apiRequest(`/lessons/${id}/community`, { method: "PUT", body }),
  updateRatingSettings: (id, body) => apiRequest(`/lessons/${id}/rating-settings`, { method: "PUT", body }),
  publish: (id, body) => apiRequest(`/lessons/${id}/publish`, { method: "PUT", body }),
};

// Learning (progress, assignments, reflections, ratings)
export const learning = {
  // Progress
  getProgress: (lessonId) => apiRequest(`/learning/progress/${lessonId}`),
  complete: (lessonId, body) => apiRequest(`/learning/progress/${lessonId}/complete`, { method: "POST", body }),

  // Assignments
  submitAssignment: (body) => apiRequest("/learning/assignments/submit", { method: "POST", body }),
  getAllAssignments: (params = "") => apiRequest(`/learning/assignments${params}`),
  reviewAssignment: (submissionId, body) => apiRequest(`/learning/assignments/${submissionId}/review`, { method: "PUT", body }),

  // Reflections
  submitReflection: (body) => apiRequest("/learning/reflections/submit", { method: "POST", body }),
  getAllReflections: (params = "") => apiRequest(`/learning/reflections${params}`),
  reviewReflection: (submissionId, body) => apiRequest(`/learning/reflections/${submissionId}/review`, { method: "PUT", body }),

  // Ratings
  submitRating: (body) => apiRequest("/learning/ratings/submit", { method: "POST", body }),
};

// Discussions
export const discussions = {
  getByLesson: (lessonId) => apiRequest(`/discussions/lesson/${lessonId}`),
  getAll: (params = "") => apiRequest(`/discussions${params}`),
  postComment: (body) => apiRequest("/discussions", { method: "POST", body }),
  deleteComment: (commentId) => apiRequest(`/discussions/${commentId}`, { method: "DELETE" }),
  likeComment: (commentId) => apiRequest(`/discussions/${commentId}/like`, { method: "POST" }),
  toggleHide: (commentId) => apiRequest(`/discussions/${commentId}/toggle-hide`, { method: "PUT" }),
  togglePin: (commentId) => apiRequest(`/discussions/${commentId}/toggle-pin`, { method: "PUT" }),
};

// Files
export const files = {
  uploadVideo: (formData) => apiRequest("/files/upload/video", { method: "POST", body: formData }),
  uploadAudio: (formData) => apiRequest("/files/upload/audio", { method: "POST", body: formData }),
  uploadDocument: (formData) => apiRequest("/files/upload/document", { method: "POST", body: formData }),
  uploadImage: (formData) => apiRequest("/files/upload/image", { method: "POST", body: formData }),
};

// Admin
export const admin = {
  getDashboard: () => apiRequest("/admin/dashboard"),
  getStudents: (params = "") => apiRequest(`/admin/students${params}`),
  getStudent: (id) => apiRequest(`/admin/students/${id}`),
  updateStudentStatus: (id, body) => apiRequest(`/admin/students/${id}/status`, { method: "PUT", body }),
  getCourseAnalytics: (courseId) => apiRequest(`/admin/analytics/course/${courseId}`),
  getPlatformAnalytics: () => apiRequest("/admin/analytics/platform"),
};

export default apiRequest;