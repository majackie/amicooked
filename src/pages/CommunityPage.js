// src/pages/CommunityPage.js
import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TopCategories from '../components/TopCategories/TopCategories';
import LatestPosts from '../components/LatestPosts/LatestPosts';
import BackButton from '../components/BackButton';

function CommunityPage() {
  return (
    <div>
      <Header />
      <SearchBar />
      <TopCategories />
      <LatestPosts />
      <BackButton />
    </div>
  );
}

export default CommunityPage;
