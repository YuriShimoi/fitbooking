const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

const multer = require('multer');
const upload = multer({ 
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

router.get('/books', bookController.getAllBooks);
router.get('/books/search', bookController.searchBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', upload.single('cover'), bookController.createBook);
router.put('/books/:id', upload.single('cover'), bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;