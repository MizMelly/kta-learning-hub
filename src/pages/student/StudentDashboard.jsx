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

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [profile, myCourses] = await Promise.all([
          auth.getProfile(),
          courses.getMyCourses(),
        ]);

        setUser(profile.data || profile);

        const data =
          myCourses?.data ||
          myCourses?.courses ||
          myCourses ||
          [];

        setCoursesList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Dashboard Error:", error);
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

  const firstName = user?.fullName?.split(" ")[0] || "Student";

  const currentCourse =
    coursesList.length > 0
      ? coursesList[0]
      : {
          title: "Social Media Management",
          progress: 100,
        };

  const completedLessons = 12;
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
    <div className="bg-[#F8F8F5] min-h-screen px-6 lg:px-10 py-8">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-[#134F73]">
            {greeting}, {firstName}
          </h1>

          <p className="text-slate-500 text-xl mt-3">
            "Excellence is not an act, but a habit."
          </p>

        </div>

        <button className="relative w-16 h-16 rounded-full bg-white shadow flex items-center justify-center">

          <Bell
            size={26}
            className="text-[#134F73]"
          />

          <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-red-500" />

        </button>

      </div>

      {/* Hero */}

      <div className="mt-10 rounded-[32px] bg-[#134F73] text-white p-8 lg:p-12 shadow-2xl">

        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* Progress Circle */}

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
                strokeDasharray={302}
                strokeDashoffset={
                  302 - (302 * currentCourse.progress) / 100
                }
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">

              <span className="text-5xl font-serif font-bold">
                {currentCourse.progress}%
              </span>

            </div>

          </div>

          {/* Course Info */}

          <div className="flex-1">

            <p className="uppercase tracking-[0.35em] text-[#F4B321] font-bold">
              Up Next
            </p>

            <h2 className="font-serif text-4xl lg:text-6xl mt-3 font-bold capitalize">
              {currentCourse.title}
            </h2>

            <div className="flex items-center gap-3 mt-6 text-2xl">

              <Clock3
                size={22}
                className="text-[#F4B321]"
              />

              <span>Continue Learning</span>

            </div>

            <button
              onClick={() => navigate("/student/courses")}
              className="mt-8 bg-white text-[#134F73] rounded-full px-10 py-4 flex items-center gap-3 font-semibold hover:scale-105 transition"
            >
              <Play size={18} fill="#134F73" />
              Resume Lesson
            </button>

          </div>

        </div>

      </div>
            {/* ========================= */}
      {/* Activity + Community */}
      {/* ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">

        {/* Left Column */}

        <div className="lg:col-span-3">

          <h2 className="font-serif text-5xl text-[#134F73] mb-8">
            Your Activity
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-5">

            {/* Lessons */}

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">

              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">

                <BookOpen
                  size={22}
                  className="text-[#134F73]"
                />

              </div>

              <h3 className="text-5xl font-serif text-[#134F73]">
                {completedLessons}
              </h3>

              <p className="uppercase tracking-[0.35em] text-xs text-slate-500 mt-4 leading-6">
                Lessons
                <br />
                Completed
              </p>

            </div>

            {/* Journal */}

            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">

              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">

                <PencilLine
                  size={22}
                  className="text-[#F47A20]"
                />

              </div>

              <h3 className="text-5xl font-serif text-[#134F73]">
                {journalEntries}
              </h3>

              <p className="uppercase tracking-[0.35em] text-xs text-slate-500 mt-4 leading-6">
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
                size={22}
                className="text-[#134F73]"
              />

              <h3 className="font-serif text-2xl text-[#134F73]">
                Upcoming Live Call
              </h3>

            </div>

            <h4 className="font-semibold text-2xl text-[#134F73]">
              Group Coaching: Alignment
            </h4>

            <p className="text-slate-500 mt-3">
              Tomorrow, 14:00 GMT
            </p>

            <button className="w-full mt-7 rounded-2xl border border-slate-200 py-3 font-medium hover:bg-slate-50 transition">
              Add to Calendar
            </button>

          </div>

        </div>

        {/* Right Column */}

        <div className="lg:col-span-9">

          <div className="flex items-center justify-between mb-8">

            <h2 className="font-serif text-5xl text-[#134F73]">
              Community Highlights
            </h2>

            <button className="text-[#F4B321] font-semibold hover:underline">
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

                  <div className="flex justify-between items-center">

                    <h4 className="font-bold text-xl text-[#134F73]">
                      {post.name}
                    </h4>

                    <span className="text-slate-400 text-sm">
                      {post.time}
                    </span>

                  </div>

                  <p className="text-slate-600 leading-9 mt-4 text-lg">
                    {post.message}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
            {/* ======================================== */}
      {/* Continue Learning */}
      {/* ======================================== */}

      <section className="mt-12">

        <div className="flex items-center justify-between mb-8">

          <h2 className="font-serif text-5xl text-[#134F73]">
            Continue Learning
          </h2>

          <button
            onClick={() => navigate("/student/courses")}
            className="text-[#F4B321] font-semibold hover:underline"
          >
            View All
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {coursesList.slice(0, 3).map((course, index) => (

            <div
              key={course._id || index}
              className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >

              {/* Banner */}

              <div className="h-48 bg-linear-to-br from-[#134F73] to-[#0D3F5C] flex items-center justify-center">

                <BookOpen
                  size={56}
                  className="text-white"
                />

              </div>

              {/* Content */}

              <div className="p-7">

                <span className="inline-flex rounded-full bg-[#FFF4E5] px-4 py-2 text-sm font-semibold text-[#F47A20]">
                  Active Course
                </span>

                <h3 className="mt-5 text-2xl font-bold text-[#134F73] capitalize">
                  {course.title}
                </h3>

                <p className="mt-4 text-slate-500 leading-7 line-clamp-3">
                  {course.description ||
                    "Continue building your knowledge and complete the remaining lessons."}
                </p>

                {/* Progress */}

                <div className="mt-7">

                  <div className="flex justify-between text-sm mb-2">

                    <span className="font-medium text-slate-600">
                      Progress
                    </span>

                    <span className="font-semibold text-[#134F73]">
                      {course.progress || 0}%
                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-[#F4B321]"
                      style={{
                        width: `${course.progress || 0}%`,
                      }}
                    />

                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(`/student/courses/${course._id}`)
                  }
                  className="mt-8 w-full rounded-2xl bg-[#134F73] text-white py-4 font-semibold hover:bg-[#0F4566] transition"
                >
                  Continue Course
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ======================================== */}
      {/* Learning Progress */}
      {/* ======================================== */}

      <section className="mt-16">

        <h2 className="font-serif text-5xl text-[#134F73] mb-8">
          Learning Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8">

            <p className="text-slate-500 text-sm uppercase tracking-[0.3em]">
              Courses
            </p>

            <h3 className="mt-4 text-5xl font-serif text-[#134F73]">
              {coursesList.length}
            </h3>

          </div>

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8">

            <p className="text-slate-500 text-sm uppercase tracking-[0.3em]">
              Completed
            </p>

            <h3 className="mt-4 text-5xl font-serif text-[#134F73]">
              {completedLessons}
            </h3>

          </div>

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8">

            <p className="text-slate-500 text-sm uppercase tracking-[0.3em]">
              Progress
            </p>

            <h3 className="mt-4 text-5xl font-serif text-[#134F73]">
              {currentCourse.progress}%
            </h3>

          </div>

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8">

            <p className="text-slate-500 text-sm uppercase tracking-[0.3em]">
              Certificates
            </p>

            <h3 className="mt-4 text-5xl font-serif text-[#134F73]">
              0
            </h3>

          </div>

        </div>

      </section>
            {/* ======================================== */}
      {/* Announcements & Events */}
      {/* ======================================== */}

      <section className="mt-16 grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Announcements */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="font-serif text-4xl text-[#134F73]">
              Announcements
            </h2>

            <button className="text-[#F4B321] font-semibold hover:underline">
              View All
            </button>

          </div>

          <div className="space-y-6">

            <div className="border-l-4 border-[#F4B321] pl-5">

              <p className="text-sm text-slate-500">
                Today
              </p>

              <h4 className="mt-2 font-bold text-xl text-[#134F73]">
                Welcome to Unleash Academy
              </h4>

              <p className="mt-3 text-slate-600 leading-8">
                Begin your transformational journey by completing your
                first lesson and introducing yourself to the community.
              </p>

            </div>

            <div className="border-l-4 border-[#134F73] pl-5">

              <p className="text-sm text-slate-500">
                This Week
              </p>

              <h4 className="mt-2 font-bold text-xl text-[#134F73]">
                Live Coaching Session
              </h4>

              <p className="mt-3 text-slate-600 leading-8">
                Join Dr. Konfirm this Thursday for an exclusive coaching
                session focused on leadership and personal transformation.
              </p>

            </div>

          </div>

        </div>

        {/* Upcoming Events */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="font-serif text-4xl text-[#134F73]">
              Upcoming Events
            </h2>

            <button className="text-[#F4B321] font-semibold hover:underline">
              View Calendar
            </button>

          </div>

          <div className="space-y-5">

            <div className="rounded-2xl border border-slate-200 p-5">

              <p className="text-[#F47A20] font-semibold">
                28 JUL
              </p>

              <h4 className="mt-2 text-xl font-bold text-[#134F73]">
                Leadership Masterclass
              </h4>

              <p className="mt-2 text-slate-500">
                2:00 PM • Live Zoom Session
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-5">

              <p className="text-[#F47A20] font-semibold">
                04 AUG
              </p>

              <h4 className="mt-2 text-xl font-bold text-[#134F73]">
                Community Networking
              </h4>

              <p className="mt-2 text-slate-500">
                Meet fellow learners and share experiences.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 p-5">

              <p className="text-[#F47A20] font-semibold">
                11 AUG
              </p>

              <h4 className="mt-2 text-xl font-bold text-[#134F73]">
                Business Growth Workshop
              </h4>

              <p className="mt-2 text-slate-500">
                Practical systems for scaling your business.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}