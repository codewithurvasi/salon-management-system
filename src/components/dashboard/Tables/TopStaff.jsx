import { Link } from "react-router-dom";

export default function TopStaff({ staff }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Top Stylists</h3>
        <Link to="/dashboard/staff" className="text-sm font-medium text-pink-600 hover:text-pink-700">
          View All →
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        {staff?.map((member, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              {member.avatar && (
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <div>
                <h4 className="font-semibold text-slate-900">{member.name}</h4>
                <p className="text-xs text-slate-500">{member.bookings} bookings</p>
              </div>
            </div>
            <p className="font-bold text-slate-900">{member.rating}★</p>
          </div>
        ))}
      </div>
    </div>
  );
}
