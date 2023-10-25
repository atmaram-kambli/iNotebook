const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1: Get all the notes using GET 'api/auth/fetchallnotes'. login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})

// Route 1: Add the note using post 'api/auth/addnote'. login required.
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

module.exports = router;