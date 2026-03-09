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
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="9" height="9" rx="2" fill="white" opacity="0.9"/>
              <rect x="13" y="2" width="9" height="9" rx="2" fill="white" opacity="0.6"/>
              <rect x="2" y="13" width="9" height="9" rx="2" fill="white" opacity="0.6"/>
              <rect x="13" y="13" width="9" height="9" rx="2" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm leading-tight">ManagerView</p>
            <p className="text-xs text-gray-400">HRM Portal</p>
          </div>
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
        <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <span>⬛</span> Logout
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
          <div className="flex items-center gap-4">
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
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-white">AR</div>
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