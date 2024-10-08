import React from 'react';

function BackButton() {
  return (
    <div style={styles.wrapper}>
      <button style={styles.button}>Back to Dashboard</button>
    </div>
  );
}

const styles = {
    wrapper: {
        textAlign: 'center',
        margin: '20px'
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#d1d5db'
    }
}

export default BackButton;