import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RegBtn from '../../common/RegBtn/RegBtn';
import { FiSearch } from 'react-icons/fi';
import s from './Searchbar.module.css';

function Searchbar({ handlChangeInput, getApiColection }) {
  const [query, setQuery] = useState('');

  const findImage = e => {
    e.preventDefault();
    getApiColection();
  };

  const handleChange = e => {
    const currentValue = e.target.value;
    setQuery(currentValue);
    handlChangeInput(currentValue);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          onChange={handleChange}
          name="query"
          value={query}
        />
        <RegBtn className="searchBtn" type="submit" handleClick={findImage}>
          <FiSearch />
        </RegBtn>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handlChangeInput: PropTypes.func.isRequired,
  getApiColection: PropTypes.func.isRequired,
};

export default Searchbar;
