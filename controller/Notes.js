const Notes = require("../model/Notes.js");
const Note = Notes.notes;
const { validationResult } = require("express-validator");

exports.fetchAllNotes = async (req,res) => {
    const notes = await Note.find({user : req.user.id});
    res.json(notes);
}

exports.insertNote = async (req,res) => {
    try {
    const errors = validationResult(req);
    const arr = errors.array();
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: arr });
    }

    const {title,description,tag} = req.body;
    const note = new Note({
        title,description,tag,user:req.user.id
    });
    const doc = await note.save();
    res.json(doc);
    } catch (err) {
        console.error(err.errorMsg);
        res.status(500).json({'Error' : "Internal Server Error"});
    }
}