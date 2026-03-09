import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Performance from "./pages/Performance";
import Attendance from "./pages/Attendance";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "employees", label: "Employees", icon: "👥" },
  { id: "performance", label: "Performance", icon: "✔" },
  { id: "attendance", label: "Attendance", icon: "ℹ" },
  { id: "reports", label: "Reports", icon: "≡" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "employees": return <Employees />;
      case "performance": return <Performance />;
      case "attendance": return <Attendance />;
      default: return <div className="p-10 text-gray-400">Page coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 px-2">
          <img
            src="/logo.png"
            alt="Advera HR Logo"
            className="w-28 h-auto object-contain"
          />
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activePage === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button className="flex items-center justify-center gap-2 px-2 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-xl transition-all shadow-sm hover:shadow-md">
          <LogoutIcon />
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">
            {activePage === "dashboard" && "Manager Dashboard"}
            {activePage === "employees" && "Employee List"}
            {activePage === "performance" && "Employee Performance Review"}
            {activePage === "attendance" && "Team Attendance Report"}
            {activePage === "reports" && "Reports"}
            {activePage === "settings" && "Settings"}
          </h1>
          <div className="flex items-center gap-3">
            {activePage === "attendance" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5">Mar 01, 2026 - Mar 31, 2026</span>
                <button className="border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-gray-50">PDF</button>
                <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-blue-700">Excel</button>
              </div>
            )}
            {activePage === "performance" && (
              <span className="text-sm text-gray-500 border border-gray-200 rounded-full px-4 py-1.5">Q1 Review 2026</span>
            )}

            {/* Notification Button */}
            <button className="relative w-9 h-9 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* User */}
            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">AR</div>
              <span className="text-sm font-medium text-gray-700">Alex Rivera ▾</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}