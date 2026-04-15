export default function ConfirmDialog({ 
  isOpen, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "default",
  onConfirm, 
  onCancel 
}) {
  if (!isOpen) return null;

  const buttonColor = {
    default: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700",
  }[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-4 text-slate-600">{message}</p>
        <div className="mt-8 flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-lg ${buttonColor} px-4 py-2 font-medium text-white`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
