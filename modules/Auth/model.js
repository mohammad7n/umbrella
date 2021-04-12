const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, maxlength: 60, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, maxlength: 100 },
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
