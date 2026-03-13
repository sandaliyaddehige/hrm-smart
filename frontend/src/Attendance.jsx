import React, { useState, useEffect } from 'react';

const EmployeeAttendance = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [status, setStatus] = useState("Checked Out");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Clock Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-wider text-sm">Current Time</h3>
        <div className="text-5xl font-mono font-bold text-indigo-700 mb-4">{time}</div>
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
          Status: {status}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => setStatus("Checked In")}
          className="p-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg transition-all transform hover:scale-105 font-bold text-xl"
        >
          🕒 Check In
        </button>
        <button 
          onClick={() => setStatus("Checked Out")}
          className="p-6 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-lg transition-all transform hover:scale-105 font-bold text-xl"
        >
          👋 Check Out
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-sm">Average Work Hours</p>
          <p className="text-2xl font-bold">8.5h</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-sm">Attendance Rate</p>
          <p className="text-2xl font-bold text-green-500">98%</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-sm">Late Comings</p>
          <p className="text-2xl font-bold text-red-400">02</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;