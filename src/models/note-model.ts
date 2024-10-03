export type Tnote = {
  id: number;
  title: string;
  description: string;
};

const notes: Tnote[] = [
  {
    id: 1,
    title: "Note_App",
    description: "Reading about mvc pattern",
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

  createnote(title: string, description: string) {
    const newnote: Tnote = {
      id: notes.length + 1,
      title,
      description,
    };
    notes.push(newnote);

    return newnote;
  }
}
