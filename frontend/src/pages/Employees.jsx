import React, { useState } from 'react';
import { 
  FaPlus, FaSearch, FaPhone, FaEnvelope, FaTimes, 
  FaEdit, FaTrash, FaCamera, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

const Employees = () => {
  
  const [employees, setEmployees] = useState([
    { 
      id: 'HRM-2026-001', 
      name: 'Adam Gates', 
      role: 'Senior Developer', 
      email: 'adam@dev.com', 
      phone: '0712345678', 
      dept: 'Engineering', 
      joinDate: '2024-01-10', 
      status: 'Active', 
      image: 'https://imgs.search.brave.com/7EuliPkzrBDQAfBQ_ADPlr_D6ayhto_kZ4St5fpkF6k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NDc1LzkwOC9zbWFs/bC9oYW5kc29tZS15/b3VuZy1jYWxsLWNl/bnRlci1lbXBsb3ll/ZS1pcy1wcm92aWRp/bmctaW5mb3JtYXRp/b24tb3Zlci10aGUt/cGhvbmUtZnJlZS1w/aG90by5qcGc' 
    },
    { 
      id: 'HRM-2026-002', 
      name: 'Sarah Jenkins', 
      role: 'UI/UX Designer', 
      email: 'sarah@design.com', 
      phone: '0771234567', 
      dept: 'Product', 
      joinDate: '2024-02-15', 
      status: 'Active', 
      image: 'http://googleusercontent.com/image_collection/image_retrieval/10762191584899955359_1' 
    },
    { 
      id: 'HRM-2026-003', 
      name: 'Michael Chen', 
      role: 'Backend Lead', 
      email: 'chen@dev.com', 
      phone: '0756543210', 
      dept: 'Engineering', 
      joinDate: '2023-11-20', 
      status: 'On-Leave', 
      image: 'http://googleusercontent.com/image_collection/image_retrieval/10762191584899955359_2' 
    },
  ]);

  // States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmpId, setCurrentEmpId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6;

  const [newEmp, setNewEmp] = useState({
    name: '', role: '', email: '', phone: '', dept: '', joinDate: '', status: 'Active', image: null
  });

  // Handlers
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewEmp({ ...newEmp, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleInputChange = (e) => {
    setNewEmp({ ...newEmp, [e.target.name]: e.target.value });
  };

  const deleteEmployee = (id) => {
    if(window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const openEditModal = (emp) => {
    setNewEmp(emp);
    setCurrentEmpId(emp.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEmployees(employees.map(emp => emp.id === currentEmpId ? newEmp : emp));
    } else {
      const id = `HRM-2026-0${employees.length + 101}`;
      setEmployees([...employees, { ...newEmp, id }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setNewEmp({ name: '', role: '', email: '', phone: '', dept: '', joinDate: '', status: 'Active', image: null });
  };

  // Search & Pagination Logic
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmp = currentPage * employeesPerPage;
  const indexOfFirstEmp = indexOfLastEmp - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmp, indexOfLastEmp);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className="p-2 md:p-6 min-h-screen bg-slate-50/50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Employee Management</h2>
          <p className="text-slate-500 text-sm font-medium">Manage your workforce of {employees.length} members</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          <FaPlus /> Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 group">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4f46e5] transition-colors" />
        <input 
          type="text" 
          placeholder="Search by name or role..." 
          className="w-full bg-white border border-slate-200 rounded-[20px] py-4 pl-14 pr-6 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none shadow-sm transition-all font-medium text-slate-700"
          onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
        />
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEmployees.map((emp) => (
          <div key={emp.id} className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            
            <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
              emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            }`}>
              {emp.status}
            </div>

            <div className="flex items-center gap-5 mb-6">
              <img 
                src={emp.image || `https://ui-avatars.com/api/?name=${emp.name}&background=4f46e5&color=fff`} 
                alt={emp.name} 
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
              />
              <div>
                <h3 className="font-bold text-slate-800 text-lg leading-tight">{emp.name}</h3>
                <p className="text-indigo-600 font-bold text-xs uppercase tracking-wide">{emp.role}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <FaEnvelope className="text-slate-400 w-4" /> 
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <FaPhone className="text-slate-400 w-4" /> {emp.phone}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-50 text-center">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">ID</p>
                <p className="text-xs font-bold text-slate-700">{emp.id.split('-').pop()}</p>
              </div>
              <div className="border-x border-slate-100 px-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Dept</p>
                <p className="text-xs font-bold text-slate-700 truncate">{emp.dept}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Joined</p>
                <p className="text-xs font-bold text-slate-700">{emp.joinDate.split('-')[0]}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEditModal(emp)} className="flex-1 bg-slate-50 hover:bg-indigo-50 text-indigo-600 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 font-bold text-xs"><FaEdit /> Edit</button>
              <button onClick={() => deleteEmployee(emp.id)} className="flex-1 bg-slate-50 hover:bg-rose-50 text-rose-600 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 font-bold text-xs"><FaTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12 mb-8">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-[#4f46e5] disabled:opacity-50 transition-all"><FaChevronLeft /></button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-[#4f46e5] text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500'}`}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-[#4f46e5] disabled:opacity-50 transition-all"><FaChevronRight /></button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/30 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">{isEditing ? "Update Profile" : "New Employee"}</h3>
                <button onClick={closeModal} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"><FaTimes /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center mb-8">
                  <label htmlFor="file-input" className="relative cursor-pointer group">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-indigo-50 group-hover:ring-indigo-100 transition-all shadow-md">
                      <img src={newEmp.image || "https://ui-avatars.com/api/?background=f1f5f9&color=cbd5e1&name=?"} className="w-full h-full object-cover" alt="preview" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><FaCamera /></div>
                    </div>
                  </label>
                  <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label><input name="name" type="text" value={newEmp.name} required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-indigo-500/20 font-medium" /></div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Job Role</label><input name="role" type="text" value={newEmp.role} required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-indigo-500/20 font-medium" /></div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email</label><input name="email" type="email" value={newEmp.email} required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-indigo-500/20 font-medium" /></div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone</label><input name="phone" type="text" value={newEmp.phone} required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-indigo-500/20 font-medium" /></div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Department</label><input name="dept" type="text" value={newEmp.dept} required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-indigo-500/20 font-medium" /></div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Join Date</label><input name="joinDate" type="date" value={newEmp.joinDate} required onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-indigo-500/20 font-medium uppercase text-xs" /></div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={closeModal} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-[#4f46e5] text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-[#4338ca] transition-all">{isEditing ? "Update Details" : "Save Member"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;