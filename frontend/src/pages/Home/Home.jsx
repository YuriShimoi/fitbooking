import { useEffect, useState, useRef } from 'react';
import Input from '../../components/Input/Input';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookCard from '../../components/BookCard/BookCard';
import FloatModal from '../../components/FloatModal/FloatModal';
import './Home.css';

function HomePage() {
  const [booklist, setBooklistData] = useState(0);
  const [createModalIsVisible, setCreateModalIsVisible] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const formRef = useRef();

  function updateBooklistData() {
    fetch('/api/books')
    .then(res => res.json())
    .then(data => {
      setBooklistData(data.data);
    });
  }

  useEffect(() => {
    updateBooklistData();
  }, []);

  function checkFormValidation() {
    const form = new FormData(formRef.current);
    const form_values = Object.fromEntries(form);
    setIsSaveEnabled(form_values.title.trim() && form_values.author.trim());
  }

  function tryRegisterBook(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      fetch('/api/books', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(result => {
        setCreateModalIsVisible(false);
        updateBooklistData();
      });
    }
    catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      <nav>
        <h1>Livros</h1>
        <button className="btn-createnew" onClick={() => setCreateModalIsVisible(true)}>Novo</button>
      </nav>
      
      <SearchBar></SearchBar>

      <div id="booklist-container">
        {booklist && booklist.map(book => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            cover={book.cover}
            description={book.description} />
        ))}
      </div>

      {createModalIsVisible && (
        <FloatModal title="Novo livro">
          <form id="new-book-form" ref={formRef} onSubmit={tryRegisterBook}>
            <div className="form-left-container">
              <Input type="text" name="title" placeholder="Título" maxLength={100} onChange={ checkFormValidation } />
              <Input type="text" name="author" placeholder="Autor" maxLength={50} onChange={ checkFormValidation } />
              <Input type="date" name="dt_publication" onChange={ checkFormValidation } />
            </div>
            <div>
              <Input type="image" name="cover" placeholder="Escolher Imagem" style={{ height: "226px" }} />
            </div>
            <div className="form-double-container" style={{height: "200px"}}>
              <Input type="textarea" name="description" placeholder="Descrição" maxLength={2000} style={{ height: "200px" }} onChange={ checkFormValidation } />
            </div>
            <div className="form-double-container form-centered-container">
              <button className="btn" onClick={() => setCreateModalIsVisible(false)}>Cancelar</button>
              <button className="btn btn-primary" disabled={!isSaveEnabled}>Salvar</button>
            </div>
          </form>
        </FloatModal>
      )}
    </>
  );
}

export default HomePage;
