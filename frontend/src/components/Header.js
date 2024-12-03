import React from 'react';
import SearchBar from './SearchBar';

function Header({ searchQuery, setSearchQuery }) {
  return (
    <header style={styles.header}>
      <p style={styles.p}>amicooked community</p>
      {/* Pass props to `SearchBar` */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#3b82f6',
    padding: '1vh 1vw 5vh 1vw',
    color: 'white',
    textAlign: 'center',
  },
  p: {
    fontSize: '2.5vw',
  },
};

export default Header;
