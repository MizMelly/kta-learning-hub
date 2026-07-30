interface SubmissionRowProps {
  name: string;
  lesson: string;
  status: string;
  last?: boolean;
}

export default function SubmissionRow({
  name,
  lesson,
  status,
  last = false,
}: SubmissionRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        !last ? "border-b border-border" : ""
      }`}
    >
      <div>
        <h3 className="font-medium text-foreground">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {lesson}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${
          status === "reviewed"
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
}