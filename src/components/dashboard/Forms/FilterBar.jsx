export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
      {filters?.map((filter) => (
        <div key={filter.id} className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {filter.label}
          </label>
          {filter.type === "select" ? (
            <select
              value={filter.value || ""}
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-pink-500 focus:outline-none"
            >
              <option value="">All {filter.label}</option>
              {filter.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={filter.type}
              placeholder={filter.placeholder}
              value={filter.value || ""}
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none"
            />
          )}
        </div>
      ))}
    </div>
  );
}
