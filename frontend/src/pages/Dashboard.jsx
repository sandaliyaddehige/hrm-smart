import React from 'react';
import StatCard from '../components/Admin/StatCard';
import '../styles/Dashboard.css';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend, Label 
} from 'recharts';

// Data Arrays 
const payrollData = [
  { month: 'Jan', amount: 4500 },
  { month: 'Feb', amount: 5200 },
  { month: 'Mar', amount: 4800 },
  { month: 'Apr', amount: 6100 },
  { month: 'May', amount: 5500 },
  { month: 'Jun', amount: 6700 },
];

const attendanceData = [
  { name: 'Present', value: 120 },
  { name: 'On Leave', value: 15 },
  { name: 'Absent', value: 15 },
];

const ATTENDANCE_COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      {/* 1. Statistics Section */}
      <div className="stats-container">
        <StatCard title="Total Employees" value="150" trend="+ 2% vs Last Month" color="#4F46E5" />
        <StatCard title="Present Today" value="120" trend="80% Attendance Rate" color="#10B981" />
        <StatCard title="On Leave" value="15" trend="10% Total Workforce" color="#F59E0B" />
        <StatCard title="Pending Approvals" value="8" trend="Requires Action" color="#EF4444" />
      </div>

      {/* 2. Charts Section */}
      <div className="dashboard-grid">
        {/* Payroll Overview - Area Chart */}
        <div className="chart-container large">
          <h3>Payroll Overview</h3>
          <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={payrollData}>
                <defs>
                  <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="amount" stroke="#4F46E5" fillOpacity={1} fill="url(#colorPayroll)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Overview - Pie Chart */}
        <div className="chart-container small">
          <h3>Attendance Overview</h3>
          <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length]} stroke="none" />
                  ))}
                  <Label value="150" position="center" fill="#1e293b" style={{ fontSize: '24px', fontWeight: 'bold' }} />
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Pending Approvals Table */}
      <div className="pending-approvals-table">
        <h3>Pending Approvals</h3>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Leave type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Alice Johnson</td><td>Vacation Leave</td><td>Jun 15, 2026</td></tr>
            <tr><td>Bob Smith</td><td>Personal Leave</td><td>Jun 14, 2026</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;