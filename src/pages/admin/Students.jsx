import { MoreVertical } from "lucide-react";

export default function Students() {
  const students = [
    {
      id: 1,
      name: "Grace Adeyemi",
      email: "grace@example.com",
      joined: "2026-02-11",
      enrollments: ["Social Media Management Masterclass"],
      progress: 67,
    },
    {
      id: 2,
      name: "Tunde Bello",
      email: "tunde@example.com",
      joined: "2026-03-02",
      enrollments: [
        "Social Media Management Masterclass",
        "Brand Storytelling Essentials",
      ],
      progress: 33,
    },
    {
      id: 3,
      name: "Lara Smith",
      email: "lara@example.com",
      joined: "2026-03-19",
      enrollments: ["Social Media Management Masterclass"],
      progress: 100,
    },
    {
      id: 4,
      name: "Kofi Asante",
      email: "kofi@example.com",
      joined: "2026-04-05",
      enrollments: ["Brand Storytelling Essentials"],
      progress: 15,
    },
    {
      id: 5,
      name: "Mei Lin",
      email: "mei@example.com",
      joined: "2026-04-21",
      enrollments: ["Social Media Management Masterclass"],
      progress: 50,
    },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Student Management
        </h1>
        <p className="mt-2 text-muted-foreground">
          View students, their enrollments and progress.
        </p>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Student
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Joined
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Enrollments
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Progress
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-none border-border"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                        {getInitials(student.name)}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {student.joined}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {student.enrollments.map((course, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-muted"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {student.progress}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-muted">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE / TABLET CARDS ================= */}
      <div className="grid gap-4 lg:hidden">
        {students.map((student) => (
          <div
            key={student.id}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                  {getInitials(student.name)}
                </div>

                <div>
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-muted-foreground break-all">
                    {student.email}
                  </p>
                </div>
              </div>

              <button className="p-2 rounded-lg hover:bg-muted">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Joined
                </p>
                <p className="text-sm">{student.joined}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Enrollments
                </p>

                <div className="flex flex-wrap gap-2">
                  {student.enrollments.map((course, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-muted"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{student.progress}%</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}