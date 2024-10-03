import { NoteModel } from "./schema";

export async function createNoteMongodb(title: String, description: String) {
  const result = await NoteModel.create({
    title,
    description,
  });
//   console.log("query clear");
  console.log("Created Note", result);
  return result;
}

export async function getAllNoteMongodb() {
  const result = await NoteModel.find();
  console.log("Fetched Notes:", result);
  return result;
}

export async function getNoteByIdMongodb(NoteId: String) {
  const result = await NoteModel.findById(NoteId);
  return result;
}

export async function updateNoteMongodb(
  noteId: any,
  title: String,
  description: String
) {
  const result = await NoteModel.findByIdAndUpdate(noteId, {
    $set: {
      title,
      description,
    },
  });
  console.log("Updated Note:", result);
  return result;
}

export async function deleteNoteMongodb(noteId: String) {
  const result = await NoteModel.findByIdAndDelete(noteId);
  console.log("Deleted Note:", result);
  return result;
}
