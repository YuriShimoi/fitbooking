import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import './App.css';

import HomePage from './pages/Home/Home';
import SearchPage from './pages/Search/Search';
import BookPage from './pages/Book/Book';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/search/:text" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
