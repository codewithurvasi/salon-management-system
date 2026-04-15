export default function StatCard({ 
  title, 
  value, 
  note,
  icon,
  trend,
  color = "blue"
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    pink: "bg-pink-50 text-pink-600 border-pink-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  const trendColor = trend?.startsWith("+") 
    ? "text-green-600" 
    : "text-red-600";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
          <p className={`mt-2 text-sm font-medium ${trendColor}`}>{note}</p>
        </div>
        {icon && (
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg border ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-sm font-semibold ${trendColor}`}>
            {trend}
          </span>
          <span className="text-xs text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  );
}