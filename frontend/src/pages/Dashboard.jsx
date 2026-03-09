import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend, Label 
} from 'recharts';
import { FaUsers, FaUserCheck, FaUserClock, FaClipboardList } from 'react-icons/fa';


const payrollData = [
  { month: 'Jan', amount: 4500 }, { month: 'Feb', amount: 5200 },
  { month: 'Mar', amount: 4800 }, { month: 'Apr', amount: 6100 },
  { month: 'May', amount: 5500 }, { month: 'Jun', amount: 6700 },
];

const attendanceData = [
  { name: 'Present', value: 120 }, { name: 'On Leave', value: 15 }, { name: 'Absent', value: 15 },
];
const ATTENDANCE_COLORS = ['#4f46e5', '#f59e0b', '#ef4444'];

const Dashboard = () => {
  return (
   
    <div className="flex-1 p-8 bg-[#f8fafc] min-h-screen overflow-y-auto custom-scrollbar">
      
   

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Employees" value="150" trend="+ 2% vs Last Month" icon={<FaUsers />} color="bg-[#4f46e5]" />
        <StatCard title="Present Today" value="120" trend="80% Attendance Rate" icon={<FaUserCheck />} color="bg-emerald-500" />
        <StatCard title="On Leave" value="15" trend="10% Total Workforce" icon={<FaUserClock />} color="bg-amber-500" />
        <StatCard title="Pending Approvals" value="8" trend="Requires Action" icon={<FaClipboardList />} color="bg-rose-500" />
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white p-7 rounded-[24px] border border-slate-200 shadow-sm transition-transform duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Payroll Overview</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={payrollData}>
                <defs>
                  <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="amount" stroke="#4f46e5" fill="url(#colorPayroll)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[24px] border border-slate-200 shadow-sm transition-transform duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Attendance Rate</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendanceData} innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value">
                  {attendanceData.map((entry, index) => (
                    <Cell key={index} fill={ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length]} strokeWidth={0} />
                  ))}
                  <Label value="150" position="center" fill="#1e293b" style={{ fontSize: '24px', fontWeight: '800' }} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Pending Approvals Table */}
      <div className="bg-white p-8 rounded-[28px] border border-slate-200 shadow-xl shadow-black/[0.02] mb-12">
        <h3 className="text-xl font-extrabold text-slate-800 mb-6 tracking-tight">Pending Approvals</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-[1.5px]">
                <th className="px-6 text-left pb-2">Employee</th>
                <th className="px-6 text-left pb-2">Leave Type</th>
                <th className="px-6 text-left pb-2">Date</th>
                <th className="px-6 text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <PendingRow name="Alice Johnson" type="Vacation Leave" date="Jun 15, 2026" />
              <PendingRow name="Bob Smith" type="Personal Leave" date="Jun 14, 2026" />
              <PendingRow name="John Doe" type="Sick Leave" date="Jun 13, 2026" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const PendingRow = ({ name, type, date }) => (
  <tr className="group cursor-pointer">
    <td className="px-6 py-4 bg-[#fcfcfd] border-y border-l border-slate-100 rounded-l-2xl font-bold text-[#4f46e5] group-hover:bg-white group-hover:shadow-lg transition-all">{name}</td>
    <td className="px-6 py-4 bg-[#fcfcfd] border-y border-slate-100 text-slate-600 text-sm group-hover:bg-white transition-all">{type}</td>
    <td className="px-6 py-4 bg-[#fcfcfd] border-y border-slate-100 text-slate-600 text-sm group-hover:bg-white transition-all">{date}</td>
    <td className="px-6 py-4 bg-[#fcfcfd] border-y border-r border-slate-100 rounded-r-2xl group-hover:bg-white transition-all">
      <span className="px-4 py-1.5 bg-indigo-50 text-[#4f46e5] rounded-xl text-[11px] font-extrabold">PENDING</span>
    </td>
  </tr>
);

const StatCard = ({ title, value, trend, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>{icon}</div>
    <div>
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{title}</p>
      <h2 className="text-2xl font-extrabold text-slate-900">{value}</h2>
      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{trend}</p>
    </div>
  </div>
);

export default Dashboard;