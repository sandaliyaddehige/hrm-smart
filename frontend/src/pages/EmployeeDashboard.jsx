import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const barData = [
  { month: "Jan", value: 110 }, { month: "Feb", value: 125 }, { month: "Mar", value: 138 },
  { month: "Apr", value: 118 }, { month: "May", value: 150 }, { month: "Jun (Today)", value: 40 }
];

export default function Dashboard() {
  const [stats, setStats] = useState({ totalEmployees: 150, presentToday: 0, onLeave: 0, pendingReviews: 8 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stats');
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Employees", value: stats.totalEmployees, sub: "↑ 2% vs Last Month", color: "text-green-500", bg: "bg-blue-50" },
    { label: "Present Today", value: stats.presentToday, sub: "Live Update", color: "text-green-400", bg: "bg-green-50" },
    { label: "On Leave", value: stats.onLeave, sub: "Active Requests", color: "text-gray-400", bg: "bg-yellow-50" },
    { label: "Pending Reviews", value: stats.pendingReviews, sub: "Requires Action", color: "text-gray-400", bg: "bg-red-50" },
  ];


  return (
    <div className="space-y-6">

      <div className="grid grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-400 mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            <p className={`text-xs mt-1 ${card.color}`}>{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-5">Monthly Attendance Overview</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}