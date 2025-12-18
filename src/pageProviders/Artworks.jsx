import ArtworksPage from 'pages/artworks';
import React from 'react';
import PageContainer from './components/PageContainer';

const Artworks = (props) => {
  return (
    <PageContainer>
      <ArtworksPage {...props} />
    </PageContainer>
  );
};

export default Artworks;
