import React from 'react';
import AppBar from '../components/AppBar';
import Header from '../components/Header';
import TopCategories from '../components/TopCategories/TopCategories';
import LatestPosts from '../components/LatestPosts/LatestPosts';
import BackButton from '../components/BackButton';

function CommunityPage() {
  return (
    <div>
      <AppBar />
      <Header />
      <TopCategories />
      <LatestPosts />
      <BackButton />
    </div>
  );
}

export default CommunityPage;
