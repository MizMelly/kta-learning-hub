import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Loader2,
  User,
  BookOpen,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Eye,
  Power,
  PowerOff,
  X,
  GraduationCap,
  FileText,
  NotebookPen,
  TrendingUp,
} from "lucide-react";
import { admin } from "../../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await admin.getStudents();
      const data = res.data || res;
      setStudents(Array.isArray(data) ? data : data?.items || data?.students || []);
    } catch (err) {
      setError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchStudents();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchStudents]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    if (openMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openMenu]);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      (s.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.email || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && s.status === "Active") ||
      (statusFilter === "inactive" && s.status === "Inactive");
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await admin.updateStudentStatus(id, { Status: newStatus });
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
      setOpenMenu(null);
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const viewDetails = async (student) => {
    try {
      const res = await admin.getStudent(student.id);
      const data = res.data || res;
      setSelectedStudent(data);
      setOpenMenu(null);
    } catch (err) {
      alert("Failed to load student details: " + err.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0B1F3A]">Students</h1>
        <p className="text-slate-500 mt-1">
          Manage and monitor all enrolled students.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] text-sm bg-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#0F2D52]" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 rounded-2xl p-5 text-sm">
          {error}
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <User size={40} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">No students found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                    Student
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                    Courses
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                    Progress
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                    Submissions
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                    Last Login
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                    Status
                  </th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#0F2D52] text-white flex items-center justify-center font-semibold text-sm">
                          {(student.fullName || "?")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-[#0B1F3A]">
                            {student.fullName || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <BookOpen size={14} />
                        <span>{student.coursesEnrolled || student.enrolledCourses || 0}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-[#E79B23] h-2 rounded-full"
                            style={{ width: `${student.averageProgress || student.progressPercentage || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">
                          {student.averageProgress || student.progressPercentage || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CheckCircle2 size={14} />
                        <span>{(student.assignmentsSubmitted || 0) + (student.reflectionsSubmitted || 0)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {student.lastLogin
                          ? new Date(student.lastLogin).toLocaleDateString()
                          : "Never"}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {student.status || "Active"}
                      </span>
                    </td>
                    <td className="px-5 py-4 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(openMenu === student.id ? null : student.id);
                        }}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#0F2D52] transition"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenu === student.id && (
                        <div
                          className="absolute right-5 top-12 z-50 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => viewDetails(student)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                          >
                            <Eye size={16} className="text-[#0F2D52]" />
                            View Details
                          </button>
                          <button
                            onClick={() => toggleStatus(student.id, student.status)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                          >
                            {student.status === "Active" ? (
                              <>
                                <PowerOff size={16} className="text-amber-500" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Power size={16} className="text-green-500" />
                                Activate
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#0F2D52] text-white flex items-center justify-center font-bold text-lg">
                  {(selectedStudent.fullName || "?")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0B1F3A]">
                    {selectedStudent.fullName || "Unknown"}
                  </h2>
                  <p className="text-sm text-slate-400">{selectedStudent.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <GraduationCap size={20} className="mx-auto text-[#0F2D52] mb-2" />
                <p className="text-2xl font-bold text-[#0B1F3A]">
                  {selectedStudent.coursesEnrolled || 0}
                </p>
                <p className="text-xs text-slate-500">Courses</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <TrendingUp size={20} className="mx-auto text-[#E79B23] mb-2" />
                <p className="text-2xl font-bold text-[#0B1F3A]">
                  {selectedStudent.averageProgress || 0}%
                </p>
                <p className="text-xs text-slate-500">Avg Progress</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <FileText size={20} className="mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold text-[#0B1F3A]">
                  {selectedStudent.assignmentsSubmitted || 0}
                </p>
                <p className="text-xs text-slate-500">Assignments</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <NotebookPen size={20} className="mx-auto text-blue-500 mb-2" />
                <p className="text-2xl font-bold text-[#0B1F3A]">
                  {selectedStudent.reflectionsSubmitted || 0}
                </p>
                <p className="text-xs text-slate-500">Reflections</p>
              </div>
            </div>

            {/* Status & Dates */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <span
                  className={`text-sm font-semibold ${
                    selectedStudent.status === "Active"
                      ? "text-green-600"
                      : "text-slate-500"
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Last Login</span>
                <span className="text-sm text-[#0B1F3A]">
                  {selectedStudent.lastLogin
                    ? new Date(selectedStudent.lastLogin).toLocaleString()
                    : "Never"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Joined</span>
                <span className="text-sm text-[#0B1F3A]">
                  {selectedStudent.createdAt
                    ? new Date(selectedStudent.createdAt).toLocaleDateString()
                    : "—"}
                </span>
              </div>
            </div>

            {/* Enrollments */}
            {selectedStudent.enrollments && selectedStudent.enrollments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[#0B1F3A] mb-3">Enrollments</h3>
                <div className="space-y-3">
                  {selectedStudent.enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="border border-slate-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-[#0B1F3A]">
                          {enrollment.courseTitle || "—"}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            enrollment.status === "Active"
                              ? "bg-green-50 text-green-600"
                              : enrollment.status === "Completed"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>Progress: {enrollment.progressPercentage || 0}%</span>
                        <span>·</span>
                        <span>
                          {enrollment.isPaid ? "Paid" : "Unpaid"} · ₦
                          {(enrollment.coursePrice || 0).toLocaleString()}
                        </span>
                        <span>·</span>
                        <span>
                          Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}