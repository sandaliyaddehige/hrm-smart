import { useState } from "react";

// ── Mock Data ──
const mockUser = {
  firstName:        "Gihan",
  lastName:         "Pramith",
  email:            "gihan.p@company.com",
  address:          "123 Business Bay, High Street, Colombo, Sri Lanka",
  contactNumber:    "+94 77 123 4567",
  emergencyContact: "+94 77 987 6543",
  employeeId:       "HRM-2026-042",
  department:       "Human Resources",
  joinDate:         "January 12, 2024",
  role:             "HR Manager",
  jobTitle:         "HR Manager",
  employmentType:   "Full Time",
  workLocation:     "Colombo, Sri Lanka",
};
// ──────────

const getInitials = (first, last) => `${first[0]}${last[0]}`.toUpperCase();
const TABS = ["Personal Information", "Employment Details", "Documents", "Security Settings"];

const itemT = "all 0.2s cubic-bezier(0.4,0,0.2,1)";
const cardT = "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s, border-color 0.25s";

// ── Reusable Field ────────────────────
const Field = ({ label, value, onChange, fullWidth = false, textarea = false, disabled = false }) => (
  <div className={fullWidth ? "col-span-2" : "col-span-1"}>
    <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
      {label}
    </label>
    {textarea ? (
      <textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={3}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px",
          border: `1px solid ${disabled ? "#f1f5f9" : "#d1d5db"}`,
          background: disabled ? "#f9fafb" : "#fff", color: "#111827",
          outline: "none", resize: "none", fontFamily: "inherit", transition: itemT,
          boxSizing: "border-box",
        }}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px",
          border: `1px solid ${disabled ? "#f1f5f9" : "#d1d5db"}`,
          background: disabled ? "#f9fafb" : "#fff", color: "#111827",
          outline: "none", fontFamily: "inherit", transition: itemT,
          boxSizing: "border-box",
        }}
      />
    )}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function UserProfile() {
  const [activeTab,    setActiveTab]    = useState(0);
  const [isEditing,    setIsEditing]    = useState(false);
  const [formData,     setFormData]     = useState(mockUser);
  const [savedData,    setSavedData]    = useState(mockUser);
  const [showPwForm,   setShowPwForm]   = useState(false);
  const [passwords,    setPasswords]    = useState({ current: "", newPw: "", confirm: "" });
  const [pwError,      setPwError]      = useState("");
  const [pwSuccess,    setPwSuccess]    = useState(false);
  const [saveSuccess,  setSaveSuccess]  = useState(false);
  const [twoFA,        setTwoFA]        = useState(false);
  const [loginNotif,   setLoginNotif]   = useState(true);

  const handleChange = (field) => (e) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    // TODO: PUT /api/users/profile { ...formData }
    setSavedData(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    setPwError("");
    if (!passwords.current) { setPwError("Current password is required."); return; }
    if (passwords.newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (passwords.newPw !== passwords.confirm) { setPwError("Passwords do not match."); return; }
    // TODO: POST /api/users/change-password { current, newPw }
    setPwSuccess(true);
    setShowPwForm(false);
    setPasswords({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setPwSuccess(false), 3000);
  };

  const handleTabChange = (i) => {
    setActiveTab(i);
    setIsEditing(false);
    setShowPwForm(false);
    setPwError("");
    setSaveSuccess(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h2>

      <div className="flex gap-6 items-start">

        {/* ── Left Card ─────────────────────────────────────────────────── */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8 flex flex-col items-center"
          style={{ minWidth: "260px", width: "260px", transition: cardT }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = ""; }}
        >
          {/* Avatar */}
          <div style={{
            width: "110px", height: "110px", borderRadius: "50%",
            background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "32px", fontWeight: 700, color: "#94a3b8", marginBottom: "16px", flexShrink: 0,
          }}>
            {getInitials(savedData.firstName, savedData.lastName)}
          </div>

          <div style={{ fontSize: "20px", fontWeight: 700, color: "#111827", textAlign: "center" }}>
            {savedData.firstName} {savedData.lastName}
          </div>
          <div style={{ fontSize: "13px", color: "#3b82f6", fontWeight: 600, marginTop: "4px", marginBottom: "24px" }}>
            {savedData.role}
          </div>

          <div className="w-full flex flex-col gap-5">
            {[
              { label: "Employee ID", value: savedData.employeeId },
              { label: "Department",  value: savedData.department },
              { label: "Join Date",   value: savedData.joinDate   },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500, marginBottom: "3px" }}>{item.label}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Card ────────────────────────────────────────────────── */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden"
          style={{ transition: cardT }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = ""; }}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100 px-6 overflow-x-auto">
            {TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => handleTabChange(i)}
                style={{
                  padding: "16px 0", marginRight: "28px", fontSize: "13px", fontWeight: 600,
                  background: "none", border: "none", cursor: "pointer", transition: itemT,
                  whiteSpace: "nowrap", flexShrink: 0,
                  color: activeTab === i ? "#2563eb" : "#9ca3af",
                  borderBottom: activeTab === i ? "2px solid #2563eb" : "2px solid transparent",
                }}
              >{tab}</button>
            ))}
          </div>

          <div className="p-6">

            {/* ── Tab 0: Personal Information ───────────────────────────── */}
            {activeTab === 0 && (
              <>
                {/* Success banner */}
                {saveSuccess && (
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "10px 16px", marginBottom: "20px", fontSize: "13px", fontWeight: 600, color: "#15803d", display: "flex", alignItems: "center", gap: "8px" }}>
                    ✓ Profile saved successfully!
                  </div>
                )}
                {pwSuccess && (
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "10px 16px", marginBottom: "20px", fontSize: "13px", fontWeight: 600, color: "#15803d", display: "flex", alignItems: "center", gap: "8px" }}>
                    ✓ Password updated successfully!
                  </div>
                )}

                <div className="grid grid-cols-2 gap-5 mb-6">
                  <Field label="First Name"        value={formData.firstName}        onChange={handleChange("firstName")}        disabled={!isEditing} />
                  <Field label="Last Name"         value={formData.lastName}         onChange={handleChange("lastName")}         disabled={!isEditing} />
                  <Field label="Email Address"     value={formData.email}            onChange={handleChange("email")}            disabled={!isEditing} fullWidth />
                  <Field label="Address"           value={formData.address}          onChange={handleChange("address")}          disabled={!isEditing} fullWidth textarea />
                  <Field label="Contact Number"    value={formData.contactNumber}    onChange={handleChange("contactNumber")}    disabled={!isEditing} />
                  <Field label="Emergency Contact" value={formData.emergencyContact} onChange={handleChange("emergencyContact")} disabled={!isEditing} />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex gap-3 flex-wrap">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          style={{ padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", transition: itemT }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >Save Changes</button>
                        <button
                          onClick={handleCancel}
                          style={{ padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#fff", color: "#6b7280", border: "1px solid #e5e7eb", cursor: "pointer", transition: itemT }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#fff";    e.currentTarget.style.transform = "translateY(0)"; }}
                        >Cancel</button>
                      </>
                    ) : (
                      <button
                        onClick={handleEdit}
                        style={{ padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#fff", color: "#2563eb", border: "1px solid #2563eb", cursor: "pointer", transition: itemT }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#fff";    e.currentTarget.style.transform = "translateY(0)"; }}
                      >Edit Profile</button>
                    )}
                  </div>
                  <button
                    onClick={() => { setShowPwForm(!showPwForm); setPwError(""); }}
                    style={{ padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#fff0f0", color: "#ef4444", border: "1px solid #fecaca", cursor: "pointer", transition: itemT }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff0f0"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >Change Password</button>
                </div>

                {/* Change Password Form */}
                {showPwForm && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Change Password</h4>
                    {pwError && (
                      <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: "8px", padding: "9px 14px", marginBottom: "14px", fontSize: "13px", color: "#dc2626", fontWeight: 500 }}>
                        {pwError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-4" style={{ maxWidth: "400px" }}>
                      {[
                        { label: "Current Password", key: "current" },
                        { label: "New Password",     key: "newPw"   },
                        { label: "Confirm Password", key: "confirm" },
                      ].map(f => (
                        <div key={f.key}>
                          <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>{f.label}</label>
                          <input
                            type="password"
                            value={passwords[f.key]}
                            onChange={e => setPasswords(prev => ({ ...prev, [f.key]: e.target.value }))}
                            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", border: "1px solid #d1d5db", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                          />
                        </div>
                      ))}
                      <div className="flex gap-3">
                        <button
                          onClick={handlePasswordChange}
                          style={{ padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", transition: itemT }}
                          onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                          onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                        >Update Password</button>
                        <button
                          onClick={() => { setShowPwForm(false); setPwError(""); setPasswords({ current: "", newPw: "", confirm: "" }); }}
                          style={{ padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#fff", color: "#6b7280", border: "1px solid #e5e7eb", cursor: "pointer", transition: itemT }}
                          onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                          onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                        >Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── Tab 1: Employment Details ─────────────────────────────── */}
            {activeTab === 1 && (
              <div className="grid grid-cols-2 gap-5">
                <Field label="Job Title"       value={formData.jobTitle}       onChange={() => {}} disabled />
                <Field label="Department"      value={formData.department}     onChange={() => {}} disabled />
                <Field label="Employment Type" value={formData.employmentType} onChange={() => {}} disabled />
                <Field label="Work Location"   value={formData.workLocation}   onChange={() => {}} disabled />
                <Field label="Join Date"       value={formData.joinDate}       onChange={() => {}} disabled />
                <Field label="Employee ID"     value={formData.employeeId}     onChange={() => {}} disabled />
              </div>
            )}

            {/* ── Tab 2: Documents ──────────────────────────────────────── */}
            {activeTab === 2 && (
              <div className="flex flex-col gap-4">
                {[
                  { name: "NIC / Passport",          status: "Not uploaded" },
                  { name: "Employment Contract",      status: "Not uploaded" },
                  { name: "Academic Certificates",    status: "Not uploaded" },
                ].map((doc, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderRadius: "12px", border: "1px solid #f1f5f9", background: "#fafafa" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6", flexShrink: 0 }}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{doc.name}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{doc.status}</div>
                      </div>
                    </div>
                    <button
                      style={{ padding: "7px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", cursor: "pointer", transition: itemT }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#dbeafe"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >Upload</button>
                  </div>
                ))}
              </div>
            )}

            {/* ── Tab 3: Security Settings ──────────────────────────────── */}
            {activeTab === 3 && (
              <div className="flex flex-col gap-4" style={{ maxWidth: "480px" }}>
                {[
                  { title: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", state: twoFA,      toggle: () => setTwoFA(v => !v) },
                  { title: "Login Notifications",       desc: "Get notified when someone logs into your account", state: loginNotif, toggle: () => setLoginNotif(v => !v) },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", borderRadius: "12px", border: "1px solid #f1f5f9", background: "#fafafa" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{item.title}</div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{item.desc}</div>
                    </div>
                    <div
                      onClick={item.toggle}
                      style={{ width: "44px", height: "24px", borderRadius: "12px", cursor: "pointer", transition: itemT, background: item.state ? "#2563eb" : "#e5e7eb", position: "relative", flexShrink: 0 }}
                    >
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#fff", position: "absolute", top: "3px", transition: itemT, left: item.state ? "23px" : "3px", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
