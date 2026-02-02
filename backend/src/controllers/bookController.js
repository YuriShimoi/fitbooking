const bookModel = require('../models/bookModel');
const fs = require('fs');

function bufferToDataUrl(buffer) {
  if (!buffer) return null;
  // Convert Buffer to base64 string
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:image/jpeg;base64,${base64}`;
};

const bookController = {
  createBook: async (req, res) => {
    try {
      const { title, author, description, dt_publication } = req.body;
      
      if (!title || !author) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title and author are required' 
        });
      }

      const bookData = {
        title,
        author,
        description,
        dt_publication
      };
      
      if (req.file) {
        const fs = require('fs');
        const coverBuffer = fs.readFileSync(req.file.path);
        bookData.cover = coverBuffer.toString('base64');
        fs.unlinkSync(req.file.path);
      }
      
      const newBook = await bookModel.create(bookData);
      res.status(201).json({ success: true, data: newBook });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({
          success: false,
          error: 'Book title must be unique'
        });
      }
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await bookModel.getAll();

      const mappedBooks = books.map(book => ({
        ...book,
        cover: bufferToDataUrl(book.cover)
      }));
      res.json({ success: true, data: mappedBooks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBookById: async (req, res) => {
    try {
      const book = await bookModel.getById(req.params.id);
      if (!book) {
        return res.status(404).json({ success: false, error: 'Book not found' });
      }

      res.json({
        success: true,
        data: { ...book, cover: bufferToDataUrl(book.cover) }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateBook: async (req, res) => {
    try {
      const { title, author, description, dt_publication } = req.body;
      
      const bookData = {};
      
      if (title !== undefined) bookData.title = title;
      if (author !== undefined) bookData.author = author;
      if (description !== undefined) bookData.description = description;
      if (dt_publication !== undefined) bookData.dt_publication = dt_publication;
      
      if (req.file) {
        const fs = require('fs');
        const coverBuffer = fs.readFileSync(req.file.path);
        bookData.cover = coverBuffer.toString('base64');
        fs.unlinkSync(req.file.path);
      }
      
      const updatedBook = await bookModel.update(req.params.id, bookData);
      
      res.json({ success: true, data: updatedBook });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, error: 'Book not found' });
      }
      if (error.code === 'P2002') {
        return res.status(400).json({
          success: false,
          error: 'Book title must be unique'
        });
      }
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      await bookModel.delete(req.params.id);
      res.json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, error: 'Book not found' });
      }
      res.status(500).json({ success: false, error: error.message });
    }
  },

  searchBooks: async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ 
          success: false, 
          error: 'Search query is required' 
        });
      }
      const books = await bookModel.search(q);
      const mappedBooks = books.map(book => ({
        ...book,
        cover: bufferToDataUrl(book.cover)
      }));
      res.json({ success: true, data: mappedBooks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = bookController;