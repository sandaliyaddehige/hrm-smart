import { useState } from "react";

const allEmployees = [
  { name: "Rasil Laksika", id: "EMP-102", dept: "Human Resources", present: 22, absent: 0, leave: 1, att: 98.5, status: "ACTIVE" },
  { name: "John Silva", id: "EMP-105", dept: "IT / Engineering", present: 18, absent: 4, leave: 1, att: 78.0, status: "WARNING" },
  { name: "Alice Johnson", id: "EMP-101", dept: "Engineering", present: 21, absent: 1, leave: 1, att: 91.3, status: "ACTIVE" },
  { name: "Bob Smith", id: "EMP-103", dept: "Sales", present: 20, absent: 2, leave: 1, att: 87.0, status: "ACTIVE" },
  { name: "Carla Diaz", id: "EMP-104", dept: "Engineering", present: 15, absent: 6, leave: 2, att: 65.2, status: "WARNING" },
  { name: "David Miller", id: "EMP-106", dept: "Human Resources", present: 23, absent: 0, leave: 0, att: 100, status: "ACTIVE" },
];

const departments = ["All", "Engineering", "Sales", "Human Resources", "IT / Engineering"];

const statusStyle = {
  "ACTIVE": "bg-green-100 text-green-700",
  "WARNING": "bg-red-100 text-red-500",
};

const attColor = (att) => att >= 85 ? "text-green-600" : "text-red-500";

const trendDots = [
  { color: "bg-green-500" },
  { color: "bg-green-500" },
  { color: "bg-red-400" },
  { color: "bg-green-500" },
  { color: "bg-yellow-400" },
  { color: "bg-green-500" },
];

const ITEMS_PER_PAGE = 4;

export default function Attendance() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = allEmployees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "All" || e.dept === dept;
    return matchSearch && matchDept;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Total Team Members</p>
          <p className="text-3xl font-bold text-gray-800">48</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Avg. Attendance %</p>
          <p className="text-3xl font-bold text-blue-600">94.2%</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400 mb-1">On Leave Today</p>
          <p className="text-3xl font-bold text-yellow-500">05</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5 shadow-sm text-white">
          <p className="text-xs text-gray-400 mb-2">Monthly Trend</p>
          <div className="flex items-center gap-1.5 mb-1">
            {trendDots.map((d, i) => (
              <span key={i} className={`w-4 h-4 rounded-sm inline-block ${d.color}`}></span>
            ))}
          </div>
          <p className="text-sm font-semibold mt-1">Healthy</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Search employee name..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 w-64"
        />
        <div className="relative">
          <select
            value={dept}
            onChange={e => { setDept(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-xl px-5 py-3 text-sm text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white cursor-pointer pr-10 min-w-[180px]"
          >
            {departments.map(d => <option key={d}>Dept: {d}</option>)}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">▾</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-8 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          <span className="col-span-2">Employee Name</span>
          <span>ID</span>
          <span>Department</span>
          <span>Present</span>
          <span>Absent</span>
          <span>Leave</span>
          <span>Att. % / Status</span>
        </div>
        <div className="divide-y divide-gray-50">
          {paginated.map((e, i) => (
            <div key={i} className="grid grid-cols-8 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
              <span className="col-span-2 font-medium text-gray-800 text-sm">{e.name}</span>
              <span className="text-sm text-gray-400">{e.id}</span>
              <span className="text-sm text-gray-500">{e.dept}</span>
              <span className="text-sm text-gray-700">{e.present}</span>
              <span className="text-sm text-gray-700">{e.absent}</span>
              <span className="text-sm text-gray-700">{e.leave}</span>
              <div className="flex flex-col gap-1">
                <span className={`text-sm font-bold ${attColor(e.att)}`}>{e.att.toFixed(1)}%</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit ${statusStyle[e.status]}`}>
                  {e.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
              page === p ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}