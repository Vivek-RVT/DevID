const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer'); // for file uploads
const DevIDinfo = require('../models/DevID'); // fixed import name
const app = express();
const PORT = 4000;

// Middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/DevID')
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/CreateID', upload.single('image'), async (req, res) => {
  try {
    const {
      email,
      'first-name': FirstName,
      'last-name': LastName,
      address,
      salary,
      language,
      'is-manager': isManager
    } = req.body;

    const newEntry = new DevIDinfo({
      FirstName,
      LastName,
      email,
      address,
      salary,
      language,
      isManager: isManager === 'Yes',
      photo: req.file ? `/uploads/${req.file.filename}` : null
    });

    await newEntry.save();
    console.log("✅ Data saved successfully!");
    res.redirect('/DevIDs');
  } catch (err) {
    console.error("❌ Error saving data:", err);
    res.status(500).send("Error saving data.");
  }
});

app.get('/api/devs',async (req,res)=>{
  try{

    const devs = await DevIDinfo.find().sort({ createdAt: -1 }); // ✅ use correct model
    res.json(devs);
  }catch(err){
    res.status(500).json({ error: 'Failed to fetch devs' });
  }

  
})
app.get('/devIDs',(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'IDs.html'));
})
app.get('/about',(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
})
app.get('/contact',(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'contact.html'));
})
app.get('/privacy',(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'privacy.html'));
})
app.get('/terms',(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'terms.html'));
})