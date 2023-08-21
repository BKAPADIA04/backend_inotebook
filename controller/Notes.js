const Notes = require("../model/Notes.js");
const Note = Notes.notes;
const { validationResult } = require("express-validator");

exports.fetchAllNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};

exports.insertNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    const arr = errors.array();
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: arr });
    }

    const { title, description, tag } = req.body;
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const doc = await note.save();
    res.json(doc);
  } catch (err) {
    console.error(err.errorMsg);
    res.status(500).json({ 'Error': 'Internal Server Error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    console.log(note);
    res.status(202).json( note );
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'Error': 'Internal Server Error'});
  }
};

exports.deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res
      .status(202)
      .json({ 'Message': 'Note has been deleted successfully', 'Note': {note} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'Error': 'Internal Server Error' });
  }
};
