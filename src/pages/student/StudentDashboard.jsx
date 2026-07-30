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

        <button className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white shadow flex items-center justify-center shrink-0">

          <Bell
            size={20}
            className="text-[#134F73]"
          />

          <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-500" />

        </button>

      </div>

      {/* Hero */}

      <div className="mt-8 rounded-3xl lg:rounded-[32px] bg-[#134F73] text-white p-5 sm:p-8 lg:p-12 shadow-2xl">

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">

          {/* Progress Circle */}

          <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40">

            <svg
              className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 -rotate-90"
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

              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold">
                {currentCourse.progress}%
              </span>

            </div>

          </div>

          {/* Course Info */}

          <div className="flex-1 text-center lg:text-left">

            <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-[#F4B321] font-bold">
              Up Next
            </p>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-6xl mt-2 sm:mt-3 font-bold capitalize leading-tight">
              {currentCourse.title}
            </h2>

            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mt-4 sm:mt-6 text-base sm:text-xl lg:text-2xl">

              <Clock3
                size={20}
                className="text-[#F4B321]"
              />

              <span>Continue Learning</span>

            </div>

            <button
              onClick={() => navigate("/student/courses")}
              className="mt-6 sm:mt-8 w-full sm:w-fit justify-center bg-white text-[#134F73] rounded-full px-6 sm:px-10 py-3 sm:py-4 flex items-center gap-3 font-semibold hover:scale-105 transition"
            >
              <Play size={18} fill="#134F73" />
              Resume Lesson
            </button>

          </div>

        </div>

      </div>

      {/* Activity + Community */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-8 lg:mt-10">

        {/* Left Column */}

        <div className="lg:col-span-3">

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#134F73] mb-5 lg:mb-8">
            Your Activity
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">

            {/* Lessons */}

            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-md border border-slate-100 p-5 sm:p-6">

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">

                <BookOpen
                  size={20}
                  className="text-[#134F73]"
                />

              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#134F73]">
                {completedLessons}
              </h3>

              <p className="uppercase tracking-[0.25em] text-[10px] sm:text-xs text-slate-500 mt-3 leading-5">
                Lessons
                <br />
                Completed
              </p>

            </div>

            {/* Journal */}

            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-md border border-slate-100 p-5 sm:p-6">

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">

                <PencilLine
                  size={20}
                  className="text-[#F47A20]"
                />

              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#134F73]">
                {journalEntries}
              </h3>

              <p className="uppercase tracking-[0.25em] text-[10px] sm:text-xs text-slate-500 mt-3 leading-5">
                Journal
                <br />
                Entries
              </p>

            </div>

          </div>

          {/* Upcoming Call */}

          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-md border border-slate-100 p-5 sm:p-7 mt-6">

            <div className="flex items-center gap-3 mb-5">

              <CalendarDays
                size={20}
                className="text-[#134F73]"
              />

              <h3 className="font-serif text-xl sm:text-2xl text-[#134F73]">
                Upcoming Live Call
              </h3>

            </div>

            <h4 className="font-semibold text-lg sm:text-xl lg:text-2xl text-[#134F73]">
              Group Coaching: Alignment
            </h4>

            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              Tomorrow, 14:00 GMT
            </p>

            <button className="w-full mt-6 rounded-2xl border border-slate-200 py-3 font-medium hover:bg-slate-50 transition">
              Add to Calendar
            </button>

          </div>

        </div>
                {/* Right Column */}

        <div className="lg:col-span-9">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 lg:mb-8">

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#134F73]">
              Community Highlights
            </h2>

            <button className="self-start sm:self-auto text-[#F4B321] font-semibold hover:underline text-sm sm:text-base">
              View All
            </button>

          </div>

          <div className="bg-white rounded-2xl lg:rounded-3xl border border-slate-100 shadow-md overflow-hidden">

            {communityPosts.map((post, index) => (

              <div
                key={post.id}
                className={`flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-5 sm:py-7 ${
                  index !== communityPosts.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >

                {/* Avatar */}

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#EEF3EF] flex items-center justify-center font-bold text-[#134F73] shrink-0">

                  {post.initials}

                </div>

                {/* Content */}

                <div className="flex-1 min-w-0">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

                    <h4 className="font-bold text-lg sm:text-xl text-[#134F73]">
                      {post.name}
                    </h4>

                    <span className="text-slate-400 text-xs sm:text-sm">
                      {post.time}
                    </span>

                  </div>

                  <p className="text-slate-600 leading-7 sm:leading-8 lg:leading-9 mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg">
                    {post.message}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}