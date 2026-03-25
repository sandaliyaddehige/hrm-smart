import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
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
  const [showPassword, setShowPassword] = useState(false); // Password එක පෙන්වීමට/සැඟවීමට

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // කලින් තිබූ දත්ත ඉවත් කිරීම
      localStorage.clear();

      // Backend API එකට දත්ත යැවීම
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;

      // පසුව භාවිතය සඳහා localStorage හි දත්ත තැන්පත් කිරීම
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role.toLowerCase());
      localStorage.setItem('userId', user.id); // Dynamic TopNav සඳහා මෙය අත්‍යවශ්‍යයි
      localStorage.setItem('username', user.username);

      const userRole = user.role.toLowerCase();

      // Role එක අනුව අදාළ පේජ් එකට යොමු කිරීම (Redirect)
      if (userRole === 'admin') {
        window.location.href = '/Admindashboard';
      } else if (userRole === 'hr') {
        window.location.href = '/HRDashboard';
      } else if (userRole === 'manager') {
        window.location.href = '/Managerdashboard'; 
      } else if (userRole === 'employee') {
        window.location.href = '/EmployeeDashboard';
      } else {
        setError("Access denied. Role not recognized.");
        setLoading(false);
      }

    } catch (error) {
      const errorMsg = error.response?.data?.error || "Invalid email or password.";
      setError(errorMsg);
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100 transform transition-all">
        
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
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-2xl text-center animate-pulse">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="email" 
                name="email" 
                required
                placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 transition-all text-sm"
                value={formData.email} 
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 transition-all text-sm"
                value={formData.password} 
                onChange={handleChange}
              />
              {/* Show/Hide Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:bg-indigo-300 mt-2 flex items-center justify-center overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-10 text-sm text-slate-400 font-medium">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;