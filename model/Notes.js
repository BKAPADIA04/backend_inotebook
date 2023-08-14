const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

exports.notes = mongoose.model("notes", notesSchema);
