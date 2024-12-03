import React from 'react';

function CategoryCard({ categoryName }) {
  return (
    <div style={styles.card}>
      {categoryName}
    </div>
  );
}

const styles = {
    card: { 
        border: '0.5vh solid #3b82f6',
        borderRadius: '5px',
        padding: '1.5vh',
        margin: '1.5vh' 
    }
}

export default CategoryCard;