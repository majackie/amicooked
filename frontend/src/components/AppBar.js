import React from 'react';

function AppBar() {
  return (
    <div style={styles.appBar}>
      <span style={styles.icon}>⭐</span>
      <span style={styles.title}>amicooked</span>
    </div>
  );
}

const styles = {
  appBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: '10px',
    fontSize: '24px',
  },
  title: {
    fontSize: '20px',
  }
};

export default AppBar;