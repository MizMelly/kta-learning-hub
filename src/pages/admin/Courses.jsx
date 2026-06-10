import socialMediaImage from "../../assets/social-media.avif";
import brandStorytellingImage from "../../assets/brand-stroytelling.avif";
import { Pencil, Trash2, Star, Plus } from "lucide-react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      image: socialMediaImage,
      title: "Social Media Management Masterclass",
      description:
        "A complete walkthrough of planning, creating, scheduling and analysing content across modern social platforms.",
      modules: 3,
      lessons: 6,
      rating: 4.6,
      author: "Amara Okafor",
      price: 149,
      status: "Published",
    },
    {
      id: 2,
      image: brandStorytellingImage,
      title: "Brand Storytelling Essentials",
      description:
        "Craft a compelling brand narrative that converts followers into customers.",
      modules: 1,
      lessons: 1,
      rating: 4.7,
      author: "Daniel Mensah",
      price: 99,
      status: "Draft",
    },
  ];

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Course Management
          </h1>

          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Create, edit and organise courses, modules and lessons.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sm transition hover:opacity-90">
          <Plus size={18} />
          New Course
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden sm:h-44 md:h-48">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />

              <span
                className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                  course.status === "Published"
                    ? "bg-success text-success-foreground"
                    : "bg-warning text-warning-foreground"
                }`}
              >
                {course.status}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-4 p-4 sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                  {course.title}
                </h2>

                <span className="whitespace-nowrap text-2xl font-bold text-primary">
                  ${course.price}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>{course.modules} modules</span>

                <span>{course.lessons} lessons</span>

                <div className="flex items-center gap-1">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-yellow-500"
                  />
                  <span>{course.rating}</span>
                </div>

                <span>by {course.author}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                  Manage
                </button>

                <button className="rounded-xl border border-border p-2.5 transition hover:bg-muted">
                  <Pencil size={18} />
                </button>

                <button className="rounded-xl border border-border p-2.5 text-destructive transition hover:bg-muted">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}