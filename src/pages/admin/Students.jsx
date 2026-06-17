import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Loader2,
  User,
  Mail,
  BookOpen,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import { admin } from "../../services/api";

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await admin.getStudents();
      setStudents(res.data || res || []);
    } catch (err) {
      setError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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
      await admin.updateStudentStatus(id, { status: newStatus });
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    } catch (err) {
      alert("Failed to update status: " + err.message);
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
                        <span>{student.enrolledCourses || 0}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-[#E79B23] h-2 rounded-full"
                            style={{ width: `${student.progressPercentage || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">
                          {student.progressPercentage || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CheckCircle2 size={14} />
                        <span>{student.submissionsCount || 0}</span>
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
                      <button
                        onClick={() => toggleStatus(student.id, student.status)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          student.status === "Active"
                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {student.status || "Active"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => navigate(`/admin/students/${student.id}`)}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#0F2D52] transition"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
