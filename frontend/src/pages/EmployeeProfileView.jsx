import { useState, useEffect } from "react";

// ── Mock Data ──


const mockNotices = [];

const mockLeaveDates = [
  { label: "Office OFF", date: "07 Sep 2026", color: "#3b82f6" },
  { label: "Office OFF", date: "07 Sep 2026", color: "#93c5fd" },
  { label: "Office OFF", date: "07 Sep 2026", color: "#4ade80" },
  { label: "Office OFF", date: "07 Sep 2026", color: "#f87171" },
  { label: "Office OFF", date: "07 Sep 2026", color: "#c084fc" },
];
// ────

const cardT = "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s, border-color 0.25s";
const itemT = "all 0.2s cubic-bezier(0.4,0,0.2,1)";

// ── Detail Row ────
const DetailRow = ({ label, value, isEmail }) => (
  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
    <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 600, color: "#374151", width: "140px", whiteSpace: "nowrap" }}>{label}</td>
    <td style={{ padding: "12px 16px", fontSize: "13px", color: isEmail ? "#3b82f6" : "#6b7280" }}>{value}</td>
  </tr>
);

export default function EmployeeProfileView() {
 const [emp, setEmp] = useState({});

useEffect(() => {
  fetch("http://localhost:5000/api/employees/6650a1234b5c6d7e8f901234")
    .then(res => res.json())
    .then(data => setEmp(data))
    .catch(err => console.error(err));
}, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Employee Profile view</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your team members and their information</p>
      </div>

      {/* ── Top Row: Profile Card + Right Section ────────────────────── */}
      <div className="flex gap-5 mb-5 items-start">

        {/* Profile Card */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col items-center"
          style={{ minWidth: "200px", width: "200px", background: "#1e3a5f", transition: cardT }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = ""; }}
        >
          <div style={{ padding: "14px 0 8px", fontSize: "12px", fontWeight: 600, color: "#94a3b8" }}>{emp.role}</div>

          {/* Avatar */}
          <div style={{ width: "110px", height: "110px", borderRadius: "50%", background: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 0", fontSize: "32px", fontWeight: 700, color: "rgba(255,255,255,0.9)", flexShrink: 0, boxShadow: "inset 0 2px 8px rgba(0,0,0,0.15)" }}>
           {emp.name ? emp.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : ""}
          </div>

          <div style={{ padding: "10px 16px 6px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#f1f5f9" }}>{emp.name}</div>
            <div style={{ fontSize: "11px", color: "#64748b", marginTop: "6px", lineHeight: "1.5" }}>At work For {emp.workedFor}</div>
          </div>
          <div style={{ height: "14px" }} />
        </div>

        {/* Right Section: Stats Bar + Details Grid */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Stats Bar */}
          <div
            className="rounded-2xl flex items-center justify-around"
            style={{ background: "#1e40af", padding: "20px 32px", transition: cardT }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = ""; }}
          >
            {[
              { label: "ATTENDANCE", value: emp.attendance ? `${emp.attendance.present}/${emp.attendance.total}` : "0/0" },
              { label: "Leaves",     value: emp.leaves ? `${emp.leaves.taken}/${emp.leaves.total}` : "0/0" },
              { label: "Awards",     value: emp.awards },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#93c5fd", letterSpacing: "0.05em", marginBottom: "6px" }}>{stat.label}</div>
                <div style={{ fontSize: "26px", fontWeight: 800, color: "#fff" }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* ── Details + Right Panel ─────────────────────────────── */}
          <div className="grid grid-cols-3 gap-5">

            {/* ── Left: 2 Detail Tables ───────────────────────────── */}
            <div className="col-span-2 flex flex-col gap-5">

              {/* Personal Details */}
              <div
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                style={{ transition: cardT }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ background: "#dbeafe", padding: "12px 18px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1d4ed8" }}>Employee Details</h3>
                </div>
                <table className="w-full">
                  <tbody>
                    <DetailRow label="Name"         value={emp.name} />
                    <DetailRow label="Fathers Name" value={emp.fathersName} />
                    <DetailRow label="DOB"          value={emp.dob} />
                    <DetailRow label="GENDER"       value={emp.gender} />
                    <DetailRow label="Email"        value={emp.email} isEmail />
                    <DetailRow label="Phone"        value={emp.phone} />
                    <DetailRow label="Address"      value={emp.address} />
                  </tbody>
                </table>
              </div>

              {/* Employment Details */}
              <div
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                style={{ transition: cardT }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ background: "#dbeafe", padding: "12px 18px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1d4ed8" }}>Employee Details</h3>
                </div>
                <table className="w-full">
                  <tbody>
                    <DetailRow label="EMP ID" value={emp.empId} />
                    <DetailRow label="DEP M"  value={emp.department} />
                    <DetailRow label="DESG"   value={emp.designation} />
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Right: Notice Board + Leave Dates ──────────────── */}
            <div className="flex flex-col gap-5">

              {/* Notice Board */}
              <div
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                style={{ transition: cardT }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ background: "#dbeafe", padding: "12px 18px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1d4ed8" }}>Notice Board</h3>
                </div>
                <div style={{ padding: "16px", minHeight: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {mockNotices.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "#cbd5e1", fontWeight: 500 }}>NO Notice Here</p>
                  ) : (
                    <div className="flex flex-col gap-3 w-full">
                      {mockNotices.map((n, i) => (
                        <div key={i} style={{ padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", fontSize: "13px", color: "#374151" }}>{n}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Leave Dates */}
              <div
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                style={{ transition: cardT }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ background: "#dbeafe", padding: "12px 18px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1d4ed8" }}>Leave Dates</h3>
                </div>
                <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {mockLeaveDates.map((leave, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderRadius: "24px", background: leave.color, transition: itemT, cursor: "default" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>{leave.label}</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>{leave.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
