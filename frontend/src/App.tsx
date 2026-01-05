import { useState, useEffect } from 'react';
import { Note, NoteInput } from './types/note';
import { notesApi } from './services/api';
import { NoteCard } from './components/NoteCard';
import { NoteForm } from './components/NoteForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await notesApi.getAllNotes();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (note: NoteInput) => {
    try {
      await notesApi.createNote(note);
      await loadNotes();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create note');
      console.error(err);
    }
  };

  const handleUpdateNote = async (note: NoteInput) => {
    if (!editingNote) return;
    try {
      await notesApi.updateNote(editingNote.id, note);
      await loadNotes();
      setEditingNote(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update note');
      console.error(err);
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await notesApi.deleteNote(id);
        await loadNotes();
      } catch (err) {
        setError('Failed to delete note');
        console.error(err);
      }
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 My Notes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-new-note"
          disabled={showForm}
        >
          + New Note
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-container">
          <NoteForm
            note={editingNote || undefined}
            onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
            onCancel={handleCancel}
          />
        </div>
      )}

      <main className="notes-container">
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
