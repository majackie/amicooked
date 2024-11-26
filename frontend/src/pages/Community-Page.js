import React from 'react';
import Navbar from '../shared/Navbar.js'
import Header from '../components/Header';
import TopCategories from '../components/TopCategories/TopCategories';
import LatestPosts from '../components/LatestPosts/LatestPosts';
import BackButton from '../components/BackButton.js';

function CommunityPage() {
  return (
    <div>
      <Navbar />
      <Header />
      <TopCategories />
      <LatestPosts />
      <BackButton />
    </div>
  );
}

export default CommunityPage;