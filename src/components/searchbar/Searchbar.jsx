import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { SearchbarHeader, SearchForm } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Enter a keyword');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchbarHeader onSubmit={handleSubmit} className="searchbar">
      <SearchForm className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          onChange={handleQueryChange}
          value={searchQuery}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
}
