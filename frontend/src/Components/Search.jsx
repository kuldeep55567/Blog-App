import React, { useState } from 'react';
import "../Css/Search.css"
const Search = ({ onSearch }) => {
const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };
  return (
    <form onSubmit={handleSearchSubmit} className='main'>
      <input
        type="text"
        placeholder="Search Blogs..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
    </form>
  );
};

export default Search;
