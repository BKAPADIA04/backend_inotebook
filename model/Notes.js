const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

exports.notes = mongoose.model("notes", notesSchema);
