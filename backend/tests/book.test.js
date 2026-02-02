const request = require('supertest');
const { prisma } = require('../src/config/database');

// Create a test app without the parsers issue
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('../src/routes/api');

const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', apiRoutes);
  return app;
};

const app = createTestApp();

describe('Book API', () => {
  let testBookId;
  
  beforeAll(async () => {
    // Clear test data
    await prisma.book.deleteMany();
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });
  
  // Test 1: GET /api/books (empty)
  test('GET /api/books - should return empty array', async () => {
    const response = await request(app)
      .get('/api/books')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
  
  // Test 2: POST /api/books (create with FormData)
  test('POST /api/books - should create a book', async () => {
    const response = await request(app)
      .post('/api/books')
      .field('title', 'Test Book')
      .field('author', 'Test Author')
      .field('description', 'Test Description')
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Test Book');
    expect(response.body.data.author).toBe('Test Author');
    
    testBookId = response.body.data.id;
  });
  
  // Test 3: GET /api/books/:id
  test('GET /api/books/:id - should return book', async () => {
    const response = await request(app)
      .get(`/api/books/${testBookId}`)
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(testBookId);
  });
  
  // Test 4: PUT /api/books/:id
  test('PUT /api/books/:id - should update book', async () => {
    const response = await request(app)
      .put(`/api/books/${testBookId}`)
      .field('title', 'Updated Title')
      .field('author', 'Updated Author')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Updated Title');
    
    // Verify update persists
    const verifyResponse = await request(app)
      .get(`/api/books/${testBookId}`)
      .expect(200);
    
    expect(verifyResponse.body.data.title).toBe('Updated Title');
    expect(verifyResponse.body.data.author).toBe('Updated Author');
  });
  
  // Test 5: GET /api/books/search
  test('GET /api/books/search - should search books', async () => {
    const response = await request(app)
      .get('/api/books/search?q=Updated')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data[0].title).toBe('Updated Title');
  });
  
  // Test 6: DELETE /api/books/:id
  test('DELETE /api/books/:id - should delete book', async () => {
    // Verify it exists
    await request(app).get(`/api/books/${testBookId}`).expect(200);
    
    // Delete it
    await request(app)
      .delete(`/api/books/${testBookId}`)
      .expect(200);
    
    // Verify it's gone
    await request(app)
      .get(`/api/books/${testBookId}`)
      .expect(404);
  });
  
  // Test 7: POST validation - missing fields
  test('POST /api/books - should require title and author', async () => {
    const response = await request(app)
      .post('/api/books')
      .field('description', 'Missing fields')
      .expect(400);
    
    expect(response.body.success).toBe(false);
  });
  
  // Test 8: GET non-existent book
  test('GET /api/books/:id - should return 404', async () => {
    await request(app)
      .get('/api/books/999999')
      .expect(404);
  });
  
  // Test 9: Search requires query
  test('GET /api/books/search - should require query', async () => {
    await request(app)
      .get('/api/books/search')
      .expect(400);
  });

  // Test 10: PUT non-existent book
  test('PUT /api/books/:id - should return 404 for non-existent', async () => {
    await request(app)
      .put('/api/books/999999')
      .field('title', 'Test')
      .expect(404);
  });

  // Test 11: DELETE non-existent book  
  test('DELETE /api/books/:id - should return 404 for non-existent', async () => {
    await request(app)
      .delete('/api/books/999999')
      .expect(404);
  });
});