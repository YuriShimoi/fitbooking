import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '../../components/BookCard/BookCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Search.css';

function SearchPage() {
  const { text } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/books/search?q=' + text)
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  return (
    <div>
      <nav>
        <button className="btn-back" onClick={() => navigate('/')}>
          <img className="svg-icon" src="/src/assets/icons/arrow.svg" alt="search-icon" />
          Voltar
        </button>
      </nav>
      <SearchBar text={text} onSearch={() => navigate(0)}></SearchBar>
      <div id="booklist-container">
        {data && data.data && data.data.map(book => (
          <BookCard key={book.id} id={book.id} title={book.title} cover={book.cover} description={book.description} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
