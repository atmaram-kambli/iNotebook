const mongoose = require('mongoose');

// Schema for User Collection
const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'General'
    }, 
    date: {
        type: String,
        default: Date.now
    }
});

// model for User collection based on the schema
const Notes = mongoose.model('Notes', NotesSchema);

module.exports = Notes;