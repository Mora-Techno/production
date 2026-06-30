/** Mirror Prisma model `Note` */
export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Note = Pick<INote, 'id' | 'title' | 'content'> & {
  createdAt: string;
  updatedAt: string;
};

export type PickCreateNote = Pick<INote, 'title' | 'content'>;
export type PickUpdateNote = Pick<INote, 'title' | 'content'>;
export type NoteParams = Pick<INote, 'id'>;
