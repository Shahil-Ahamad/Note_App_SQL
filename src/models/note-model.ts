type TnoteStatus = "not_started" | "in_progress" | "done";

export type Tnote = {
  id: number;
  title:string;
  name: string;
  status: TnoteStatus;
};

const notes: Tnote[] = [
  {
    id: 1,
    title:'Note_App',
    name: "Reading about mvc pattern",
    status: "in_progress",
  },
];

export class noteModel {
  constructor() {
    console.log("note constructor is called");
  }

  getnote(noteId: number) {
    const note = notes.find((note) => note.id === noteId);
    return note;
  }

  createnote(title:string,name: string, status: TnoteStatus) {
    const newnote: Tnote = {
      id: notes.length + 1,
      title,
      name,
      status,
    };
    notes.push(newnote);

    return newnote;
  }
}
