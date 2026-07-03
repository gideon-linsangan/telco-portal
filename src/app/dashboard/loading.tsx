export default function DashboardLoading() {
  return (
    <div className="p-4 md:p-8 animate-pulse">
      {/* Page header skeleton */}
      <div className="mb-7">
        <div className="h-7 bg-neutral-border rounded w-56 mb-2" />
        <div className="h-4 bg-neutral-border rounded w-72" />
      </div>

      {/* Dashboard grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* PlanSummaryCard col-span-4 */}
        <div className="col-span-full md:col-span-4 bg-white border border-neutral-border rounded-xl shadow-card p-6 space-y-3">
          <div className="h-3 bg-neutral-border rounded w-24" />
          <div className="h-6 bg-neutral-border rounded w-40" />
          <div className="h-px bg-neutral-border w-full" />
          <div className="space-y-2">
            <div className="h-4 bg-neutral-border rounded w-full" />
            <div className="h-4 bg-neutral-border rounded w-3/4" />
            <div className="h-4 bg-neutral-border rounded w-5/6" />
          </div>
        </div>

        {/* UsageMeterCard col-span-8 */}
        <div className="col-span-full md:col-span-8 bg-white border border-neutral-border rounded-xl shadow-card p-6 space-y-4">
          <div className="h-3 bg-neutral-border rounded w-24" />
          <div className="h-3 bg-neutral-border rounded-full w-full" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 bg-neutral-border rounded-lg" />
            <div className="h-16 bg-neutral-border rounded-lg" />
            <div className="h-16 bg-neutral-border rounded-lg" />
          </div>
        </div>

        {/* BillingCard col-span-4 */}
        <div className="col-span-full md:col-span-4 bg-white border border-neutral-border rounded-xl shadow-card p-6 space-y-3">
          <div className="h-3 bg-neutral-border rounded w-20" />
          <div className="h-8 bg-neutral-border rounded w-32" />
          <div className="space-y-2">
            <div className="h-4 bg-neutral-border rounded w-full" />
            <div className="h-4 bg-neutral-border rounded w-4/5" />
          </div>
        </div>

        {/* ActivityFeed col-span-8 */}
        <div className="col-span-full md:col-span-8 bg-white border border-neutral-border rounded-xl shadow-card p-6 space-y-4">
          <div className="h-3 bg-neutral-border rounded w-28" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-border rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 bg-neutral-border rounded w-3/4" />
                <div className="h-3 bg-neutral-border rounded w-1/2" />
              </div>
              <div className="h-5 bg-neutral-border rounded-full w-16" />
            </div>
          ))}
        </div>

        {/* UsageHistoryChart col-span-12 */}
        <div className="col-span-full bg-white border border-neutral-border rounded-xl shadow-card p-6 space-y-4">
          <div className="h-3 bg-neutral-border rounded w-32" />
          <div className="h-40 bg-neutral-border rounded w-full" />
        </div>

        {/* SupportTickets, AddOnsCard, UpgradeBanner — col-span-4 each */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="col-span-full md:col-span-4 bg-white border border-neutral-border rounded-xl shadow-card p-6 space-y-3">
            <div className="h-3 bg-neutral-border rounded w-24" />
            <div className="space-y-2">
              <div className="h-4 bg-neutral-border rounded w-full" />
              <div className="h-4 bg-neutral-border rounded w-5/6" />
              <div className="h-4 bg-neutral-border rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
