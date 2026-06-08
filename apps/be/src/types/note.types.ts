export interface NoteParams {
  id: string;
}

export interface CreateNoteBody {
  title: string;
  content: string;
}

export interface UpdateNoteBody {
  title: string;
  content: string;
}
