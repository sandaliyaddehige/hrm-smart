const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/'); 
  },
  filename: (req, file, cb) => {
    // req.user එකෙන් ID එක ගන්න කලින් auth middleware එක හරහා යන්න ඕන නිසා 
    // මෙතන temp කියන එක වෙනුවට random නමක් ලැබෙන එක වඩාත් ආරක්ෂිතයි
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `profile-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, 
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Images Only (jpg, jpeg, png, webp)!'));
    }
  }
});

// --- 1. REGISTER (Updated) ---
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'employee'
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "Registration Successful!" }); // success: true එකතු කළා
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. LOGIN (Updated for Dynamic TopNav) ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' } 
    );

    // Frontend එකට අවශ්‍ය සියලුම විස්තර මෙතනින් යවනවා
    res.json({
      token,
      user: { 
        id: user._id, 
        username: user.username, 
        role: user.role.toLowerCase(),
        profileImage: user.profileImage || "" // Profile Image එකත් යවමු
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. GET PROFILE (Dynamic TopNav එකට දත්ත ලබා ගැනීම) ---
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// --- 4. UPDATE PROFILE IMAGE ---
router.post('/upload-avatar/:id', upload.single('profilePic'), async (req, res) => {
    try {
        const imageUrl = `/uploads/profiles/${req.file.filename}`;
        await User.findByIdAndUpdate(req.params.id, { profileImage: imageUrl });
        res.json({ success: true, imageUrl });
    } catch (err) {
        res.status(500).json({ error: "Upload failed" });
    }
});

module.exports = router;