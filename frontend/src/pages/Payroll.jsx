import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaCalendarAlt, FaChartLine, FaChevronDown, FaRegFileAlt,
  FaTimes, FaFilePdf, FaFileExcel, FaFileCsv
} from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Payroll = () => {
  const [showModal, setShowModal] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  
  const [employees, setEmployees] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [formData, setFormData] = useState({
    employeeId: '',
    amount: '',
    month: new Date().toISOString().slice(0, 7) 
  });

  
  const fetchData = async () => {
    try {
      const empRes = await axios.get('http://localhost:5000/api/employee');
      const payRes = await axios.get('http://localhost:5000/api/payroll/all');
      setEmployees(empRes.data);
      setTransactions(payRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/payroll/add', formData);
      alert("Payment Processed Successfully!");
      setShowModal(false);
      fetchData(); 
      setFormData({ employeeId: '', amount: '', month: new Date().toISOString().slice(0, 7) });
    } catch (err) {
      alert("Error processing payment");
      console.error(err);
    }
  };

  // --- Export Logic ---
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Payroll Report - HRM Smart", 14, 15);
    const tableColumn = ["Employee Name", "Role", "Amount ($)", "Month"];
    const tableRows = transactions.map(tx => [
      tx.employeeId?.name || "Unknown",
      tx.employeeId?.role || "N/A",
      tx.amount.toLocaleString(),
      tx.month
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save(`Payroll_Report_${new Date().toLocaleDateString()}.pdf`);
    setShowExportOptions(false);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions.map(tx => ({
      Employee: tx.employeeId?.name,
      Role: tx.employeeId?.role,
      Amount: tx.amount,
      Month: tx.month
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payroll");
    XLSX.writeFile(wb, "Payroll_Report.xlsx");
    setShowExportOptions(false);
  };

  
  const getDynamicChartData = () => {
    if (transactions.length === 0) return [{ name: "No Data", value: 1 }];
    const summary = transactions.reduce((acc, curr) => {
      const name = curr.employeeId?.name || "Unknown";
      acc[name] = (acc[name] || 0) + curr.amount;
      return acc;
    }, {});
    return Object.keys(summary).map(key => ({ name: key, value: summary[key] }));
  };

  const chartData = getDynamicChartData();
  const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#1e293b', '#fbbf24'];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Payroll System</h1>
          <p className="text-slate-500 font-medium">Manage employee salaries and benefits.</p>
        </div>
        
        <div className="relative">
          <button 
            className="bg-[#4f46e5] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#4338ca] transition-all flex items-center gap-2"
            onClick={() => setShowExportOptions(!showExportOptions)}
          >
            Export All <FaChevronDown className={showExportOptions ? 'rotate-180' : ''} />
          </button>

          {showExportOptions && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] overflow-hidden">
              <div onClick={exportPDF} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50">
                <FaFilePdf className="text-rose-500" /> <span className="text-sm font-bold text-slate-600">Export as PDF</span>
              </div>
              <div onClick={exportExcel} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 cursor-pointer">
                <FaFileExcel className="text-emerald-500" /> <span className="text-sm font-bold text-slate-600">Export as Excel</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Next Pay Date</span>
            <h2 className="text-2xl font-black text-slate-800 mt-1">April 1st, 2026</h2>
          </div>
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#4f46e5] text-xl"><FaCalendarAlt /></div>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Total Payroll Cost</span>
            <h2 className="text-2xl font-black text-slate-800 mt-1">
              ${transactions.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
            </h2>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 text-xl"><FaChartLine /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-slate-800 mb-8">Employee Wise Distribution</h3>
          <div className="h-52 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                  {chartData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} cornerRadius={10} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <button 
            className="w-full bg-indigo-50 text-[#4f46e5] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100"
            onClick={() => setShowModal(true)}
          >
            <FaRegFileAlt /> Create Payroll Entry
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-slate-800 mb-8">Recent Transactions</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {transactions.length > 0 ? transactions.map(item => (
              <div key={item._id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center font-bold text-[#4f46e5]">
                    {item.employeeId?.name ? item.employeeId.name.split(' ').map(n => n[0]).join('') : '??'}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800">{item.employeeId?.name || "Unknown"}</h4>
                    <span className="text-xs font-bold text-slate-400 uppercase">{item.employeeId?.role || "Staff"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="font-black text-slate-800">${item.amount.toLocaleString()}</h4>
                  <span className="text-xs font-bold text-slate-400">{item.month}</span>
                </div>
              </div>
            )) : <p className="text-slate-400 text-center py-10">No transactions recorded yet.</p>}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl p-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-800">New Payroll Entry</h3>
              <button onClick={() => setShowModal(false)}><FaTimes className="text-slate-400" /></button>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Select Employee</label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                  required
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                >
                  <option value="">Choose Employee...</option>
                  {employees.map(emp => (
                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Amount ($)</label>
                  <input 
                    type="number" required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Month</label>
                  <input 
                    type="month" required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                    value={formData.month}
                    onChange={(e) => setFormData({...formData, month: e.target.value})}
                  />
                </div>
              </div>
              <button className="w-full py-4 rounded-2xl font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] shadow-lg">Process Payment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;