import { NextFunction, Request, Response } from "express";

import {
  createNote,
  createNoteWithPool,
  deleteNote,
  deleteNoteWithPool,
  getAllNotes,
  getAllNotesWithPool,
  getNoteById,
  getNoteByIdWithPool,
  updateNote,
  updateNoteWithPool,
} from "../database";
import {
  createNoteMongodb,
  deleteNoteMongodb,
  getAllNoteMongodb,
  getNoteByIdMongodb,
  updateNoteMongodb,
} from "../mongoose/query";

export async function createnoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const { title, description } = req.body;

    //MySQL
    // const result = await createNoteWithPool(title, description);

    // console.log("controller");
    //MongoDB
    const result = await createNoteMongodb(title, description);

    // console.log("Controller");
    console.log("result", result);

    res.status(201).json({
      message: "note created successfully",
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
}

export async function getnoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const noteId = req.params.noteId;

  if (!noteId) {
    next("Please provide valid noteId");
    return;
  }

  //MySQL
  // const result = (await getNoteByIdWithPool(parseInt(noteId))) as {
  //   id: number;
  //   title: string;
  //   description: string;
  //   created_at: Date;
  // }[];

  //MongoDB
  const result = await getNoteByIdMongodb(noteId);

  console.log("result", result);

  if (!result) {
    res.status(404).json({
      message: "note not found",
      data: null,
    });
  } else {
    res.json({
      message: "get note by id",
      data: result,
    });
  }
}

export async function getAllnoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //MySQL
    //const result = await getAllNoteWithPool();

    //MongoDB
    const result = await getAllNoteMongodb();

    res.json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export async function updatenoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const noteId = req.params.noteId;
    const { title, description } = req.body;

    //MySQL
    // const result = (await updateNoteWithPool(
    //   parseInt(noteId),
    //   title,
    //   description
    // )) as {
    //   title: string;
    //   description: string;
    // }[];

    const result = await updateNoteMongodb(noteId, title, description);

    res.status(201).json({
      data: result,
      message: "note updated successfully!",
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
  //
}

export async function deletenoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const noteId = req.params.noteId;

    //MySQL
    // const result = await deleteNoteWithPool(parseInt(noteId));

    //MongoDB
    const result = await deleteNoteMongodb(noteId);

    res.status(201).json({
      message: "note Deleted Successfully!",
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
}
