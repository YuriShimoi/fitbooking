import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import FloatModal from '../../components/FloatModal/FloatModal';
import './Book.css';

function BookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef();
  const [updateModalIsVisible, setUpdateModalIsVisible] = useState(false);
  const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [book, setBookData] = useState(0);

  useEffect(() => {
    fetch('/api/books/' + bookId)
      .then(res => res.json())
      .then(data => {
        setBookData(data.data);
      });
  }, []);

  function formatDate(dt) {
    if(!dt) return '--/--/----';
    const padDate = (num) => String(num).padStart(2, '0');
    
    const asdate = new Date(dt);
    return `${padDate(asdate.getUTCDate())}/${padDate(asdate.getUTCMonth()+1)}/${asdate.getUTCFullYear()}`;
  }

  function formatDateToInput(dt) {
    if(!dt) return null;
    const padDate = (num) => String(num).padStart(2, '0');
    
    const asdate = new Date(dt);
    return `${asdate.getUTCFullYear()}-${padDate(asdate.getUTCMonth()+1)}-${padDate(asdate.getUTCDate())}`;
  }

  function checkFormValidation() {
    const form = new FormData(formRef.current);
    const form_values = Object.fromEntries(form);
    setIsSaveEnabled(form_values.title.trim() && form_values.author.trim());
  }

  function tryUpdateBook(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      fetch('/api/books/'+ bookId, {
        method: 'PUT',
        body: formData
      })
      .then(response => response.json())
      .then(result => {
        navigate(0);
      });
    }
    catch(error) {
      console.error(error);
    }
  }

  function tryDeleteBook() {
    try {
      fetch('/api/books/'+ bookId, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(result => {
        navigate('/');
      });
    }
    catch(error) {
      console.error(error);
    }
  }
  
  if (!book) {
    return (
      <div>
        <h1>Livro não encontrado.</h1>
        <button className="btn-back" onClick={() => navigate('/')}>
          <img className="svg-icon" src="/src/assets/icons/arrow.svg" alt="search-icon" />
          Voltar
          </button>
      </div>
    );
  }
  
  return (
    <>
      <nav>
        <button className="btn-back" onClick={() => navigate('/')}>
          <img className="svg-icon" src="/src/assets/icons/arrow.svg" alt="search-icon" />
          Voltar
        </button>

        <div>
          <button onClick={() => setUpdateModalIsVisible(true)}>Editar</button>
          <button className="btn-delete" onClick={() => setDeleteModalIsVisible(true)}>Excluir</button>
        </div>
      </nav>
      
      <div className="book-container">
        <div className="book-info-container">
          <h1>{book.title}</h1>
          <div className="book-info-header">
            <span>Por {book.author}</span>
            <span>Publicado em {formatDate(book.dt_publication)}</span>
          </div>
          <p>{book.description}</p>
        </div>
        <div className="book-cover-container">
          <img src={ book.cover || "/src/assets/default-cover.png" } alt="book cover" />
        </div>
      </div>

      {updateModalIsVisible && (
        <FloatModal title="Novo livro">
          <form id="new-book-form" ref={formRef} onSubmit={tryUpdateBook}>
            <div className="form-left-container">
              <Input type="text" name="title" placeholder="Título" defaultValue={book.title} onChange={ checkFormValidation } />
              <Input type="text" name="author" placeholder="Autor" defaultValue={book.author} onChange={ checkFormValidation } />
              <Input type="date" name="dt_publication" defaultValue={formatDateToInput(book.dt_publication)} onChange={ checkFormValidation } />
            </div>
            <div>
              <Input type="file" name="cover" placeholder="Escolher Imagem" defaultValue={book?.cover || null} style={{ height: "226px" }} />
            </div>
            <div className="form-double-container" style={{height: "200px"}}>
              <Input
                type="textarea"
                name="description"
                placeholder="Descrição"
                defaultValue={book.description}
                style={{ height: "200px" }} />
            </div>
            <div className="form-double-container form-centered-container">
              <button className="btn" onClick={() => setUpdateModalIsVisible(false)}>Cancelar</button>
              <button className="btn btn-primary" disabled={!isSaveEnabled}>Salvar</button>
            </div>
          </form>
        </FloatModal>
      )}

      {deleteModalIsVisible && (
        <FloatModal title="Tem certeza?">
          <p className="delete-subtext">Ao excluir este livro não será possível recupera-lo. Realmente deseja excluí-lo?</p>
          <div className="btn-group">
            <button className="btn" onClick={() => setDeleteModalIsVisible(false)}>Cancelar</button>
            <button className="btn btn-error" onClick={() => tryDeleteBook()}>Excluir</button>
          </div>
        </FloatModal>
      )}
    </>
  );
}

export default BookPage;