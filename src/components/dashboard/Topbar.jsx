export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Salon Dashboard</h1>
          <p className="text-sm text-slate-500">
            Manage bookings, customers, services, and salon performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600">
            Admin
          </div>
        </div>
      </div>
    </header>
  );
}