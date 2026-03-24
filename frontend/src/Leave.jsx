import React, { useState } from 'react';
import axios from 'axios';

const Leave = () => {
  const [formData, setFormData] = useState({
    employeeId: 'EMP101',
    name: 'Nasli',
    startDate: '',
    endDate: '',
    leaveType: 'Sick Leave',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/leave', {
        employeeId: formData.employeeId,
        name: formData.name,
        reason: `${formData.leaveType}: ${formData.reason}`,
        startDate: formData.startDate,
        endDate: formData.endDate
      });

      if (response.status === 201) {
        setSubmitted(true);
        setFormData({ ...formData, startDate: '', endDate: '', reason: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      alert("Database connection failed!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Request Leave</h2>
      
      {submitted && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
          ✅ Request Submitted to Database!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input type="date" className="w-full p-3 border border-gray-200 rounded-xl outline-none" 
              value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input type="date" className="w-full p-3 border border-gray-200 rounded-xl outline-none" 
              value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
          <select className="w-full p-3 border border-gray-200 rounded-xl outline-none"
            value={formData.leaveType} onChange={(e) => setFormData({...formData, leaveType: e.target.value})}>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Annual Leave</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
          <textarea rows="4" className="w-full p-3 border border-gray-200 rounded-xl outline-none"
            value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} required></textarea>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition shadow-lg">
          Submit Application
        </button>
      </form>
      
    </div>
  );
};

export default Leave;