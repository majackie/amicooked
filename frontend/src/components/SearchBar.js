import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div style={styles.searchBar}>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  searchBar: {
    textAlign: 'center',
    margin: '1vh 1vw',
  },
  input: {
    padding: '1.5vh 1vw',
    width: '80%',
    borderRadius: '5px',
  },
};

export default SearchBar;
