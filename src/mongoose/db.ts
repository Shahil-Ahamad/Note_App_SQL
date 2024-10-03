import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/note_app";

export async function createDBConnection() {
  const db = mongoose.connect(uri);
  return db;
}
