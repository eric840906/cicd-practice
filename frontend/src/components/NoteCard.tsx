import { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-meta">
        <small>Updated: {new Date(note.updated_at).toLocaleDateString()}</small>
      </div>
      <div className="note-actions">
        <button onClick={() => onEdit(note)} className="btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(note.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}
