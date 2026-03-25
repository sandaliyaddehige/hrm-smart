const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    
    await User.deleteMany({ role: { $ne: 'employee' } });

    const salt = await bcrypt.genSalt(10);

    // hash the passwords for each one
    const adminHash = await bcrypt.hash('admin@123', salt);
    const hrHash = await bcrypt.hash('hr@123', salt);
    const managerHash = await bcrypt.hash('manager@123', salt);

    const users = [
      { 
        username: 'Admin User', 
        email: 'admin@hrm.com', 
        password: adminHash, 
        role: 'admin' 
      },
      { 
        username: 'HR Manager', 
        email: 'hr@hrm.com', 
        password: hrHash, 
        role: 'hr' 
      },
      { 
        username: 'General Manager', 
        email: 'manager@hrm.com', 
        password: managerHash, 
        role: 'manager' 
      }
    ];

    await User.insertMany(users);
    console.log('--- Accounts Created Successfully ---');
    console.log('Admin: admin@hrm.com | Pass: admin@123');
    console.log('HR: hr@hrm.com | Pass: hr@123');
    console.log('Manager: manager@hrm.com | Pass: manager@123');
    
    process.exit();
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();