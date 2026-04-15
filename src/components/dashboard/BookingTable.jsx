export default function BookingTable({ appointments }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="text-lg font-bold text-slate-900">Recent Appointments</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Service
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Stylist
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {item.customer}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.service}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.stylist}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.time}
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                    {item.status}
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