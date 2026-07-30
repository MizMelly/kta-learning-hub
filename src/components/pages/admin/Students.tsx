import {
  Search,
  Loader2,
  User,
  BookOpen,
  MoreHorizontal,
  Eye,
  Power,
  PowerOff,
  X,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import { admin } from "../../../services/api";
import { useEffect, useState} from "react";


interface Enrollment {
  id: number;
  courseTitle?: string;
  status?: string;
  progressPercentage?: number;
  isPaid?: boolean;
  coursePrice?: number;
  enrolledAt?: string;
}


interface Student {
  id: number;
  fullName: string;
  email: string;
  status: "Active" | "Inactive";

  coursesEnrolled?: number;
  enrolledCourses?: number;

  averageProgress?: number;
  progressPercentage?: number;

  assignmentsSubmitted?: number;
  reflectionsSubmitted?: number;

  lastLogin?: string;
  createdAt?: string;

  enrollments?: Enrollment[];
}


export default function Students() {

  const [students, setStudents] = useState<Student[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);
interface StudentsApiResponse {
  items?: Student[];
  students?: Student[];
}

useEffect(() => {
  let mounted = true;

  const fetchStudents = async () => {
    try {
      if (mounted) {
        setLoading(true);
        setError(null);
      }

      const data = (await admin.getStudents()) as
        | Student[]
        | StudentsApiResponse;

      if (!mounted) return;

      setStudents(
        Array.isArray(data)
          ? data
          : data.items ?? data.students ?? []
      );
    } catch (err) {
      if (!mounted) return;

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load students"
      );
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  void fetchStudents();

  return () => {
    mounted = false;
  };
}, []);
  // Close menu when clicking outside


const filteredStudents = students.filter(
    (student: Student) => {

      const matchesSearch =
        (student.fullName || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (student.email || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||

        (statusFilter === "active" &&
          student.status === "Active") ||

        (statusFilter === "inactive" &&
          student.status === "Inactive");


      return matchesSearch && matchesStatus;

    }
  );

  const toggleStatus = async (
    id: number,
    currentStatus: Student["status"]
  ) => {


    const newStatus =
      currentStatus === "Active"
        ? "Inactive"
        : "Active";


    try {


      await admin.updateStudentStatus(
        id,
        {
          Status: newStatus
        }
      );


      setStudents((prev: Student[]) =>
        prev.map((student: Student) =>
          student.id === id
            ? {
                ...student,
                status: newStatus
              }
            : student
        )
      );


      setOpenMenu(null);


    } catch (err: unknown) {


      alert(
        "Failed to update status: " +
          (
            err instanceof Error
              ? err.message
              : "Unknown error"
          )
      );

    }

  };
const viewDetails = async (student: Student) => {
  try {
    const data = (await admin.getStudent(
      student.id
    )) as Student;

    setSelectedStudent(data);
    setOpenMenu(null);
  } catch (err) {
    alert(
      "Failed to load student details: " +
        (err instanceof Error
          ? err.message
          : "Unknown error")
    );
  }
};
    return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0B1F3A]">
          Students
        </h1>

        <p className="text-slate-500 mt-1">
          Manage and monitor all enrolled students.
        </p>
      </div>

      {/* Search and Filter */}

      <div className="flex flex-col sm:flex-row gap-3">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name or email..."
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2D52] text-sm"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm"
        >

          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

        </select>

      </div>

      {/* Loading */}

      {loading && (

        <div className="flex justify-center py-16">

          <Loader2
            className="animate-spin text-[#0F2D52]"
            size={32}
          />

        </div>

      )}

      {/* Error */}

      {!loading && error && (

        <div className="bg-red-50 text-red-600 rounded-2xl p-5">

          {error}

        </div>

      )}

      {/* Empty */}

      {!loading &&
        !error &&
        filteredStudents.length === 0 && (

        <div className="bg-white border rounded-2xl p-12 text-center">

          <User
            size={40}
            className="mx-auto text-slate-300 mb-4"
          />

          <p className="text-slate-500">
            No students found.
          </p>

        </div>

      )}

      {/* Students Table */}

      {!loading &&
        !error &&
        filteredStudents.length > 0 && (

        <div className="bg-white rounded-2xl border overflow-hidden">

          <div className="overflow-x-auto">


            <table className="w-full text-sm">


              <thead className="bg-slate-50 border-b">


                <tr>

                  <th className="text-left px-5 py-3">
                    Student
                  </th>

                  <th className="text-left px-5 py-3">
                    Courses
                  </th>

                  <th className="text-left px-5 py-3">
                    Progress
                  </th>

                  <th className="text-left px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3">
                  </th>


                </tr>


              </thead>

              <tbody className="divide-y">


                {filteredStudents.map(
                  (student: Student) => (

                  <tr
                    key={student.id}
                    className="hover:bg-slate-50"
                  >



                    <td className="px-5 py-4">


                      <div className="flex items-center gap-3">


                        <div className="h-10 w-10 rounded-full bg-[#0F2D52] text-white flex items-center justify-center font-semibold">


                          {student.fullName
                            .split(" ")
                            .map(
                              (n: string) =>
                                n[0]
                            )
                            .join("")
                            .slice(0,2)
                            .toUpperCase()
                          }


                        </div>



                        <div>

                          <p className="font-medium">
                            {student.fullName}
                          </p>

                          <p className="text-xs text-slate-400">
                            {student.email}
                          </p>

                        </div>


                      </div>


                    </td>

                    <td className="px-5 py-4">


                      <div className="flex items-center gap-2">

                        <BookOpen size={14}/>

                        {student.coursesEnrolled ??
                         student.enrolledCourses ??
                         0}

                      </div>


                    </td>

                    <td className="px-5 py-4">


                      <div className="flex items-center gap-2">


                        <div className="w-20 bg-slate-200 rounded-full h-2">


                          <div

                            className="bg-[#E79B23] h-2 rounded-full"

                            style={{
                              width:
                              `${student.averageProgress ??
                              student.progressPercentage ??
                              0}%`
                            }}

                          />


                        </div>

                        <span>

                          {student.averageProgress ??
                           student.progressPercentage ??
                           0}%

                        </span>


                      </div>


                    </td>

                    <td className="px-5 py-4">


                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          student.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-slate-100 text-slate-500"
                        }`}
                      >

                        {student.status}

                      </span>


                    </td>

                    <td className="px-5 py-4 relative">


                      <button

                        onClick={(e)=>{

                          e.stopPropagation();

                          setOpenMenu(
                            openMenu === student.id
                            ? null
                            : student.id
                          );

                        }}

                        className="p-2 hover:bg-slate-100 rounded-xl"

                      >

                        <MoreHorizontal size={18}/>

                      </button>

                      {openMenu === student.id && (

                        <div className="absolute right-5 top-12 bg-white border rounded-xl shadow-lg w-48 z-50">


                          <button

                            onClick={() =>
                              viewDetails(student)
                            }

                            className="flex gap-2 items-center w-full px-4 py-3 hover:bg-slate-50"

                          >

                            <Eye size={16}/>

                            View Details

                          </button>

                          <button

                            onClick={() =>
                              toggleStatus(
                                student.id,
                                student.status
                              )
                            }

                            className="flex gap-2 items-center w-full px-4 py-3 hover:bg-slate-50"

                          >


                            {student.status === "Active"
                            ?
                              <PowerOff size={16}/>
                            :
                              <Power size={16}/>
                            }


                            {
                              student.status === "Active"
                              ? "Deactivate"
                              : "Activate"
                            }


                          </button>


                        </div>

                      )}



                    </td>



                  </tr>

                ))
              
              }

              </tbody>


            </table>


          </div>


        </div>


      )}

      {/* Details Modal */}

      {selectedStudent && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">


          <div className="bg-white rounded-3xl max-w-2xl w-full p-6">


            <div className="flex justify-between items-center mb-6">


              <div>


                <h2 className="text-xl font-bold">

                  {selectedStudent.fullName}

                </h2>


                <p className="text-sm text-slate-400">

                  {selectedStudent.email}

                </p>


              </div>

              <button

                onClick={() =>
                  setSelectedStudent(null)
                }

              >

                <X/>

              </button>


            </div>

            <div className="grid grid-cols-2 gap-4">


              <div className="bg-slate-50 p-4 rounded-xl">

                <GraduationCap/>

                <p className="text-2xl font-bold">

                  {selectedStudent.coursesEnrolled ?? 0}

                </p>

                <span>
                  Courses
                </span>

              </div>

              <div className="bg-slate-50 p-4 rounded-xl">

                <TrendingUp/>

                <p className="text-2xl font-bold">

                  {selectedStudent.averageProgress ?? 0}%

                </p>

                <span>
                  Progress
                </span>

              </div>


            </div>



          </div>


        </div>


      )}

    </div>
  );
}