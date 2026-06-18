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

  // Handle empty responses
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || data.Message || "Something went wrong");
  }

  return data;
}

// Auth
export const auth = {
  register: (body) => apiRequest("/Auth/register", { method: "POST", body }),
  login: (body) => apiRequest("/Auth/login", { method: "POST", body }),
  getProfile: () => apiRequest("/Auth/profile"),
  updateProfile: (body) => apiRequest("/Auth/profile", { method: "PUT", body }),
  changePassword: (body) => apiRequest("/Auth/change-password", { method: "POST", body }),
};

// Courses
export const courses = {
  getAll: () => apiRequest("/Courses/published"),
  getById: (id) => apiRequest(`/Courses/${id}`),
  create: (body) => apiRequest("/Courses", { method: "POST", body }),
  update: (id, body) => apiRequest(`/Courses/${id}`, { method: "PUT", body }),
  delete: (id) => apiRequest(`/Courses/${id}`, { method: "DELETE" }),
};

// Modules
export const modules = {
  getByCourse: (courseId) => apiRequest(`/Modules/course/${courseId}`),
  create: (body) => apiRequest("/Modules", { method: "POST", body }),
  update: (id, body) => apiRequest(`/Modules/${id}`, { method: "PUT", body }),
  delete: (id) => apiRequest(`/Modules/${id}`, { method: "DELETE" }),
  reorder: (body) => apiRequest("/Modules/reorder", { method: "PUT", body }),
};

// Enrollments
export const enrollments = {
  getMyCourses: () => apiRequest("/Enrollments/my-courses"),
  check: (courseId) => apiRequest(`/Enrollments/course/${courseId}`),
  enroll: (body) => apiRequest("/Enrollments", { method: "POST", body }),
  pay: (body) => apiRequest("/Enrollments/payment", { method: "POST", body }),
};

// Lessons
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

// Learning (progress, assignments, reflections, ratings)
export const learning = {
  // Progress
  getProgress: (lessonId) => apiRequest(`/Learning/progress/${lessonId}`),
  complete: (lessonId, body) => apiRequest(`/Learning/progress/${lessonId}/complete`, { method: "POST", body }),

  // Assignments
  submitAssignment: (body) => apiRequest("/Learning/assignments/submit", { method: "POST", body }),
  getAllAssignments: (params = "") => apiRequest(`/Learning/assignments${params}`),
  reviewAssignment: (submissionId, body) => apiRequest(`/Learning/assignments/${submissionId}/review`, { method: "PUT", body }),

  // Reflections
  submitReflection: (body) => apiRequest("/Learning/reflections/submit", { method: "POST", body }),
  getAllReflections: (params = "") => apiRequest(`/Learning/reflections${params}`),
  reviewReflection: (submissionId, body) => apiRequest(`/Learning/reflections/${submissionId}/review`, { method: "PUT", body }),

  // Ratings
  submitRating: (body) => apiRequest("/Learning/ratings/submit", { method: "POST", body }),
};

// Discussions
export const discussions = {
  getByLesson: (lessonId) => apiRequest(`/Discussions/lesson/${lessonId}`),
  getAll: (params = "") => apiRequest(`/Discussions${params}`),
  postComment: (body) => apiRequest("/Discussions", { method: "POST", body }),
  deleteComment: (commentId) => apiRequest(`/Discussions/${commentId}`, { method: "DELETE" }),
  likeComment: (commentId) => apiRequest(`/Discussions/${commentId}/like`, { method: "POST" }),
  toggleHide: (commentId) => apiRequest(`/Discussions/${commentId}/toggle-hide`, { method: "PUT" }),
  togglePin: (commentId) => apiRequest(`/Discussions/${commentId}/toggle-pin`, { method: "PUT" }),
};

// Files
export const files = {
  uploadVideo: (formData) => apiRequest("/Files/upload/video", { method: "POST", body: formData }),
  uploadAudio: (formData) => apiRequest("/Files/upload/audio", { method: "POST", body: formData }),
  uploadDocument: (formData) => apiRequest("/Files/upload/document", { method: "POST", body: formData }),
  uploadImage: (formData) => apiRequest("/Files/upload/image", { method: "POST", body: formData }),
};

// Admin
export const admin = {
  getDashboard: () => apiRequest("/Admin/dashboard"),
  getStudents: (params = "") => apiRequest(`/Admin/students${params}`),
  getStudent: (id) => apiRequest(`/Admin/students/${id}`),
  updateStudentStatus: (id, body) => apiRequest(`/Admin/students/${id}/status`, { method: "PUT", body }),
  getCourseAnalytics: (courseId) => apiRequest(`/Admin/analytics/course/${courseId}`),
  getPlatformAnalytics: () => apiRequest("/Admin/analytics/platform"),
};

export default apiRequest;
