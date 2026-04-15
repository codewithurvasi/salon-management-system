import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Revenue Overview</h3>
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600">
          <option>Last 30 Days</option>
          <option>Last 60 Days</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                border: "1px solid #e2e8f0",
                borderRadius: "8px"
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ec4899" 
              strokeWidth={3}
              dot={{ fill: "#ec4899", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
