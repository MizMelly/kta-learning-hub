import { useState, useEffect } from "react";
import {
  Plus,
  Loader2,
  Trash2,
  ChevronRight,
  Globe,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateCourseModal from "../../admin/courses/CreateCourseModal";
import { courses as coursesApi } from "../../../services/api";
import type { Course } from "../../../services/api";

export default function Courses() {
  const navigate = useNavigate();

  const [courseList, setCourseList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const [publishing, setPublishing] = useState<
    Record<number, boolean>
  >({});


  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await coursesApi.getAllAdmin();

     const data: Course[] = Array.isArray(response)
  ? response
  : [];


      setCourseList(
        data.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description ?? "",
          duration: course.duration ?? "",
          price: course.price ?? 0,
          status: course.status ?? "Draft",
          isPublished: course.isPublished ?? false,
          totalModules: course.totalModules ?? 0,
          totalLessons: course.totalLessons ?? 0,
        }))
      );

    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load courses."
      );

    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const loadCourses = async () => {
    await fetchCourses();
  };

  loadCourses();
}, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Delete this course? This action cannot be undone."
    );

    if (!confirmed) return;


    try {
      await coursesApi.delete(id);

      setCourseList((prev) =>
        prev.filter(
          (course) => course.id !== id
        )
      );

    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to delete course."
      );
    }
  };



  const handlePublishToggle = async (
    course: Course
  ) => {

    const newStatus =
      course.status?.toLowerCase() === "published"
        ? "Draft"
        : "Published";


    setPublishing((prev) => ({
      ...prev,
      [course.id]: true,
    }));


    try {

      await coursesApi.update(
        course.id,
        {
          status: newStatus,
        }
      );


      setCourseList((prev) =>
        prev.map((item) =>
          item.id === course.id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );


    } catch (err) {

      alert(
        err instanceof Error
          ? err.message
          : "Failed to update course status."
      );

    } finally {

      setPublishing((prev) => ({
        ...prev,
        [course.id]: false,
      }));

    }
  };



  const getStatusBadge = (
    status?: string
  ) => {

    const published =
      status?.toLowerCase() === "published";


    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
          published
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >

        {published ? (
          <Globe size={12}/>
        ) : (
          <Lock size={12}/>
        )}

        {published ? "Published" : "Draft"}

      </span>
    );
  };



  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">


      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
            Courses
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all courses on the platform.
          </p>
        </div>


        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-2xl bg-[#0F66B7] px-5 py-3 font-semibold text-white"
        >
          <Plus size={18}/>
          Create Course
        </button>

      </div>



      {loading ? (

        <div className="flex justify-center py-20">
          <Loader2
            size={34}
            className="animate-spin text-[#0F66B7]"
          />
        </div>


      ) : error ? (

        <div className="rounded-2xl bg-red-50 p-5 text-red-600">
          {error}
        </div>


      ) : courseList.length === 0 ? (

        <div className="rounded-3xl border bg-white p-12 text-center">

          <p className="mb-5 text-gray-500">
            No courses have been created yet.
          </p>

          <button
            onClick={() => setShowCreate(true)}
            className="rounded-2xl bg-[#0F66B7] px-6 py-3 font-semibold text-white"
          >
            Create your first course
          </button>

        </div>


      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {courseList.map((course)=>(

            <div
              key={course.id}
              className="flex flex-col rounded-3xl border bg-white p-6 shadow-sm hover:shadow-lg"
            >

              <div className="mb-4 flex justify-between gap-3">

                <h3 className="text-lg font-semibold text-[#0B1F3A]">
                  {course.title}
                </h3>

                {getStatusBadge(course.status)}

              </div>


              <p className="mb-5 text-sm text-gray-500">
                {course.description ||
                  "No course description available."}
              </p>



              <div className="mb-5 flex justify-between rounded-2xl bg-slate-50 p-4 text-sm">


                <div>
                  <p className="font-semibold">
                    {course.totalModules ?? 0}
                  </p>

                  <p className="text-gray-500">
                    Modules
                  </p>
                </div>


                <div>
                  <p className="font-semibold">
                    {course.totalLessons ?? 0}
                  </p>

                  <p className="text-gray-500">
                    Lessons
                  </p>
                </div>



                <div>
                  <p className="font-semibold">
                    ₦{(course.price ?? 0).toLocaleString("en-GB")}
                  </p>

                  <p className="text-gray-500">
                    Price
                  </p>
                </div>


              </div>



              <div className="mt-auto flex justify-between border-t pt-4">


                <button
                  onClick={() =>
                    navigate(`/admin/courses/${course.id}`)
                  }
                  className="flex items-center gap-2 rounded-xl bg-[#0F66B7] px-4 py-2 text-sm text-white"
                >
                  View Course
                  <ChevronRight size={16}/>
                </button>



                <div className="flex gap-2">


                  <button
                    disabled={publishing[course.id]}
                    onClick={() =>
                      handlePublishToggle(course)
                    }
                    className="rounded-xl p-2"
                  >

                    {publishing[course.id] ? (

                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                    ) : course.status?.toLowerCase() === "published" ? (

                      <Lock size={18}/>

                    ) : (

                      <Globe size={18}/>

                    )}

                  </button>



                  <button
                    onClick={() =>
                      handleDelete(course.id)
                    }
                    className="rounded-xl p-2 text-red-500"
                  >
                    <Trash2 size={18}/>
                  </button>


                </div>

              </div>


            </div>

          ))}

        </div>

      )}



      {showCreate && (

        <CreateCourseModal
          onClose={() =>
            setShowCreate(false)
          }

          onCreated={()=>{
            setShowCreate(false);
            fetchCourses();
          }}
        />

      )}

    </div>
  );
}