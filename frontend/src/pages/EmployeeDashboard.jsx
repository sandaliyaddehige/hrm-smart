import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const barData = [
  { month: "Jan", value: 110 },
  { month: "Feb", value: 125 },
  { month: "Mar", value: 138 },
  { month: "Apr", value: 118 },
  { month: "May", value: 150 },
  { month: "Jun (Today)", value: 40 },
];

const pieData = [
  { name: "Eng", value: 40 },
  { name: "Sales", value: 30 },
  { name: "HR", value: 15 },
  { name: "Other", value: 15 },
];
const PIE_COLORS = ["#2563EB", "#60A5FA", "#BFDBFE", "#DBEAFE"];

const activities = [
  { initials: "AJ", name: "Alice Johnson", action: "Performance Review Submitted", date: "Jun 15, 2026", status: "Approved", color: "bg-gray-400" },
  { initials: "BS", name: "Bob Smith", action: "Onboarding Completed", date: "Jun 14, 2026", status: "Pending", color: "bg-gray-400" },
  { initials: "CD", name: "Carla Diaz", action: "Leave Request (Sick)", date: "Jun 14, 2026", status: "Under Review", color: "bg-gray-400" },
];

const statusStyle = {
  "Approved": "bg-green-100 text-green-700",
  "Pending": "bg-blue-100 text-blue-700",
  "Under Review": "bg-yellow-100 text-yellow-700",
};

const statCards = [
  { label: "Total Employees", value: "150", sub: "↑ 2% vs Last Month", subColor: "text-green-500", icon: "·", iconBg: "bg-blue-50" },
  { label: "Present Today", value: "120", sub: "80% Attendance Rate", subColor: "text-gray-400", icon: "✓", iconBg: "bg-green-50 text-green-500" },
  { label: "On Leave", value: "15", sub: "10% Total Workforce", subColor: "text-gray-400", icon: "🕐", iconBg: "bg-yellow-50" },
  { label: "Pending Reviews", value: "8", sub: "Requires Action", subColor: "text-gray-400", icon: "📊", iconBg: "bg-red-50" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{card.label}</p>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              <p className={`text-xs mt-1 ${card.subColor}`}>{card.sub}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${card.iconBg}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-5">Monthly Attendance Overview</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} domain={[0, 160]} ticks={[0,40,80,120,160]} />
            <Tooltip cursor={{ fill: "#F8FAFC" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.month === "Jun (Today)" ? "#E2E8F0" : `url(#blueGrad${index})`}
                />
              ))}
            </Bar>
            <defs>
              {barData.map((_, i) => (
                <linearGradient key={i} id={`blueGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#6EB4FF" />
                </linearGradient>
              ))}
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-5">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Department Distribution</h2>
          <div className="flex items-center gap-6">
            <PieChart width={180} height={180}>
              <Pie data={pieData} cx={85} cy={85} innerRadius={0} outerRadius={80} dataKey="value" paddingAngle={2}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
            </PieChart>
            <div className="space-y-2">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: PIE_COLORS[i] }}></span>
                  {d.name} ({d.value}%)
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-2 text-left font-medium">Employee Name</th>
                <th className="pb-2 text-left font-medium">Action</th>
                <th className="pb-2 text-left font-medium">Date</th>
                <th className="pb-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">{a.initials}</div>
                      <span className="text-sm font-medium text-gray-700">{a.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-500">{a.action}</td>
                  <td className="py-3 text-sm text-gray-400">{a.date}</td>
                  <td className="py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[a.status]}`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}