import React, { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ submit }) => {
  const [query, setQuery] = useState('');

  const handleOnChange = ({ target }) => {
    setQuery(target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!query.trim()) {
      return;
    }
    submit(query);
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.search_button}>
          <span className={css.search_button_label}>Search</span>
        </button>

        <input
          className={css.search_input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
