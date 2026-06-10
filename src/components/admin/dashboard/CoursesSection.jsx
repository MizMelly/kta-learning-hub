import CourseCard from "./CourseCard";
import socialMediaImage from "../../../assets/social-media.avif";
import brandStorytellingImage from "../../../assets/brand-stroytelling.avif";

export default function CoursesSection() {
  return (
    <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        Your Courses
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <CourseCard
          image={socialMediaImage}
          title="Social Media Management Masterclass"
          subtitle="3 modules · 6 lessons"
        />

        <CourseCard
          image={brandStorytellingImage}
          title="Brand Storytelling Essentials"
          subtitle="1 module · 1 lesson"
        />
      </div>
    </div>
  );
}