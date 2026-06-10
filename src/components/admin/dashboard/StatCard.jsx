export default function StatCard({
  title,
  value,
  icon,
  bgColor,
}) {
  return (
    <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-base">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-bold text-foreground">
            {value}
          </h2>
        </div>

        <div
          className={`${bgColor} h-12 w-12 rounded-2xl flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}