import { Link } from 'react-router-dom';
import './BookCard.css';

function BookCard({ id, title, description, cover }) {
  return (
    <Link to={ `/book/${id}` }>
      <div className="book-card">
        <div className="book-cover">
          <img src={ cover || "/src/assets/default-cover.png" } alt="book cover" />
        </div>
        <div className="book-info">
          <h2>{ title }</h2>
          <p>{ description }</p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;