export default function CourseCard({
  image,
  title,
  subtitle,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border p-3">
      <img
        src={image}
        alt={title}
        className="h-18 w-26 rounded-xl object-cover shrink-0"
      />

      <div>
        <h3 className="text-lg font-medium text-foreground">
          {title}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );
}