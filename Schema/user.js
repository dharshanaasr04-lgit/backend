const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);