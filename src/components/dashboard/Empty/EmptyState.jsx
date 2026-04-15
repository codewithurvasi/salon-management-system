export default function EmptyState({ 
  icon = "📭", 
  title = "No Data", 
  description = "There's nothing to show here", 
  actionText,
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-16">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-6 rounded-lg bg-pink-600 px-6 py-2 font-medium text-white hover:bg-pink-700"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
