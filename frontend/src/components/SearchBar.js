import React from 'react';

function SearchBar() {
  return (
    <div style={styles.searchBar}>
      <input type="text" placeholder="Search" style={styles.input} />
    </div>
  );
}

const styles = {
    searchBar: {
        textAlign: 'center',
        margin: '1vh 1vw' 
    },
    input: {
        padding: '1.5vh 1vw',
        width: '80%',
        borderRadius: '5px' 
    }
}

export default SearchBar;