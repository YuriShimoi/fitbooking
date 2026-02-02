import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import './SearchBar.css';

function SearchBar({ text, onSearch = () => {} }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(text?? "");

  const searchIcon = (
    <img
      className="svg-icon"
      src="/src/assets/icons/magnifying.svg"
      onClick={ () => { if(searchText) { navigate(`/search/${searchText}`); onSearch(); }}}
      style={{cursor: 'pointer'}}
      alt="search-icon" />
  );

  return (
    <Input type="text" placeholder="Buscar" defaultValue={searchText} icon={searchIcon} onChange={(txt) => setSearchText(txt)}></Input>
  );
}

export default SearchBar;