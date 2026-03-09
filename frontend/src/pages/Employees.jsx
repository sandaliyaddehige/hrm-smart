import { useState } from "react";

const avatarColors = [
  "bg-gray-600", "bg-green-500", "bg-blue-500", "bg-purple-500",
  "bg-pink-400", "bg-indigo-500", "bg-teal-500",
];

const employees = [
  { initials: "AJ", name: "Alice Johnson", action: "Performance Review Submitted", joinDate: "Jun 15, 2026", status: "Active", colorIdx: 0 },
  { initials: "BS", name: "Bob Smith", action: "Onboarding Completed", joinDate: "Jun 14, 2026", status: "Active", colorIdx: 1 },
  { initials: "CD", name: "Carla Diaz", action: "Leave Request (Sick)", joinDate: "Jun 14, 2026", status: "Active", colorIdx: 2 },
  { initials: "DM", name: "David Miller", action: "Task Assignment Updated", joinDate: "Jun 13, 2026", status: "On Leave", colorIdx: 3 },
  { initials: "EW", name: "Emma Wilson", action: "Performance Review Submitted", joinDate: "Jun 12, 2026", status: "Active", colorIdx: 4 },
  { initials: "FG", name: "Frank Garcia", action: "Onboarding Completed", joinDate: "Jun 11, 2026", status: "Active", colorIdx: 5 },
  { initials: "HL", name: "Hannah Lee", action: "Leave Request (Vacation)", joinDate: "Jun 10, 2026", status: "On Leave", colorIdx: 6 },
  { initials: "IT", name: "Ivan Torres", action: "Performance Review Submitted", joinDate: "Jun 9, 2026", status: "Active", colorIdx: 0 },
];

const statusStyle = {
  "Active": "bg-green-100 text-green-700 border border-green-200",
  "On Leave": "bg-yellow-100 text-yellow-700 border border-yellow-200",
  "Inactive": "bg-gray-100 text-gray-500 border border-gray-200",
};

export default function Employees() {
  const [search, setSearch] = useState("");
  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Employee List</h2>
          <p className="text-sm text-gray-400 mt-0.5">{filtered.length} employees</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 w-52"
          />
          <button className="bg-gray-800 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-gray-900 transition-colors">
            + Add New Employee
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          <span>Employee Name</span>
          <span>Action</span>
          <span>Join Date</span>
          <span className="text-right">Status</span>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-gray-50">
          {filtered.map((emp, i) => (
            <div key={i} className="grid grid-cols-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${avatarColors[emp.colorIdx]} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                  {emp.initials}
                </div>
                <span className="font-medium text-gray-800 text-sm">{emp.name}</span>
              </div>
              <span className="text-sm text-gray-500">{emp.action}</span>
              <span className="text-sm text-gray-400">{emp.joinDate}</span>
              <div className="flex justify-end">
                <span className={`text-xs font-semibold px-4 py-1.5 rounded-full ${statusStyle[emp.status]}`}>
                  {emp.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}