import React from 'react';
import CategoryCard from './CategoryCard';

function TopCategories() {
  return (
    <section style={styles.section}>
      <h2 style={styles.h2}>Top Categories</h2>
      <div style={styles.cardWrapper}>
      { /* TODO: Populate Cards from Database */ }
        {[1, 2, 3, 4].map((_, idx) => (
          <CategoryCard key={idx} categoryName="lorem ipsum" /> 
        ))}
      </div>
      <div style={{ textAlign: 'right' }}>
        <a href="#see-more" style={styles.a}>see more</a>
      </div>
    </section>
  );
}

const styles = {
    section: {
        padding: '1.5vw'
    },
    h2: {
        textDecoration: 'underline',
        textDecorationColor: '#3b82f6',
        textDecorationThickness: '0.5vh'
    },
    cardWrapper: {
        display: 'flex',
        justifyContent:
        'space-around',
        flexWrap: 'wrap'
    },
    a: {
        color: '#3b82f6'
    }
}

export default TopCategories;
