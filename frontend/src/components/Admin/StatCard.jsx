import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, trend, color }) => {
  return (
    <div className="stat-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="stat-info">
        <span className="stat-label">{title}</span>
        <h2 className="stat-value">{value}</h2>
        <p className="stat-trend">{trend}</p>
      </div>
      <div className="stat-icon-bg" style={{ backgroundColor: color + '20' }}>
        
      </div>
    </div>
  );
};

export default StatCard;