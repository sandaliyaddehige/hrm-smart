import React, { useState } from 'react';
import { FaPlus, FaSearch, FaPhone, FaEnvelope, FaTimes, FaEdit, FaTrash, FaCamera, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/Employees.css';

const Employees = () => {
  // 1. Initial Data (EMP list)
  const [employees, setEmployees] = useState([
    { id: 'HRM-2026-001', name: 'Adam Gates', role: 'Senior Developer', email: 'adam@dev.com', phone: '0712345678', dept: 'Engineering', joinDate: '2024-01-10', status: 'Active', image: null },
    { id: 'HRM-2026-002', name: 'Sarah Jenkins', role: 'UI/UX Designer', email: 'sarah@design.com', phone: '0771234567', dept: 'Product', joinDate: '2024-02-15', status: 'Active', image: null },
    { id: 'HRM-2026-003', name: 'Michael Chen', role: 'Backend Lead', email: 'chen@dev.com', phone: '0756543210', dept: 'Engineering', joinDate: '2023-11-20', status: 'On-Leave', image: null },
    
  ]);

  // 2. States (Modal, Search, Edit, Pagination)
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmpId, setCurrentEmpId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6; 

  const [newEmp, setNewEmp] = useState({
    name: '', role: '', email: '', phone: '', dept: '', joinDate: '', status: 'Active', image: null
  });

  // 3. Image Upload logic
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewEmp({ ...newEmp, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleInputChange = (e) => {
    setNewEmp({ ...newEmp, [e.target.name]: e.target.value });
  };

  // 4. CRUD Functions (Create, Update, Delete)
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
      const id = `HRM-2026-0${employees.length + 100}`;
      setEmployees([...employees, { ...newEmp, id }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setNewEmp({ name: '', role: '', email: '', phone: '', dept: '', joinDate: '', status: 'Active', image: null });
  };

  // 5. Search & Pagination Logic
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmp = currentPage * employeesPerPage;
  const indexOfFirstEmp = indexOfLastEmp - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmp, indexOfLastEmp);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className="employees-container">
      {/* Header */}
      <div className="employees-header">
        <div className="header-text">
          <h2>Employee Management</h2>
          <p>Total Employees: {employees.length}</p>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="employee-search">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search by name or role..." 
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="employee-grid">
        {currentEmployees.map((emp) => (
          <div className="employee-card" key={emp.id}>
            <div className="card-top">
              <img src={emp.image || `https://ui-avatars.com/api/?name=${emp.name}&background=random`} alt={emp.name} className="emp-img" />
              <div className="emp-basic">
                <h3>{emp.name}</h3>
                <p>{emp.role}</p>
              </div>
              <span className={`status-tag ${emp.status.toLowerCase()}`}>{emp.status}</span>
              <div className="card-actions">
                <FaEdit className="edit-icon" onClick={() => openEditModal(emp)} />
                <FaTrash className="delete-icon" onClick={() => deleteEmployee(emp.id)} />
              </div>
            </div>
            
            <div className="card-contact">
              <p><FaEnvelope /> {emp.email}</p>
              <p><FaPhone /> {emp.phone}</p>
            </div>

            <div className="card-details">
              <div className="detail-row">
                <div className="detail-item"><span>ID</span><p>{emp.id}</p></div>
                <div className="detail-item"><span>Dept</span><p>{emp.dept}</p></div>
                <div className="detail-item"><span>Joined</span><p>{emp.joinDate}</p></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="page-btn"><FaChevronLeft /></button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="page-btn"><FaChevronRight /></button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{isEditing ? "Edit Employee" : "Add New Employee"}</h3>
              <FaTimes className="close-icon" onClick={closeModal} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="image-upload-section">
                 <label htmlFor="file-input">
                    <div className="preview-container">
                      <img src={newEmp.image || "https://via.placeholder.com/100"} className="preview-img" alt="preview" />
                      <div className="camera-overlay"><FaCamera /></div>
                    </div>
                 </label>
                 <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} />
              </div>

              <div className="form-grid">
                <input type="text" name="name" placeholder="Full Name" value={newEmp.name} required onChange={handleInputChange} />
                <input type="text" name="role" placeholder="Job Role" value={newEmp.role} required onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={newEmp.email} required onChange={handleInputChange} />
                <input type="text" name="phone" placeholder="Phone" value={newEmp.phone} required onChange={handleInputChange} />
                <input type="text" name="dept" placeholder="Department" value={newEmp.dept} required onChange={handleInputChange} />
                <input type="date" name="joinDate" value={newEmp.joinDate} required onChange={handleInputChange} />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-btn">{isEditing ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;