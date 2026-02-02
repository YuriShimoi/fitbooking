const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/database');

const app = express();
app.use(cors());

testConnection();

const PORT = process.env.PORT || 5000;

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Fit Bookstore API',
    version: '1.0.0',
    endpoints: {
      books: '/api/books',
      singleBook: '/api/books/:id',
      search: '/api/books/search?q=query',
      tableInfo: '/api/books/debug/table-info (debug)'
    }
  });
});

app.use('/api', require('./routes/api'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message 
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl,
    availableRoutes: {
      root: '/',
      books: '/api/books',
      bookById: '/api/books/:id',
      search: '/api/books/search'
    }
  });
});

app.listen(PORT, () => {
  console.log(`API available at http://localhost:${PORT}/api/books`);
});