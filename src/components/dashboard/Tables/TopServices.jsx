import { Link } from "react-router-dom";

export default function TopServices({ services }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Top Services</h3>
        <Link to="/dashboard/manage-service" className="text-sm font-medium text-pink-600 hover:text-pink-700">
          View All →
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        {services?.map((service, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">{service.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{service.bookings} bookings</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">₹{service.revenue}</p>
              <p className="text-xs text-slate-500">{service.rating}★</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
