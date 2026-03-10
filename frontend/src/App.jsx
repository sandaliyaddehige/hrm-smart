import { useState } from "react";
import { IoBellOutline } from "react-icons/io5";
import ManagerSidebar from "./components/ManagerSidebar";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeList from "./pages/EmployeeList";
import EmployeePerformance from "./pages/EmployeePerformance";
import EmployeeAttendance from "./pages/EmployeeAttendance";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":   return <EmployeeDashboard />;
      case "employees":   return <EmployeeList />;
      case "performance": return <EmployeePerformance />;
      case "attendance":  return <EmployeeAttendance />;
      default: return <div className="p-10 text-gray-400">Page coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      <ManagerSidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">
            {activePage === "dashboard"   && "Manager Dashboard"}
            {activePage === "employees"   && "Employee List"}
            {activePage === "performance" && "Employee Performance Review"}
            {activePage === "attendance"  && "Team Attendance Report"}
            {activePage === "settings"    && "Settings"}
          </h1>
          <div className="flex items-center gap-3">
            {activePage === "attendance" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5">
                  Mar 01, 2026 - Mar 31, 2026
                </span>
                <button className="border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-gray-50">PDF</button>
                <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-blue-700">Excel</button>
              </div>
            )}
            {activePage === "performance" && (
              <span className="text-sm text-gray-500 border border-gray-200 rounded-full px-4 py-1.5">Q1 Review 2026</span>
            )}

            {/* Notification Button */}
            <button className="relative w-9 h-9 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
              <IoBellOutline size={20} />
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