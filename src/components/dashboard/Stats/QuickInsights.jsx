export default function QuickInsights({ insights }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">Quick Insights</h3>
      <div className="mt-5 space-y-4">
        {insights.map((item, idx) => (
          <div key={idx} className={`rounded-2xl ${item.bgColor} p-4`}>
            <p className="text-sm text-slate-500">{item.label}</p>
            <h4 className="mt-1 font-bold text-slate-900">{item.value}</h4>
            {item.subtext && (
              <p className="text-xs text-slate-400 mt-1">{item.subtext}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
