import { NoteModel } from "./schema";

export async function createNoteMongodb(task: string, description: string) {
  const result = await NoteModel.create({
    task,
    description,
  });
  console.log("Created Note", result);
  return result;
}

export async function getAllNoteMongodb() {
  const result = await NoteModel.find();
  console.log("Fetched Notes:", result);
  return result;
}

export async function getNoteByIdMongodb(NoteId: string) {
  const result = await NoteModel.findById(NoteId);
  return result;
}

export async function updateNoteMongodb(
  noteId: any,
  task: string,
  description: string
) {
  const result = await NoteModel.findByIdAndUpdate(noteId, {
    $set: {
      task,
      description,
    },
  });
  console.log("Updated Note:", result);
  return result;
}

export async function deleteNoteMongodb(noteId: string) {
  const result = await NoteModel.findByIdAndDelete(noteId);
  console.log("Deleted Note:", result);
  return result;
}
