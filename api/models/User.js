const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Store hashed passwords and don't include in any queries!
    name: {type: String, required: true},
    createdAt: { type: Date, required: true},

});
module.exports = mongoose.model('User', userSchema);