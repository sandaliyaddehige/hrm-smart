import React, { useState, useEffect } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Label 
} from 'recharts';
import { FaUsers, FaUserCheck, FaUserClock, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';

const ATTENDANCE_COLORS = ['#4f46e5', '#f59e0b', '#ef4444'];

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    pendingApprovals: 0,
    attendanceRate: 0,
    payrollHistory: [],
    recentLeaves: []
  });
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: { 'x-auth-token': token }
        });
        
      
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

 
  const attendancePieData = [
    { name: 'Present', value: stats.presentToday },
    { name: 'On Leave', value: stats.onLeave },
    { name: 'Absent', value: (stats.totalEmployees - (stats.presentToday + stats.onLeave)) || 0 },
  ];

  if (loading) return <div className="p-8 text-center font-bold">Loading Dashboard...</div>;

  return (
    <div className="flex-1 p-8 bg-[#f8fafc] min-h-screen overflow-y-auto custom-scrollbar">
      
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Employees" value={stats.totalEmployees} trend="Registered Staff" icon={<FaUsers />} color="bg-[#4f46e5]" />
        <StatCard title="Present Today" value={stats.presentToday} trend={`${stats.attendanceRate}% Rate`} icon={<FaUserCheck />} color="bg-emerald-500" />
        <StatCard title="On Leave" value={stats.onLeave} trend="Out of office" icon={<FaUserClock />} color="bg-amber-500" />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals} trend="Action required" icon={<FaClipboardList />} color="bg-rose-500" />
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white p-7 rounded-[24px] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Payroll Overview</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
             
              <AreaChart data={stats.payrollHistory}>
                <defs>
                  <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#4f46e5" fill="url(#colorPayroll)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[24px] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Attendance Rate</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendancePieData} innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value">
                  {attendancePieData.map((entry, index) => (
                    <Cell key={index} fill={ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length]} strokeWidth={0} />
                  ))}
                  <Label value={stats.totalEmployees} position="center" fill="#1e293b" style={{ fontSize: '24px', fontWeight: '800' }} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Pending Approvals Table */}
      <div className="bg-white p-8 rounded-[28px] border border-slate-200 shadow-sm mb-12">
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
            
              {stats.recentLeaves.map((leave, index) => (
                <PendingRow 
                  key={index}
                  name={leave.employeeName} 
                  type={leave.leaveType} 
                  date={new Date(leave.date).toLocaleDateString()} 
                />
              ))}
              {stats.recentLeaves.length === 0 && (
                <tr><td colSpan="4" className="text-center py-4">No pending requests</td></tr>
              )}
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