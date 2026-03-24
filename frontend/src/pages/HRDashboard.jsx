import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Chart Data
  const barData = [
    { name: 'Jan', value: 100 }, { name: 'Feb', value: 120 },
    { name: 'Mar', value: 140 }, { name: 'Apr', value: 110 },
    { name: 'May', value: 150 }, { name: 'Jun', value: 90 },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">HR Dashboard</h1>
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Alex Rivera</span>
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        </div>
      </header>

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Employees', val: '150', sub: '+ 2% vs Last Month', icon: '👤' },
          { label: 'Present Today', val: '120', sub: '80% Attendance Rate', icon: '✅' },
          { label: 'On Leave', val: '15', sub: '10% Total Workforce', icon: '🕒' },
          { label: 'Pending Approvals', val: '8', sub: 'Requires Action', icon: '⚠️' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
            <p className="text-slate-500 text-sm font-medium">{item.label}</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-1">{item.val}</h2>
            <p className="text-xs text-green-500 mt-2">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Overview - Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold mb-4">Payroll Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <h3 className="font-bold mb-4 text-left">Attendance</h3>
            <div className="flex justify-center items-center h-64">
                <div className="w-48 h-48 rounded-full border-[15px] border-blue-500 border-t-blue-100 flex items-center justify-center">
                    <span className="text-xl font-bold">80%</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< Updated upstream
export default Dashboard;
=======
export default Dashboard;
>>>>>>> Stashed changes
