import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaCheck, FaTimes, FaUserCheck } from 'react-icons/fa';

const Attendance = () => {
    
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [employees, setEmployees] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [empRes, attRes, leaveRes] = await Promise.all([
                axios.get('http://localhost:5000/api/employee'),
                axios.get(`http://localhost:5000/api/attendance/${selectedDate}`),
                axios.get('http://localhost:5000/api/leave/all')
            ]);
            
            setEmployees(empRes.data);
            setAttendanceRecords(attRes.data);
            setLeaveRequests(leaveRes.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    
    const handleMarkAttendance = async (empId, status) => {
        try {
            
            const attendanceData = [{ employeeId: empId, status, date: selectedDate }];
            
            await axios.post('http://localhost:5000/api/attendance/mark', { 
                attendanceData, 
                date: selectedDate 
            });
            
         
            fetchData();
        } catch (err) {
            console.error("Error marking attendance:", err);
            alert("Could not update attendance.");
        }
    };

    // Leave Approve/Cancel logic
    const handleLeaveStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/leave/update/${id}`, { status });
            fetchData();
        } catch (err) {
            alert("Error updating leave status");
        }
    };

    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen">
            <h1 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Attendance & Leave</h1>

            {/* Top Summary & Date Picker */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Present Today</span>
                        <h2 className="text-3xl font-black text-slate-800 mt-1">
                            {attendanceRecords.filter(r => r.status === 'Present').length} / {employees.length}
                        </h2>
                    </div>
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                        <FaUserCheck />
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-indigo-500 text-xl" />
                            <span className="font-bold text-slate-700">Select Attendance Date</span>
                        </div>
                        <input 
                            type="date" 
                            className="bg-slate-50 border-2 border-slate-100 rounded-2xl font-black px-6 py-3 text-indigo-600 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Attendance Record List */}
                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black text-slate-800">Employee List</h3>
                        {loading && <span className="text-xs font-bold text-indigo-500 animate-pulse">Loading Records...</span>}
                    </div>
                    
                    <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                        {employees.map(emp => {
                           
                            const record = attendanceRecords.find(r => 
                                (r.employeeId?._id || r.employeeId) === emp._id
                            );

                            return (
                                <div key={emp._id} className="flex items-center justify-between p-5 rounded-[24px] border border-slate-50 bg-white hover:border-indigo-100 hover:shadow-md transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                            {emp.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 text-sm">{emp.name}</h4>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{emp.dept || 'Staff'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl">
                                        <button 
                                            onClick={() => handleMarkAttendance(emp._id, 'Present')}
                                            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                                                record?.status === 'Present' 
                                                ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100 scale-105' 
                                                : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                        >
                                            Present
                                        </button>
                                        <button 
                                            onClick={() => handleMarkAttendance(emp._id, 'Absent')}
                                            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                                                record?.status === 'Absent' 
                                                ? 'bg-white text-rose-600 shadow-sm border border-rose-100 scale-105' 
                                                : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                        >
                                            Absent
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Leave Requests Section */}
                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-black text-slate-800 mb-8">Pending Leaves</h3>
                    <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                        {leaveRequests.filter(l => l.status === 'Pending').length > 0 ? (
                            leaveRequests.filter(l => l.status === 'Pending').map(leave => (
                                <div key={leave._id} className="p-6 rounded-[32px] border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center font-black text-indigo-500 border border-slate-50">
                                                {leave.employeeId?.name ? leave.employeeId.name.charAt(0) : '?'}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-800 text-sm">{leave.employeeId?.name || 'Unknown'}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-[9px] font-black text-indigo-500 uppercase">{leave.leaveType}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleLeaveStatus(leave._id, 'Approved')} className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 shadow-lg shadow-emerald-100"><FaCheck /></button>
                                            <button onClick={() => handleLeaveStatus(leave._id, 'Cancelled')} className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 shadow-lg shadow-rose-100"><FaTimes /></button>
                                        </div>
                                    </div>
                                    <div className="bg-white/50 p-4 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-500 font-bold leading-relaxed">{leave.reason || 'No reason provided.'}</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                                        <span>From: {leave.fromDate}</span>
                                        <span>To: {leave.toDate}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4"><FaTimes size={30}/></div>
                                <p className="font-bold text-sm italic">All caught up! No leave requests.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;