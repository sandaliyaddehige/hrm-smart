import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Payroll = () => {
  // Donut Chart Data
  const data = [
    { name: 'Payment 1', value: 400, color: '#3b82f6' },
    { name: 'Payment 2', value: 300, color: '#60a5fa' },
    { name: 'Payment 3', value: 300, color: '#93c5fd' },
    { name: 'Payment 4', value: 200, color: '#1d4ed8' },
  ];

  const transactions = [
    { name: 'Chloe Wallows', company: 'Sephora Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
    { name: 'Chloe Wallows', company: 'Sephora Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
    { name: 'Chloe Wallows', company: 'Sephora Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
    { name: 'Chloe Wallows', company: 'Sephora Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payroll System</h1>
          <p className="text-sm text-slate-500">Manage employee salaries and benefits.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold">Export All</button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-600 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg shadow-blue-200">
          <div>
            <p className="text-blue-100 text-sm">Upcoming</p>
            <h2 className="text-3xl font-bold mt-1">April 1st, 2022</h2>
          </div>
          <div className="bg-blue-500 p-3 rounded-xl">📅</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Total Outstanding</p>
          <h2 className="text-3xl font-bold text-slate-800 mt-1">$58,764.25</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Summary Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800">Payroll Summary</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg p-1">
              <option>Create A Contract</option>
            </select>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="w-48 h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold">54%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6 mt-6 md:mt-0">
                <div>
                  <p className="text-slate-400 text-xs uppercase font-bold">Payment</p>
                  <p className="text-xl font-bold text-slate-800">$234.20</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase font-bold">Payment</p>
                  <p className="text-xl font-bold text-slate-800">$95.86</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase font-bold">Payment</p>
                  <p className="text-xl font-bold text-slate-800">$181.34</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase font-bold">Payment</p>
                  <p className="text-xl font-bold text-slate-800">$37.13</p>
                </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Transaction History</h3>
            <button className="text-blue-600 text-xs font-bold">See All</button>
          </div>
          <div className="space-y-6">
            {transactions.map((t, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="avatar" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{t.amount}</p>
                  <p className="text-[10px] text-slate-400">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;