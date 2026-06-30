export default function DashboardLoading() {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-brand-border rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-brand-border rounded-xl p-6 space-y-4">
              <div className="h-4 w-24 bg-brand-surface rounded" />
              <div className="h-8 w-32 bg-brand-surface rounded" />
              <div className="h-3 w-full bg-brand-surface rounded" />
              <div className="h-3 w-3/4 bg-brand-surface rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
