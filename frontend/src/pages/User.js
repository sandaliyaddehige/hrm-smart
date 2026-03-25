const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    default: '' 
  },
  role: { 
    type: String, 
    enum: ['admin', 'hr', 'manager', 'employee'], 
    default: 'employee' 
  },
  profilePic: { 
    type: String, 
    default: '' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);