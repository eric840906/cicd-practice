import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { notesApi } from '../services/api';

// Mock the API
vi.mock('../services/api', () => ({
  notesApi: {
    getAllNotes: vi.fn(),
    createNote: vi.fn(),
    updateNote: vi.fn(),
    deleteNote: vi.fn(),
  },
}));

describe('App', () => {
  it('renders the app header', () => {
    vi.mocked(notesApi.getAllNotes).mockResolvedValue([]);
    render(<App />);
    expect(screen.getByText(/my notes/i)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    vi.mocked(notesApi.getAllNotes).mockResolvedValue([]);
    render(<App />);
    expect(screen.getByText(/loading notes/i)).toBeInTheDocument();
  });

  it('displays notes after loading', async () => {
    const mockNotes = [
      {
        id: 1,
        title: 'Test Note',
        content: 'Test Content',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      },
    ];
    
    vi.mocked(notesApi.getAllNotes).mockResolvedValue(mockNotes);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Note')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  it('shows empty state when no notes', async () => {
    vi.mocked(notesApi.getAllNotes).mockResolvedValue([]);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/no notes yet/i)).toBeInTheDocument();
    });
  });

  it('opens form when new note button is clicked', async () => {
    vi.mocked(notesApi.getAllNotes).mockResolvedValue([]);
    const user = userEvent.setup();
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    const newNoteButton = screen.getByText(/new note/i);
    await user.click(newNoteButton);
    
    expect(screen.getByText(/create new note/i)).toBeInTheDocument();
  });
});
