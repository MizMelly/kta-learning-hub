import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Play,
  Clock3,
  BookOpen,
  PencilLine,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, courses } from "../../services/api";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [coursesList, setCoursesList] = useState([]);

 useEffect(() => {
  const loadDashboard = async () => {
    try {
      const [profileResponse, coursesResponse] = await Promise.all([
        auth.getProfile(),
        courses.getAll(),
      ]);

      const profile =
        profileResponse?.data ??
        profileResponse ??
        null;

      setUser(profile);

      const publishedCourses =
        coursesResponse?.data ??
        coursesResponse?.courses ??
        coursesResponse ??
        [];

      setCoursesList(
        Array.isArray(publishedCourses)
          ? publishedCourses
          : []
      );
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  loadDashboard();
}, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const firstName =
    user?.fullName?.split(" ")[0] || "Student";

  const currentCourse =
    coursesList.length > 0
      ? coursesList[0]
      : null;

  const progress = Math.min(
    100,
    Math.max(
      0,
      Number(currentCourse?.progress || 0)
    )
  );

  const progressOffset =
    302 - (302 * progress) / 100;

  const completedLessons =
    Number(currentCourse?.completedLessons || 0);

  const journalEntries = 4;

  const communityPosts = [
    {
      id: 1,
      initials: "D",
      name: "David O.",
      message:
        "Just finished Module 2. The exercise on identifying core limiting beliefs completely shifted my perspective on my business plateau.",
      time: "2h ago",
    },
    {
      id: 2,
      initials: "E",
      name: "Elena R.",
      message:
        "Today's coaching session reminded me that leadership starts with self-awareness before it ever influences others.",
      time: "5h ago",
    },
    {
      id: 3,
      initials: "M",
      name: "Michael A.",
      message:
        "Looking forward to tomorrow's live coaching. Who else is joining the session?",
      time: "Yesterday",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-[#134F73] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8F8F5] min-h-screen px-4 sm:px-6 lg:px-10 py-5 sm:py-8">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-[#134F73] leading-tight">
            {greeting}, {firstName}
          </h1>

          <p className="mt-2 text-base sm:text-lg lg:text-xl text-slate-500">
            "Excellence is not an act, but a habit."
          </p>

        </div>

        <button className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white shadow flex items-center justify-center">

          <Bell
            size={20}
            className="text-[#134F73]"
          />

          <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-500" />

        </button>

      </div>

      {/* Hero */}

      <div className="mt-8 rounded-[32px] bg-[#134F73] text-white p-6 lg:p-12 shadow-2xl">

        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* Progress */}

          <div className="relative w-40 h-40">

            <svg
              className="w-40 h-40 -rotate-90"
              viewBox="0 0 120 120"
            >

              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="#355E78"
                strokeWidth="8"
                fill="transparent"
              />

              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="#F4B321"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="302"
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
              />

            </svg>

            <div className="absolute inset-0 flex items-center justify-center">

              <span className="text-5xl font-serif font-bold">
                {progress}%
              </span>

            </div>

          </div>
                    {/* Course Information */}

          <div className="flex-1 text-center lg:text-left">

            <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-[#F4B321] font-bold">
              Up Next
            </p>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-6xl mt-3 font-bold capitalize leading-tight">
              {currentCourse?.title || "No Published Courses"}
            </h2>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-base sm:text-lg">

              <div className="flex items-center gap-2">

                <BookOpen
                  size={20}
                  className="text-[#F4B321]"
                />

                <span>
                  {currentCourse?.totalLessons || 0} Lessons
                </span>

              </div>

              <div className="flex items-center gap-2">

                <Clock3
                  size={20}
                  className="text-[#F4B321]"
                />

                <span>
                  {currentCourse?.duration || "Self-paced"}
                </span>

              </div>

            </div>

          <button
  onClick={() => {
    if (currentCourse?.id) {
      navigate(`/student/courses/${currentCourse.id}`);
    }
  }}
  disabled={!currentCourse}
  className="mt-8 bg-white text-[#134F73] rounded-full px-8 py-4 flex items-center gap-3 font-semibold hover:scale-105 transition mx-auto lg:mx-0 disabled:opacity-50"
>
  <Play size={18} fill="#134F73" />
  Browse Courses
</button>
          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">

        {/* Left Side */}

        <div className="lg:col-span-3">

          <h2 className="font-serif text-4xl text-[#134F73] mb-8">
            Your Activity
          </h2>

          <div className="grid grid-cols-2 gap-5">

            {/* Lessons */}

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">

              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">

                <BookOpen
                  size={20}
                  className="text-[#134F73]"
                />

              </div>

              <h3 className="text-5xl font-serif text-[#134F73]">
                {completedLessons}
              </h3>

              <p className="uppercase tracking-[0.25em] text-xs text-slate-500 mt-3 leading-5">
                Lessons
                <br />
                Completed
              </p>

            </div>

            {/* Journal */}

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">

              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">

                <PencilLine
                  size={20}
                  className="text-[#F47A20]"
                />

              </div>

              <h3 className="text-5xl font-serif text-[#134F73]">
                {journalEntries}
              </h3>

              <p className="uppercase tracking-[0.25em] text-xs text-slate-500 mt-3 leading-5">
                Journal
                <br />
                Entries
              </p>

            </div>

          </div>

          {/* Upcoming Call */}

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-7 mt-6">

            <div className="flex items-center gap-3 mb-5">

              <CalendarDays
                size={20}
                className="text-[#134F73]"
              />

              <h3 className="font-serif text-2xl text-[#134F73]">
                Upcoming Live Call
              </h3>

            </div>

            <h4 className="font-semibold text-xl text-[#134F73]">
              Group Coaching: Alignment
            </h4>

            <p className="text-slate-500 mt-3">
              Tomorrow, 2:00 PM GMT
            </p>

            <button className="w-full mt-6 rounded-2xl border border-slate-200 py-3 font-medium hover:bg-slate-50 transition">

              Add to Calendar

            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="lg:col-span-9">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">

            <h2 className="font-serif text-4xl lg:text-5xl text-[#134F73]">
              Community Highlights
            </h2>

            <button
              onClick={() => navigate("/student/community")}
              className="self-start sm:self-auto text-[#F4B321] font-semibold hover:underline"
            >
              View All
            </button>

          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">

            {communityPosts.map((post, index) => (

              <div
                key={post.id}
                className={`flex gap-6 px-8 py-7 ${
                  index !== communityPosts.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >

                {/* Avatar */}

                <div className="w-12 h-12 rounded-full bg-[#EEF3EF] flex items-center justify-center font-bold text-[#134F73] shrink-0">
                  {post.initials}
                </div>

                {/* Content */}

                <div className="flex-1">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">

                    <h4 className="font-bold text-xl text-[#134F73]">
                      {post.name}
                    </h4>

                    <span className="text-slate-400 text-sm">
                      {post.time}
                    </span>

                  </div>

                  <p className="text-slate-600 leading-8 mt-4 text-lg">
                    {post.message}
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Published Courses */}

          <div className="mt-10">

            <div className="flex items-center justify-between mb-6">

              <h2 className="font-serif text-4xl text-[#134F73]">
                Published Courses
              </h2>

              <button
                onClick={() => navigate("/student/courses")}
                className="text-[#F4B321] font-semibold hover:underline"
              >
                View All
              </button>

            </div>

            {coursesList.length === 0 ? (

              <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow">

                <BookOpen
                  className="mx-auto text-[#134F73]"
                  size={52}
                />

                <h3 className="mt-6 text-2xl font-semibold text-[#134F73]">
                  No Published Courses
                </h3>

                <p className="mt-3 text-slate-500">
                  Your administrator has not published any courses yet.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {coursesList.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Thumbnail */}

                    <div className="h-48 bg-slate-200 overflow-hidden">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#134F73] text-white text-5xl font-bold">
                          <BookOpen size={48} />
                        </div>
                      )}
                    </div>

                    {/* Card Body */}

                    <div className="p-6">

                      <span className="inline-block bg-[#F4B321]/20 text-[#134F73] text-xs font-semibold px-3 py-1 rounded-full">
                        {course.category || "General"}
                      </span>

                      <h3 className="mt-4 text-2xl font-serif font-bold text-[#134F73] line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="mt-3 text-slate-600 line-clamp-3">
                        {course.description}
                      </p>

                      <div className="mt-6 space-y-2 text-sm text-slate-500">

                        <div className="flex justify-between">
                          <span>Duration</span>
                          <span className="font-medium text-[#134F73]">
                            {course.duration || "Self-paced"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Level</span>
                          <span className="font-medium text-[#134F73]">
                            {course.level || "Beginner"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Lessons</span>
                          <span className="font-medium text-[#134F73]">
                            {course.totalLessons || 0}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Modules</span>
                          <span className="font-medium text-[#134F73]">
                            {course.totalModules || 0}
                          </span>
                        </div>

                      </div>

                      <button
                        onClick={() =>
                          navigate(`/student/courses/${course.id}`)
                        }
                        className="mt-6 w-full bg-[#134F73] text-white py-3 rounded-xl font-semibold hover:bg-[#0f415f] transition"
                      >
                        View Course
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
                  </div>

      </div>

    </div>
  );
}
  