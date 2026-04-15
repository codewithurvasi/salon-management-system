export default function AlertBanner({ type = "info", message, onClose }) {
  const bgColor = {
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
    success: "bg-green-50 border-green-200",
  }[type];

  const textColor = {
    info: "text-blue-700",
    warning: "text-yellow-700",
    error: "text-red-700",
    success: "text-green-700",
  }[type];

  const icon = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
    success: "✓",
  }[type];

  return (
    <div className={`rounded-2xl border ${bgColor} p-4 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <p className={`text-sm font-medium ${textColor}`}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          ✕
        </button>
      )}
    </div>
  );
}
