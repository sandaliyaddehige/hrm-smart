import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.webp';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      
      localStorage.clear();

      
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;

      
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role.toLowerCase());

   
const userRole = user.role.toLowerCase();

if (userRole === 'admin') {
    window.location.href = '/Admindashboard';
} else if (userRole === 'hr') {
    window.location.href = '/HRDashboard';
} else if (userRole === 'manager') {
    window.location.href = '/Managerdashboard'; 
} else {
    
    console.error("Unknown user role:", userRole);
    window.location.href = '/login'; 
}

    } catch (error) {
      const errorMsg = error.response?.data?.error || "Invalid email or password.";
      setError(errorMsg);
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner overflow-hidden border border-slate-100">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 mt-2 text-sm font-medium">Log in to manage your HR operations</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-2xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="email" name="email" required
                placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 transition-all text-sm"
                value={formData.email} onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="password" name="password" required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 transition-all text-sm"
                value={formData.password} onChange={handleChange}
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:bg-indigo-300 mt-2 flex items-center justify-center"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-10 text-sm text-slate-400 font-medium">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;