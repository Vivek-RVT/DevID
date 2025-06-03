const mongoose = require('mongoose');

// Use Schema with a capital 'S'
const DevIDSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    salary: { type: Number, required: true },
    language: { type: String, required: true },
    isManager: { type: Boolean, required: true },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("devidinfos", DevIDSchema);
