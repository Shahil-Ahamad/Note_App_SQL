import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String,required:true },
  created_at: { type: Date, default: Date.now },
});

export const NoteModel = mongoose.model("Note", NoteSchema);

// console.log("schema cleared");
