import Database from 'better-sqlite3';
import path from 'path';

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type NoteInput = Omit<Note, 'id' | 'created_at' | 'updated_at'>;

class NotesDatabase {
  private db: Database.Database;

  constructor(dbPath: string = path.join(__dirname, '../../notes.db')) {
    this.db = new Database(dbPath);
    this.init();
  }

  private init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  getAllNotes(): Note[] {
    const stmt = this.db.prepare('SELECT * FROM notes ORDER BY updated_at DESC');
    return stmt.all() as Note[];
  }

  getNoteById(id: number): Note | undefined {
    const stmt = this.db.prepare('SELECT * FROM notes WHERE id = ?');
    return stmt.get(id) as Note | undefined;
  }

  createNote(note: NoteInput): Note {
    const stmt = this.db.prepare(`
      INSERT INTO notes (title, content) 
      VALUES (?, ?)
    `);
    const result = stmt.run(note.title, note.content);
    return this.getNoteById(result.lastInsertRowid as number)!;
  }

  updateNote(id: number, note: Partial<NoteInput>): Note | undefined {
    const updates: string[] = [];
    const values: any[] = [];

    if (note.title !== undefined) {
      updates.push('title = ?');
      values.push(note.title);
    }
    if (note.content !== undefined) {
      updates.push('content = ?');
      values.push(note.content);
    }

    if (updates.length === 0) {
      return this.getNoteById(id);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = this.db.prepare(`
      UPDATE notes 
      SET ${updates.join(', ')} 
      WHERE id = ?
    `);
    stmt.run(...values);
    return this.getNoteById(id);
  }

  deleteNote(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM notes WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  close() {
    this.db.close();
  }
}

export default NotesDatabase;
