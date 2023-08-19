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

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlMTFlODcxODI0ZWZjNjJjNGJmNmRiIn0sImlhdCI6MTY5MjQ3NTAxNX0.RL3zqGyB6hcuahDsEsiv_d9KO8D3cfmq4nqq31LAhvA