import { Note, NoteInput } from '../types/note';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const notesApi = {
  async getAllNotes(): Promise<Note[]> {
    const response = await fetch(`${API_URL}/notes`);
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  },

  async getNoteById(id: number): Promise<Note> {
    const response = await fetch(`${API_URL}/notes/${id}`);
    if (!response.ok) throw new Error('Failed to fetch note');
    return response.json();
  },

  async createNote(note: NoteInput): Promise<Note> {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
  },

  async updateNote(id: number, note: Partial<NoteInput>): Promise<Note> {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  },

  async deleteNote(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete note');
  },
};
