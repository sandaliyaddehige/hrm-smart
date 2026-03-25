import { useState, useEffect } from "react";

const API = "http://localhost:5000";



const avatarColors = ["bg-blue-500","bg-purple-500","bg-pink-500","bg-orange-500","bg-teal-500","bg-rose-500"];
const getInitials  = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase();

const statusStyle = (status) => {
  switch (status) {
    case "Present":  return { bg: "#dcfce7", color: "#15803d" };
    case "Absent":   return { bg: "#fee2e2", color: "#b91c1c" };
    case "Late":     return { bg: "#fef3c7", color: "#92400e" };
    case "On Leave": return { bg: "#e0f2fe", color: "#0369a1" };
    default:         return { bg: "#f3f4f6", color: "#6b7280" };
  }
};

const leaveStatusStyle = (status) => {
  switch (status) {
    case "Approved": return { bg: "#dcfce7", color: "#15803d" };
    case "Rejected": return { bg: "#fee2e2", color: "#b91c1c" };
    default:         return { bg: "#fef9c3", color: "#854d0e" };
  }
};

const DAYS = ["S","M","T","W","T","F","S"];
const calendarDays = [
  [27,28,29,30,1,2,3],
  [4,5,6,7,8,9,10],
  [11,12,13,14,15,16,17],
  [18,19,20,21,22,23,24],
  [25,26,27,28,29,30,31],
];

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0l-4 4m4-4l4 4" />
  </svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
  </svg>
);
const ChevronIcon = () => (
  <svg style={{ width:"14px", height:"14px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const cardT = "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.25s cubic-bezier(0.4,0,0.2,1)";
const itemT = "all 0.2s cubic-bezier(0.4,0,0.2,1)";
const cardHoverOn  = e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor="#e2e8f0"; };
const cardHoverOff = e => { e.currentTarget.style.transform="translateY(0)";   e.currentTarget.style.boxShadow="";                              e.currentTarget.style.borderColor="#f3f4f6"; };

export default function AttendanceLeaveRequest() {
  const [selectedDay,   setSelectedDay]   = useState(10);
  const [attendanceData,setAttendanceData]= useState([]);
  const [loading,       setLoading]       = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [hoveredRow,    setHoveredRow]    = useState(null);
  const [hoveredRecord, setHoveredRecord] = useState(null);
  const [openMenu,      setOpenMenu]      = useState(null);

  useEffect(() => {
  if (!selectedDay) return;
  setLoading(true);
  fetch(`${API}/api/attendance/${selectedDay}`)
    .then(res => res.json())
    .then(data => { setAttendanceData(data); setLoading(false); })
    .catch(() => setLoading(false));
}, [selectedDay]);

useEffect(() => {
  fetch(`${API}/api/leaves`)
    .then(res => res.json())
    .then(data => setLeaveRequests(data))
    .catch(err => console.error(err));
}, []);

  

const handleApprove = (id) => {
  fetch(`${API}/api/leaves/${id}/approve`, { method: "PUT" })
    .then(() => setLeaveRequests(prev => prev.map(r => r._id === id ? { ...r, status: "Approved" } : r)));
};

const handleReject = (id) => {
  fetch(`${API}/api/leaves/${id}/reject`, { method: "PUT" })
    .then(() => setLeaveRequests(prev => prev.map(r => r._id === id ? { ...r, status: "Rejected" } : r)));
};

  const filteredLeave = leaveRequests.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.empNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dayLabel = selectedDay ? `January ${selectedDay}, 2026` : "Select a day";

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Attendance & Leave</h2>
          <p className="text-sm text-gray-500 mt-1">Track attendance and manage leave requests.</p>
        </div>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
          style={{ transition: itemT }}
          onMouseEnter={e => { e.currentTarget.style.background="#1d4ed8"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(37,99,235,0.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="#2563eb"; e.currentTarget.style.transform="translateY(0)";    e.currentTarget.style.boxShadow="none"; }}
        >
          Export All <UploadIcon />
        </button>
      </div>

      {/* Calendar + Attendance Record */}
      <div className="grid grid-cols-3 gap-5 mb-6 items-stretch">

        {/* Calendar */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 flex flex-col"
          style={{ transition: cardT }}
          onMouseEnter={cardHoverOn} onMouseLeave={cardHoverOff}
        >
          <p className="text-blue-500 font-semibold text-sm text-center mb-4">January 2026</p>
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d, i) => (
              <div key={i} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 flex-1 content-start">
            {calendarDays.map((week, wi) =>
              week.map((day, di) => {
                const isCurrent  = !(wi === 0 && day > 7) && !(wi === 4 && day < 20);
                const isSelected = day === selectedDay && isCurrent;
                const isToday    = day === 10 && isCurrent;
                return (
                  <div key={`${wi}-${di}`} className="flex items-center justify-center py-0.5">
                    <div
                      onClick={() => isCurrent && setSelectedDay(day)}
                      className={`flex items-center justify-center text-xs w-8 h-8 rounded-full transition-all duration-200
                        ${isToday && isSelected
                          ? "bg-blue-500 text-white font-bold shadow-md shadow-blue-200 ring-2 ring-blue-300"
                          : isToday
                            ? "bg-blue-500 text-white font-bold shadow-md shadow-blue-200 cursor-pointer"
                            : isSelected
                              ? "bg-blue-100 text-blue-700 font-bold cursor-pointer"
                              : isCurrent
                                ? "text-gray-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:font-semibold"
                                : "text-gray-300 cursor-default"}`}
                    >{day}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Attendance Record */}
        <div
          className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5"
          style={{ transition: cardT }}
          onMouseEnter={cardHoverOn} onMouseLeave={cardHoverOff}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Attendance Record</h3>
            <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{dayLabel}</span>
          </div>

          {!selectedDay ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-2 py-8">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">Select a day to view records</p>
            </div>
          ) : loading ? (
            <div className="flex flex-col gap-3">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center gap-4 px-3 py-3 rounded-xl bg-gray-50 animate-pulse">
                  <div className="w-10 h-10 rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-40" />
                    <div className="h-2 bg-gray-100 rounded w-28" />
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-12" />
                  <div className="h-6 bg-gray-200 rounded-full w-16" />
                </div>
              ))}
            </div>
          ) : attendanceData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-2 py-8">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">No records for this day</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {attendanceData.map((rec, i) => {
                const hov = hoveredRecord === i;
                const st  = statusStyle(rec.status);
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredRecord(i)}
                    onMouseLeave={() => setHoveredRecord(null)}
                    style={{
                      display:"flex", alignItems:"center", gap:"14px",
                      padding:"10px 14px", borderRadius:"12px", cursor:"pointer",
                      transition: itemT,
                      background: hov ? "#f8fafc" : "transparent",
                      transform: hov ? "translateX(3px)" : "translateX(0)",
                      borderBottom: i < attendanceData.length - 1 ? "1px solid #f1f5f9" : "none",
                    }}
                  >
                    <div style={{
                      width:"40px", height:"40px", borderRadius:"10px", flexShrink:0,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      transition: itemT,
                      background: hov ? "#dbeafe" : "#f1f5f9",
                      color: hov ? "#2563eb" : "#94a3b8",
                    }}>
                      <BriefcaseIcon />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:"13px", fontWeight:600, color: hov ? "#2563eb" : "#1f2937", transition: itemT }}>{rec.employee}</div>
                      <div style={{ fontSize:"11px", color:"#9ca3af", marginTop:"2px" }}>{rec.time}</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"5px", marginRight:"10px" }}>
                      <span style={{ fontSize:"11px", color:"#9ca3af" }}>Hours</span>
                      <span style={{ fontSize:"13px", fontWeight:700, color:"#111827" }}>{rec.hours}</span>
                    </div>
                    <span style={{
                      fontSize:"11px", fontWeight:600, padding:"4px 12px",
                      borderRadius:"20px", background: st.bg, color: st.color,
                      minWidth:"70px", textAlign:"center", display:"inline-block",
                    }}>{rec.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Leave Requests */}
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        style={{ transition: cardT }}
        onMouseEnter={cardHoverOn} onMouseLeave={cardHoverOff}
      >
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-gray-800">Leave Requests</h3>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2" style={{ width:"240px" }}>
              <span className="text-gray-400"><SearchIcon /></span>
              <input
                type="text"
                placeholder="Search name, ID, type..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
              />
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Name","EMP Num","Leave Type","Enabled","Status","Action"].map(h => (
                  <th key={h} className="text-left text-sm font-semibold text-gray-400 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeave.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-300 text-sm font-medium">No results found</td>
                </tr>
              ) : filteredLeave.map((req, i) => {
                const hov       = hoveredRow === i;
                const lst       = leaveStatusStyle(req.status);
                const isPending = req.status === "Pending";
                return (
                  <tr
                    key={req._id}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ transition: itemT, background: hov ? "#f8fafc" : "transparent", cursor:"pointer" }}
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarColors[i % avatarColors.length]}`}
                          style={{ transition: itemT, transform: hov ? "scale(1.08)" : "scale(1)" }}
                        >{getInitials(req.name)}</div>
                        <span style={{ fontSize:"13px", fontWeight:600, color: hov ? "#2563eb" : "#1f2937", transition: itemT }}>{req.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-500">{req.empNum}</td>
                    <td className="py-3 pr-4 text-sm text-gray-700">{req.leaveType}</td>
                    <td className="py-3 pr-4">
                      <span style={{ fontSize:"12px", fontWeight:600, color: req.enabled === "Active" ? "#16a34a" : "#9ca3af" }}>
                        {req.enabled}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span style={{ fontSize:"11px", fontWeight:700, padding:"4px 12px", borderRadius:"20px", background: lst.bg, color: lst.color, display:"inline-block" }}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3" style={{ position:"relative" }}>
                      {isPending ? (
                        <div style={{ position:"relative", display:"inline-block" }}>
                          <button
                            onClick={() => setOpenMenu(openMenu === i ? null : i)}
                            style={{
                              display:"flex", alignItems:"center", gap:"5px",
                              border:"1px solid #e2e8f0", borderRadius:"8px",
                              padding:"6px 12px", cursor:"pointer",
                              fontSize:"12px", fontWeight:600,
                              background: openMenu === i ? "#f8fafc" : "#fff",
                              color:"#374151", transition: itemT,
                            }}
                          >
                            Action
                            <span style={{ transition: itemT, transform: openMenu === i ? "rotate(180deg)" : "rotate(0deg)", display:"inline-flex" }}>
                              <ChevronIcon />
                            </span>
                          </button>
                          {openMenu === i && (
                            <div style={{
                              position:"absolute", top:"calc(100% + 6px)", left:0, zIndex:50,
                              background:"#fff", border:"1px solid #e2e8f0", borderRadius:"10px",
                              boxShadow:"0 8px 24px rgba(0,0,0,0.10)", minWidth:"130px",
                              overflow:"hidden",
                            }}>
                              <button
                                onClick={() => { handleApprove(req._id); setOpenMenu(null); }}
                                style={{ width:"100%", display:"flex", alignItems:"center", gap:"8px", padding:"9px 14px", border:"none", background:"#fff", cursor:"pointer", fontSize:"13px", fontWeight:600, color:"#16a34a", transition: itemT }}
                                onMouseEnter={e => e.currentTarget.style.background="#f0fdf4"}
                                onMouseLeave={e => e.currentTarget.style.background="#fff"}
                              ><CheckIcon /> Approve</button>
                              <div style={{ height:"1px", background:"#f1f5f9" }} />
                              <button
                                onClick={() => { handleReject(req._id); setOpenMenu(null); }}
                                style={{ width:"100%", display:"flex", alignItems:"center", gap:"8px", padding:"9px 14px", border:"none", background:"#fff", cursor:"pointer", fontSize:"13px", fontWeight:600, color:"#dc2626", transition: itemT }}
                                onMouseEnter={e => e.currentTarget.style.background="#fff1f2"}
                                onMouseLeave={e => e.currentTarget.style.background="#fff"}
                              ><XIcon /> Reject</button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize:"12px", fontWeight:600, color: req.status === "Approved" ? "#16a34a" : "#dc2626" }}>
                          {req.status === "Approved" ? "✓ Approved" : "✗ Rejected"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
