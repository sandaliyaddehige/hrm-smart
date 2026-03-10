import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import './TopNav.css'; 

const TopNav = ({ title }) => {
  return (
    <div className="top-nav">
      <h1>{title || "Admin Dashboard"}</h1>
      <div className="user-controls">
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search data..." />
        </div>
        <div className="header-icon">
          <FaBell />
        </div>
        <div className="user-profile">
          <div className="avatar">AR</div>
          <span>Alex Rivera</span>
        </div>
      </div>
    </div>
  );
};


export default TopNav;