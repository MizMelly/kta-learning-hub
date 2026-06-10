export default function Submissions() {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">Submissions</h1>

      <p className="text-muted-foreground">
        Review assignments submitted by students.
      </p>

      <div className="dashboard-card p-8 mt-8">
        <p>No submissions available.</p>
      </div>
    </div>
  );
}