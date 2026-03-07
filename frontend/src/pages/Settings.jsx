import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import '../styles/Settings.css';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="settings-container">
      <div className="settings-header-main">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-grid">
        {/* --- LEFT COLUMN --- */}
        <div className="settings-left-col">
          {/* Profile Card */}
          <div className="profile-card-mini">
            <div className="profile-img-container">
              <img src="https://imgs.search.brave.com/QqkEmJOD3Z5Kl5ReAD5F5Wp0nwN2gU3T4zCNmos0ZHo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMjEvQWRt/aW4tUHJvZmlsZS1W/ZWN0b3ItUE5HLUlt/YWdlLnBuZw" alt="Admin" className="admin-large-img" />
            </div>
            <h3>Admin</h3>
            <button className="change-pic-btn">Change Picture</button>
          </div>

          {/* Info & Preferences Card */}
          <div className="info-summary-card">
            <section className="summary-section">
              <h4>Information</h4>
              <div className="summary-item"><span>Name:</span> <p>Name, Last Name</p></div>
              <div className="summary-item"><span>Email:</span> <p>user@email.com</p></div>
              <div className="summary-item"><span>Tel:</span> <p>+51 966 696 123</p></div>
              <div className="summary-item"><span>Plan:</span> <p>Hardcoded</p></div>
            </section>

            <section className="summary-section">
              <h4>Preferences</h4>
              <div className="summary-item"><span>Plan:</span> <p>Hardcoded</p></div>
              <div className="summary-item toggle-row">
                <span>Light/dark:</span>
                <div 
                  className={`theme-toggle ${isDarkMode ? 'dark' : ''}`} 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  <div className="toggle-circle"></div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* --- RIGHT COLUMN (User Settings) --- */}
        <div className="settings-right-col">
          <div className="user-settings-form">
            <h2>User Settings</h2>
            
            <div className="form-section">
              <h4>Details</h4>
              <div className="input-row">
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" placeholder="Pepito Rodrick ..." />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Coronel Sifuentes ..." />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" placeholder="pepito.c.sifuentes@uni.pe" />
                </div>
                <div className="input-group">
                  <label>Tel - Number:</label>
                  <div className="tel-input">
                    <span className="country-code">+51</span>
                    <input type="text" placeholder="969 123 456" />
                  </div>
                </div>
              </div>
              <button className="save-changes-btn">Save changes</button>
            </div>

            <div className="form-section password-section">
              <h4>Password</h4>
              <div className="input-row">
                <div className="input-group">
                  <label>Change password</label>
                  <input type="password" placeholder="Put your password..." />
                </div>
                <div className="input-group no-label">
                  <input type="password" placeholder="Confirm password..." />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>New password</label>
                  <input type="password" placeholder="Put your new password..." />
                </div>
                <div className="input-group no-label">
                  <input type="password" placeholder="Confirm new password..." />
                </div>
              </div>
              <div className="form-actions-bottom">
                <button className="save-changes-btn">Save changes</button>
                <a href="#" className="forgot-link">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;