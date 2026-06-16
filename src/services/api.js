const API_BASE = "https://kta-learning-hub-api.onrender.com/api";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("kta_token");

// Generic fetch wrapper
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === "object") {
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
  getStudentLesson: (id) => apiRequest(`/lessons/${id}/student`),
  getByModule: (moduleId) => apiRequest(`/lessons/module/${moduleId}`),
};

// Learning (progress, assignments, reflections, ratings)
export const learning = {
  // Progress
  getProgress: (lessonId) => apiRequest(`/learning/progress/${lessonId}`),
  complete: (lessonId) => apiRequest(`/learning/progress/${lessonId}/complete`, { method: "POST" }),

  // Assignments
  submitAssignment: (body) => apiRequest("/learning/assignments/submit", { method: "POST", body }),
  getAssignment: (submissionId) => apiRequest(`/learning/assignments/${submissionId}`),
  getAllAssignments: () => apiRequest("/learning/assignments"),
  reviewAssignment: (submissionId, body) => apiRequest(`/learning/assignments/${submissionId}/review`, { method: "PUT", body }),

  // Reflections
  submitReflection: (body) => apiRequest("/learning/reflections/submit", { method: "POST", body }),
  getReflection: (submissionId) => apiRequest(`/learning/reflections/${submissionId}`),
  getAllReflections: () => apiRequest("/learning/reflections"),
  reviewReflection: (submissionId, body) => apiRequest(`/learning/reflections/${submissionId}/review`, { method: "PUT", body }),

  // Ratings
  submitRating: (body) => apiRequest("/learning/ratings/submit", { method: "POST", body }),
  getLessonRating: (lessonId) => apiRequest(`/learning/ratings/lesson/${lessonId}`),
};

// Discussions
export const discussions = {
  getByLesson: (lessonId) => apiRequest(`/discussions/lesson/${lessonId}`),
  getAll: () => apiRequest("/discussions"),
  postComment: (body) => apiRequest("/discussions", { method: "POST", body }),
  updateComment: (commentId, body) => apiRequest(`/discussions/${commentId}`, { method: "PUT", body }),
  deleteComment: (commentId) => apiRequest(`/discussions/${commentId}`, { method: "DELETE" }),
  likeComment: (commentId) => apiRequest(`/discussions/${commentId}/like`, { method: "POST" }),
  toggleHide: (commentId) => apiRequest(`/discussions/${commentId}/toggle-hide`, { method: "PUT" }),
  togglePin: (commentId) => apiRequest(`/discussions/${commentId}/toggle-pin`, { method: "PUT" }),
};

// Files
export const files = {
  uploadVideo: (formData) => apiRequest("/files/upload-video", { method: "POST", body: formData, headers: {} }),
  uploadAudio: (formData) => apiRequest("/files/upload-audio", { method: "POST", body: formData, headers: {} }),
  uploadDocument: (formData) => apiRequest("/files/upload-document", { method: "POST", body: formData, headers: {} }),
  uploadImage: (formData) => apiRequest("/files/upload-image", { method: "POST", body: formData, headers: {} }),
};

// Admin
export const admin = {
  getDashboard: () => apiRequest("/admin/dashboard"),
  getStudents: () => apiRequest("/admin/students"),
  createStudent: (body) => apiRequest("/admin/students", { method: "POST", body }),
  getStudent: (id) => apiRequest(`/admin/students/${id}`),
  getStudentStatus: (id) => apiRequest(`/admin/students/${id}/status`),
  getCourseAnalytics: (courseId) => apiRequest(`/admin/analytics/courses/${courseId}`),
  getPlatformAnalytics: () => apiRequest("/admin/analytics/platform"),
  getSettings: () => apiRequest("/admin/settings"),
  updateSettings: (body) => apiRequest("/admin/settings", { method: "PUT", body }),
};

export default apiRequest;