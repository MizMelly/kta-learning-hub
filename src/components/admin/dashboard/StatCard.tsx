import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor: string;
}

export default function StatCard({
  title,
  value,
  icon,
  bgColor,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-bold text-foreground">
            {value}
          </h2>
        </div>

        <div
          className={`${bgColor} flex h-12 w-12 items-center justify-center rounded-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}