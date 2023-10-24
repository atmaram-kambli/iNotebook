const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for User Collection
const UserSchema = new Schema({
    name: {
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
    date: {
        type: String,
        default: Date.now
    }
});

// model for User collection based on the schema
const User = mongoose.model('user', UserSchema);
module.exports = User;