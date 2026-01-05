import request from 'supertest';
import app from '../app';

describe('Notes API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /api/notes', () => {
    it('should create a new note', async () => {
      const newNote = {
        title: 'Test Note',
        content: 'This is a test note',
      };

      const response = await request(app)
        .post('/api/notes')
        .send(newNote);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newNote.title);
      expect(response.body.content).toBe(newNote.content);
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/notes')
        .send({ content: 'No title' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if content is missing', async () => {
      const response = await request(app)
        .post('/api/notes')
        .send({ title: 'No content' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/notes', () => {
    it('should return all notes', async () => {
      const response = await request(app).get('/api/notes');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should return a note by id', async () => {
      // First create a note
      const createResponse = await request(app)
        .post('/api/notes')
        .send({ title: 'Test', content: 'Test content' });

      const noteId = createResponse.body.id;

      // Then fetch it
      const response = await request(app).get(`/api/notes/${noteId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(noteId);
    });

    it('should return 404 for non-existent note', async () => {
      const response = await request(app).get('/api/notes/99999');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update a note', async () => {
      // Create a note
      const createResponse = await request(app)
        .post('/api/notes')
        .send({ title: 'Original', content: 'Original content' });

      const noteId = createResponse.body.id;

      // Update it
      const updateResponse = await request(app)
        .put(`/api/notes/${noteId}`)
        .send({ title: 'Updated', content: 'Updated content' });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.title).toBe('Updated');
      expect(updateResponse.body.content).toBe('Updated content');
    });

    it('should return 404 for non-existent note', async () => {
      const response = await request(app)
        .put('/api/notes/99999')
        .send({ title: 'Updated' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should delete a note', async () => {
      // Create a note
      const createResponse = await request(app)
        .post('/api/notes')
        .send({ title: 'To Delete', content: 'Will be deleted' });

      const noteId = createResponse.body.id;

      // Delete it
      const deleteResponse = await request(app).delete(`/api/notes/${noteId}`);
      expect(deleteResponse.status).toBe(204);

      // Verify it's gone
      const getResponse = await request(app).get(`/api/notes/${noteId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent note', async () => {
      const response = await request(app).delete('/api/notes/99999');
      expect(response.status).toBe(404);
    });
  });
});
