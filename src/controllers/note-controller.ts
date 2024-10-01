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

export async function createnoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const { title, name, status } = req.body;

    const result = await createNoteWithPool(title, name, status);

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

  const result = (await getNoteByIdWithPool(parseInt(noteId))) as {
    id: number;
    title: string;
    name: string;
    status: string;
    created_at: Date;
  }[];

  console.log("result", result);

  if (!result.length) {
    res.status(404).json({
      message: "note not found",
      data: null,
    });
  } else {
    res.json({
      message: "get note by id",
      data: result[0],
    });
  }
}

export async function getAllnoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getAllNotesWithPool();

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
    const { title, name, status } = req.body;

    const result = (await updateNoteWithPool(
      parseInt(noteId),
      title,
      name,
      status
    )) as {
      title: string;
      name: string;
      status: string;
    }[];

    res.status(201).json({
      data: result[0],
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

    const result = await deleteNoteWithPool(parseInt(noteId));

    res.status(201).json({
      message: "note Deleted Successfully!",
    });
  } catch (error: any) {
    console.error(error);
    next(error.message);
  }
}
