import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaChartLine, 
  FaChevronDown, 
  FaRegFileAlt,
  FaTimes,
  FaFilePdf,
  FaFileExcel,
  FaFileCsv
} from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Payroll.css';

const Payroll = () => {
  // States පාලනය කිරීම
  const [showModal, setShowModal] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Chart දත්ත (Figma UI එකට අනුව)
  const chartData = [
    { name: 'Payment 1', value: 54 },
    { name: 'Payment 2', value: 20 },
    { name: 'Payment 3', value: 15 },
    { name: 'Payment 4', value: 11 },
  ];
  const COLORS = ['#4F86F7', '#7EB6FF', '#C2D9FF', '#10192D'];

  // Transaction History දත්ත
  const transactions = [
    { id: 1, name: 'Chloe Wallows', company: 'Saphore Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
    { id: 2, name: 'Chloe Wallows', company: 'Saphore Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
    { id: 3, name: 'Chloe Wallows', company: 'Saphore Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
    { id: 4, name: 'Chloe Wallows', company: 'Saphore Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
    { id: 5, name: 'Chloe Wallows', company: 'Saphore Inc.', amount: '$1,546.12', date: '1 Mar 2022' },
  ];

  return (
    <div className="payroll-container">
      {/* 1. Header Section */}
      <div className="payroll-header">
        <div className="header-left">
          <h1>Payroll System</h1>
          <p>Manage employee salaries and benefits.</p>
        </div>
        
        {/* Export All Button with Dropdown */}
        <div className="header-right" style={{ position: 'relative' }}>
          <button 
            className="export-btn" 
            onClick={() => setShowExportOptions(!showExportOptions)}
          >
            Export All
          </button>

          {showExportOptions && (
            <div className="export-dropdown">
              <div className="export-option-item" onClick={() => setShowExportOptions(false)}>
                <FaFilePdf color="#FF5733" /> Export as PDF
              </div>
              <div className="export-option-item" onClick={() => setShowExportOptions(false)}>
                <FaFileExcel color="#2ecc71" /> Export as Excel
              </div>
              <div className="export-option-item" onClick={() => setShowExportOptions(false)}>
                <FaFileCsv color="#3498db" /> Export as CSV
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Top Summary Cards */}
      <div className="payroll-top-cards">
        <div className="upcoming-card">
          <div className="card-info">
            <span>Upcoming</span>
            <h2>April 1st, 2022</h2>
          </div>
          <div className="card-icon"><FaCalendarAlt /></div>
        </div>
        
        <div className="outstanding-card">
          <div className="card-info">
            <span>Total Outstanding</span>
            <h2>$58,764.25</h2>
          </div>
          <div className="card-icon blue"><FaChartLine /></div>
        </div>
      </div>

      {/* 3. Main Grid */}
      <div className="payroll-main-grid">
        
        {/* Payroll Summary Section */}
        <div className="summary-section">
          <div className="section-header">
            <div>
              <h3>Payroll Summary</h3>
              <span>From 1-31 March, 2022</span>
            </div>
            <button className="dropdown-btn" onClick={() => setShowModal(true)}>
              Create A Contract <FaChevronDown />
            </button>
          </div>

          <div className="chart-container">
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie 
                    data={chartData} 
                    innerRadius={60} 
                    outerRadius={80} 
                    paddingAngle={5} 
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-label">54%</div>
            </div>

            <div className="chart-legend">
              <div className="legend-item"><span className="dot b1"></span> Payment <b>$234.20</b></div>
              <div className="legend-item"><span className="dot b2"></span> Payment <b>$95.86</b></div>
              <div className="legend-item"><span className="dot b3"></span> Payment <b>$181.34</b></div>
              <div className="legend-item"><span className="dot b4"></span> Payment <b>$37.13</b></div>
            </div>
          </div>
          
          <div className="summary-footer">
            <button className="create-contract-footer" onClick={() => setShowModal(true)}>
              <FaRegFileAlt /> Create A Contract
            </button>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="transaction-section">
          <div className="section-header">
            <h3>Transaction History</h3>
            <a href="#" className="see-all">See All</a>
          </div>
          <div className="transaction-list">
            {transactions.map(item => (
              <div className="transaction-item" key={item.id}>
                <div className="user-info">
                  <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt="user" />
                  <div>
                    <h4>{item.name}</h4>
                    <span>{item.company}</span>
                  </div>
                </div>
                <div className="amount-info">
                  <h4>{item.amount}</h4>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CREATE CONTRACT MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="contract-modal">
            <div className="modal-header">
              <h3>Create New Employment Contract</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            <form className="contract-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>Employee Name</label>
                  <input type="text" placeholder="Select Employee..." />
                </div>
                <div className="form-group">
                  <label>Job Title / Role</label>
                  <input type="text" placeholder="e.g. Software Engineer" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Basic Salary ($)</label>
                  <input type="number" placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Contract Type</label>
                  <select>
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>End Date (Optional)</label>
                  <input type="date" />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Generate Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;