export default function Discussions() {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">Discussions</h1>

      <p className="text-muted-foreground">
        Moderate community discussions.
      </p>

      <div className="dashboard-card p-8 mt-8">
        <p>No discussions available.</p>
      </div>
    </div>
  );
}