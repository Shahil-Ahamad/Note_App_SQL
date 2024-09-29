import express, { Request, Response, NextFunction } from "express";
import {
  createnoteController,
  deletenoteController,
  getAllnoteController,
  getnoteController,
  updatenoteController,
} from "./controllers/note-controller";

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/get-note/:noteId", getnoteController); // done
app.post("/create-note", createnoteController); // done
app.put("/update-note/:noteId", updatenoteController); //done
app.delete("/delete-note/:noteId", deletenoteController); //done
app.get("/get-all-notes", getAllnoteController); // done

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    message: "something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
