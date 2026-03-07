import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaThLarge, FaUsers, FaMoneyBillWave, FaCalendarCheck, FaUserTie, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <FaThLarge />, path: '/dashboard' },
    { name: 'Employees', icon: <FaUsers />, path: '/employees' },
    { name: 'Payrolls', icon: <FaMoneyBillWave />, path: '/payrolls' },
    { name: 'Attendance', icon: <FaCalendarCheck />, path: '/attendance' },
    { name: 'Recruitment', icon: <FaUserTie />, path: '/recruitment' },
    { name: 'Report', icon: <FaFileAlt />, path: '/reports' },
    { name: 'Settings', icon: <FaCog />, path: '/settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src="/logo new.png" alt="Logo" className="brand-logo" style={{width: '40px'}} />
        <div className="brand-text">
          <h3 style={{fontSize: '16px', margin: 0}}>Admin view</h3>
          <p style={{fontSize: '12px', margin: 0, color: '#888'}}>ADVERA HR</p>
        </div>
      </div>

      <nav className="sidebar-menu" style={{marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
            style={{textDecoration: 'none', color: '#555', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px'}}
          >
            {item.icon} <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer" style={{marginTop: 'auto', paddingBottom: '20px'}}>
        <button className="logout-button" style={{width: '100%', padding: '10px', border: 'none', borderRadius: '8px', background: '#fff0f0', color: '#ff4d4d', cursor: 'pointer'}}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;