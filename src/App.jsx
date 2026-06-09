export default function App() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            🎓
          </div>
          <h1 className="text-2xl font-bold">KTA Hub</h1>
        </div>

        <nav className="space-y-2">
          <button className="w-full bg-secondary text-black rounded-xl px-4 py-3 text-left font-medium">
            Dashboard
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/10">
            Courses
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/10">
            Students
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/10">
            Submissions
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/10">
            Reflections
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/10">
            Discussions
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search the hub..."
            className="w-96 px-4 py-3 border border-border rounded-xl bg-white"
          />

          <span className="bg-success-bg text-success px-4 py-2 rounded-full text-sm">
            Demo Mode
          </span>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-text-primary">
            Dashboard
          </h2>
          <p className="text-text-secondary mt-2">
            A snapshot of activity across the KTA Learning Hub.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <h3 className="text-text-secondary">Total Students</h3>
            <p className="text-5xl font-bold mt-4">5</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <h3 className="text-text-secondary">Total Courses</h3>
            <p className="text-5xl font-bold mt-4">2</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border">
            <h3 className="text-text-secondary">Enrollments</h3>
            <p className="text-5xl font-bold mt-4">6</p>
          </div>
        </div>
      </main>
    </div>
  );
}