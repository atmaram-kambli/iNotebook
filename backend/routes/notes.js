const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1: Get all the notes using GET 'api/notes/fetchallnotes'. login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})

// Route 2: Add the note using post 'api/notes/addnote'. login required.
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').notEmpty(),
    body('description', 'Enter a valid description').notEmpty()
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        // check for errors, return bad request and error msg if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // create new note for given data from user
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        // saved note on database
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})

// Route 3: Update the note using PUT '/api/notes/updatenote'. Login required.
router.put('/updatenote/:id', fetchuser , async (req, res) => {
    try {
    // take the updated value from req body using destructuring
    const {title, description, tag} = req.body;
    // create new note object
    const newNote = {};
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};
    
    // check wheter only user with user id can delete the note
    // get the note to be changed
    let note = await Note.findById(req.params.id);
    // if note with this id does not exist
    if(!note) {return res.status(404).send("Not Found!")}
    // if user aims to update note of some other user, denied the access
    if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed!");
    }
    // update the note
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error!");
}
})

// Route 4: Delete the note using DELETE '/api/notes/deletenote'. Login required.
router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    try {

    // Get the note to be deleted
    let note = await Note.findById(req.params.id);
    // check whether not with this id exists or not
    if(!note) return res.status(404).send("Not Found!");
    // check that user is deleting note of its own only, otherwise denied the access
    if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed!");
    }
    // delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "success": "Note has been deleted!", note: note });
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error!");
}
})


module.exports = router;