export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type NoteInput = Omit<Note, 'id' | 'created_at' | 'updated_at'>;
