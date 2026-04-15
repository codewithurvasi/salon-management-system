import { Link } from "react-router-dom";

export default function RecentAppointments({ appointments }) {
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Recent Appointments</h3>
        <Link to="/dashboard/appointments" className="text-sm font-medium text-pink-600 hover:text-pink-700">
          View All →
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Service</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Stylist</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((apt, idx) => (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-900">{apt.customerName}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{apt.service}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{apt.date}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{apt.stylist}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
